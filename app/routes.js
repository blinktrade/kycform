import express from 'express';
import api from './api/api';

const router = express.Router();

export default function (app) {
  router.route('/verify')
    .post(
      api.multer.fields([
        { name: 'photoId' },
        { name: 'photoBill' },
        { name: 'photoSelf' },
        { name: 'signature' },
      ]),
      api.upload,
      api.submit,
    );

  return router;
}
