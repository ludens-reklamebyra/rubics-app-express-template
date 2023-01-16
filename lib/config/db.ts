import { Request, NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { Config } from '../models/Config/config.js';
import { IS_DEV, MONGO_CONNECTION_STRING } from '../utils/constants.js';

(mongoose as any).Promise = global.Promise;

export function connectToDatabase() {
  mongoose.connect(MONGO_CONNECTION_STRING, (err) => {
    if (err) {
      console.error(
        'Could NOT connect to mongoDB. Check your environment variables for possible errors.'
      );
      process.exit(1);
    } else if (IS_DEV) {
      console.info(`Connected successfully to DB`);
    }
  });
}

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.state = {} as Request['state'];
    req.models = {
      Config,
    };
    return next();
  } catch (e) {
    next(e);
  }
};
