import { Request, NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { Config } from '../models/Config/config.js';
import { IS_DEV } from '../utils/constants.js';

(mongoose as any).Promise = global.Promise;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || '';

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

export function initMongooseModels(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    req.models = {
      Config,
    };
    return next();
  } catch (e) {
    next(e);
  }
}
