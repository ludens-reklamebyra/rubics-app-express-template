import { Request } from 'express';
import { RequestError, IApiErrorCode, IApiErrorOptions } from './RequestError.js';

export class ApiError extends Error {
  constructor(
    readonly code: IApiErrorCode,
    readonly title: string,
    readonly body: Omit<IApiErrorOptions, 'id' | 'title' | 'status'> = {}
  ) {
    super(title);
  }

  toRequestError(req: Request) {
    return new RequestError(req, this.code, this.title, this.body);
  }
}
