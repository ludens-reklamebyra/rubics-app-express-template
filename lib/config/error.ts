import { RubicsError } from '@ludens-reklame/rubics-app-sdk';
import { Request, NextFunction, Response } from 'express';

export default function errorHandler(
  err: RubicsError | { name: string; message: string; code: number } | Error,
  _req: Request,
  res: Response,
  _: NextFunction
) {
  if (err instanceof RubicsError) {
    if (err.code > 499) {
      console.error(JSON.stringify(err, null, 2));
      console.error(err);
    } else {
      console.info(JSON.stringify(err, null, 2));
    }
    return res.status(err.code).json(err.toObject());
  }
  if (err instanceof Error) {
    console.error(err);
    return res.status(500).json({ status: 500, message: err.message });
  }
  if (
    err &&
    typeof err === 'object' &&
    'name' in err &&
    err.name === 'MulterError'
  ) {
    console.error(err);
    return res.status(500).json(err);
  }

  console.error(err);
  return res.status(500).json({ status: 500, message: 'Fatal error' });
}
