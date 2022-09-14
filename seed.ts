import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING } from './lib/utils/constants.js';

mongoose.connect(MONGO_CONNECTION_STRING, (error) => {
  if (error) {
    console.info('DB Error', error);
  }
  console.info('Connected to DB');
});

(async function () {
  process.exit(0);
})();
