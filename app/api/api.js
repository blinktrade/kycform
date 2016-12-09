import R from 'ramda';
import path from 'path';
import multer from 'multer';
import uuid from 'uuid';
import sjcl from 'sjcl';
import fetch from 'node-fetch';
import Dropbox from 'dropbox';

import bucket from '../storage';
import config from '../constants/config';
import countries from '../utils/countries';
import i18n from '../utils/messages';

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN })
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
    let filesSaved = 0;
    const totalFiles = R.compose(
      R.prop('length'),
      R.flatten,
      R.values,
    )(req.files);

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

    R.values(req.files).map((files) => {
      files.map((file) => {
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

        const fullPath = path.join(
          req.body.broker_username,
          req.body.username,
          filename
        );

        const blob = bucket.file(fullPath);

        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
          return res.status(400).send(err);
        });

        blobStream.on('finish', () => {
          const blobName = path.join(bucket.name, blob.name);
          const blobPath = path.join('https://storage.googleapis.com', blobName);
          filesSaved = R.inc(filesSaved);
          req.body.uploaded_files = R.append(blobPath, req.body.uploaded_files);
          dbx.filesUpload({ path: `/${blob.name}`, contents: file.buffer });
          return filesSaved === totalFiles ? next() : null;
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
      ClientID: parseInt(req.body.user_id),
      BrokerID: parseInt(req.body.broker_id),
      VerificationData: {
        formID: req.body.broker_id,
        submissionID: reqId,
        created_at: parseInt(Date.now().toString().slice(0, 10)),
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
        uploaded_files: req.body.uploaded_files,
        phone_number: R.concat(req.body.countryCode, req.body.areaCode, req.body.number),
        date_of_birth: R.join('-', [req.body.year, req.body.month, req.body.day]),
        identification: R.pick(R.split(',', req.body.idFields), req.body),
      },
      Verify: 1,
    };

    const { endpoint } = req.body.testnet ? config.test : config.prod;
    const timeStamp = Date.now().toString();

    const { API_KEY, API_SECRET } = process.env;
    const hexKey = sjcl.codec.utf8String.toBits(API_SECRET);
    const hmac = new sjcl.misc.hmac(hexKey, sjcl.hash.sha256);
    const Signature = sjcl.codec.hex.fromBits(hmac.encrypt(timeStamp));

    fetch(endpoint, {
      body: JSON.stringify(msg),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Nonce: timeStamp,
        APIKey: API_KEY,
        Signature,
      },
    }).then(response => response.json())
      .then((data) => {
        return data.Status === 200
          ? res.status(200).json(data.Responses)
          : res.status(500).json(data.Description);
      });
  },
};
