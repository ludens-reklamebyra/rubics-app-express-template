import cors from 'cors';
import { CORS_ALLOW_URLS } from '../utils/constants.js';

export default cors({
  origin: function (
    origin: any,
    callback: (err: null | Error, success?: boolean) => any
  ) {
    if (process.env.NODE_ENV !== 'production' || !origin) {
      return callback(null, true);
    }

    if (CORS_ALLOW_URLS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
});
