import { Request } from 'express';
import status from 'http-status';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import { RequestError, IApiErrorCode, IApiErrorOptions } from './RequestError.js';
import { LogLevel } from '../../config/logger.js';

export default class MongoError extends RequestError {
  constructor(req: Request, error: mongoose.Error) {
    const [code, data] = MongoError.getData(req, error);
    super(req, code, error.name, {
      detail: error.message,
      error,
      ...data,
    });
  }

  static getData(req: Request, error: mongoose.Error): [IApiErrorCode, Partial<IApiErrorOptions>] {
    if (error instanceof mongodb.MongoServerError) {
      if (error.code === 11000) {
        return [
          status.CONFLICT,
          {
            level: LogLevel.Warning,
            title: 'Duplicate document',
            detail: error.message,
          },
        ];
      }
      return [
        status.INTERNAL_SERVER_ERROR,
        {
          level: LogLevel.Error,
          title: 'Database error',
          detail: error.message,
        },
      ];
    }
    if (error instanceof mongoose.Error.ValidationError) {
      const opts: Partial<IApiErrorOptions> = { level: LogLevel.Warning };
      if (error.errors && Object.keys(error.errors).length > 0) {
        opts.errors = Object.values(error.errors).map(
          (x) =>
            new RequestError(req, status.BAD_REQUEST, x.message, {
              ...opts,
              error,
            })
        );
      }
      return [status.BAD_REQUEST, opts];
    }
    return [status.INTERNAL_SERVER_ERROR, { level: LogLevel.Error }];
  }
}
