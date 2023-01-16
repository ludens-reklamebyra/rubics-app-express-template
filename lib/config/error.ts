import { NextFunction, Request, Response } from 'express';
import mongodb from 'mongodb';
import mongoose from 'mongoose';
import { LogLevel } from '../config/logger.js';
import { ApiError } from './error/ApiError.js';
import MongoError from './error/MongoError.js';
import { NotFoundError, RequestError } from './error/RequestError.js';

type ErrorType =
  | RequestError
  | ApiError
  | mongoose.Error
  | mongodb.MongoServerError
  | Error
  | unknown;

export default function error(
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(error);
  }
  if (error instanceof RequestError || error instanceof NotFoundError) {
    error.res(res);
  } else if (error instanceof ApiError) {
    error.toRequestError(req).res(res);
  } else if (error instanceof Error) {
    new RequestError(req, 500, error.message, {
      level: LogLevel.Error,
      error,
    }).res(res);
  } else if (
    error instanceof mongoose.Error ||
    error instanceof mongodb.MongoServerError
  ) {
    new MongoError(req, error).res(res);
  } else {
    new RequestError(req, 500, 'Fatal error', {
      level: LogLevel.Error,
      error,
    }).res(res);
  }
}
