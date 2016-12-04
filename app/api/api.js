import R from 'ramda';
import path from 'path';
import multer from 'multer';
import uuid from 'uuid';
import fetch from 'node-fetch';
import bucket from '../storage';
import config from '../constants/config';
import countries from '../utils/countries';
import i18n from '../utils/messages';

const extensions = ['.jpg', '.jpeg', '.png', '.pdf', '.doc'];

export default {
  multer: multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
      const filename = file.originalname.toLowerCase();
      const extension = path.extname(filename);
      const validExtension = R.ifElse(
        R.contains(R.__, extensions),
        () => callback(null, true),
        () => callback(null, false),
      );

      return validExtension(extension);
    },
  }),

  upload: (req, res, next) => {
    const missingFiles = R.difference(
      R.split(',', req.body.fileFields),
      R.keys(req.files)
    );

    if (missingFiles.length > 0) {
      return res.status(400).json({
        error: {
          fields: R.join(',', missingFiles),
          message: i18n.errorMissingInvalid,
        },
      });
    }

    R.values(req.files).map((files, fieldIndex) => {
      files.map((file, fileIndex) => {
        if (file.size >= 10485760) {
          return res.status(400).json({
            error: {
              fields: file.originalname,
              message: i18n.errorFileSize,
            },
          });
        }

        const filename = R.join('_', [
          new Date().toISOString().slice(0, 10).replace(/-/g, ''),
          req.body.user_id,
          file.fieldname,
          R.concat(uuid.v4().split('-')[4], path.extname(file.originalname)),
        ]);

        const blob = bucket.file(path.join(
          req.body.broker_username,
          req.body.username,
          '/'
        ) + filename);

        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
          return res.status(400).send(err);
        });

        blobStream.on('finish', () => {
          const blobName = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          req.body.uploaded_files = R.append(blobName, req.body.uploaded_files);
          if (fieldIndex === R.keys(req.files).length - 1 && fileIndex === files.length - 1) {
            return next();
          }
        });

        blobStream.end(file.buffer);
      });
    });
  },

  submit: (req, res) => {
    const reqId = parseInt(1e7 * Math.random(), 10);

    const msg = {
      MsgType: 'B8',
      VerifyCustomerReqID: reqId,
      ClientID: req.body.user_id,
      BrokerID: req.body.broker_id,
      VerificationData: {
        formID: req.body.broker_id,
        submissionID: reqId,
        created_at: Date.now().toString().slice(0, 10),
        name: {
          first: req.body.firstName,
          middle: req.body.middleName,
          last: req.body.lastName,
        },
        address: {
          street1: req.body.address,
          street2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          postal_code: req.body.zipcode,
          country: req.body.country,
          country_code: R.find(R.propEq('name', req.body.country))(countries).code,
        },
        phone_number: R.concat(req.body.countryCode, req.body.areaCode, req.body.number),
        date_of_birth: R.join('-', [req.body.year, req.body.month, req.body.day]),
        identification: R.pick(R.split(',', req.body.idFields), req.body),
      },
      Verify: 1,
    };

    const { endpoint } = req.body.testnet ? config.test : config.prod;

    fetch(endpoint, {
      body: JSON.stringify(msg),
      method: 'POST',
    }).then((data) => {
      console.log(data);
      return res.json({
        success: true,
      });
    }).catch(console.log);
  },
};
