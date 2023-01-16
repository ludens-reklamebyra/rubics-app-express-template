import { NextFunction, Request, Response } from 'express';
import _morgan from 'morgan';
import logger from './logger.js';

const stream = {
  write: (message: string) => logger.log('route', message),
};

const loggerFormat = ':id :sessionID :userId :method :status ":url" - :response-time ms';
_morgan.token('id', (req: any) => req.id);
_morgan.token('sessionID', (req: any) => req.sessionID);
_morgan.token('userId', (req: any) => (req.user ? req.user._id : '-'));

const morgan = (req: Request, res: Response, next: NextFunction) => {
  req.logger = logger;
  return _morgan(loggerFormat, { stream })(req, res, next);
};
export default morgan;
