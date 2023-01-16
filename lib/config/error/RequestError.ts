import { Request, Response } from 'express';
import httpStatus from 'http-status';
import logger, { LogLevel } from '../../config/logger.js';

export type IApiErrorCode = Extract<keyof httpStatus.HttpStatus, number>;
export interface IApiErrorBody<E extends SimpleError = SimpleError> {
  id: string;
  title: string;
  status: Extract<keyof httpStatus.HttpStatus, string>;
  link?: string;
  detail?: string;
  errors?: E[];
}
export interface IApiErrorOptions extends IApiErrorBody {
  level?: LogLevel;
  error?: any;
}
export interface IApiErrorJson extends Omit<IApiErrorBody, 'errors'> {
  code: number;
  /**
   * @deprecated. Used by old dash and client
   */
  error: string;
  errors?: IApiErrorJsonSimple[];
}
export type IApiErrorJsonSimple = Pick<
  IApiErrorBody,
  'status' | 'title' | 'detail' | 'link'
>;

export class RequestError extends Error {
  readonly body: IApiErrorBody;
  readonly code: Extract<keyof httpStatus.HttpStatus, number>;
  readonly level: LogLevel;
  readonly error: any;
  readonly errors: SimpleError[];

  constructor(
    req: Request,
    code: IApiErrorCode,
    title: string,
    body: Omit<IApiErrorOptions, 'id' | 'title' | 'status'> = {}
  ) {
    super(title);
    const { level, error, errors, ...rest } = body;
    this.code = code;
    this.level = level || LogLevel.Warning;
    this.error = error;
    this.errors = errors || [];
    this.body = {
      id: req.id,
      status: String(httpStatus[code]),
      title: title,
      ...rest,
    };
  }

  get id() {
    return this.body.id;
  }
  get status() {
    return this.body.status;
  }
  get title() {
    return this.body.title;
  }
  get link() {
    return this.body.link;
  }
  get detail() {
    return this.body.detail;
  }

  toJSON(simple?: boolean): IApiErrorJson | IApiErrorJsonSimple {
    const ret: Partial<IApiErrorJson> =
      this.errors.length > 0
        ? { errors: this.errors.map((x) => x.toJSON()) }
        : {};
    if (simple) {
      return {
        ...ret,
        title: this.body.title,
        ...(this.body.detail ? { detail: this.body.detail } : {}),
        ...(this.body.link ? { link: this.body.link } : {}),
      } as IApiErrorJsonSimple;
    }
    return {
      code: this.code,
      error: this.body.title,
      ...this.body,
      ...ret,
    } as IApiErrorJson;
  }
  toString(): string {
    return `${this.code}: ${this.message}`;
  }

  res(res: Response) {
    if (logger.isLevelEnabled(this.level)) this.log();
    return res.status(this.code).json(this.toJSON());
  }

  private log() {
    logger.debug('Logging from APIError');
    logger.info(this.toString());
    console.error(this.toJSON());
    if (this.error) {
      console.error(this.error);
    }
  }
}

/**
 * Used for errors connected to RequestErrors to show more details.
 */
export class SimpleError extends Error {
  readonly body: IApiErrorJsonSimple;
  readonly error: Error;

  constructor(
    readonly code: IApiErrorCode,
    readonly title: string,
    { error, ...body }: Pick<IApiErrorOptions, 'detail' | 'link' | 'error'> = {}
  ) {
    super(title);
    this.error = error;
    this.body = {
      status: String(httpStatus[code]),
      title,
      ...body,
    };
  }

  toJSON() {
    return this.body;
  }
}

export class NotFoundError extends RequestError {
  constructor(
    req: Request,
    key: string,
    body: Omit<IApiErrorOptions, 'id' | 'title' | 'status' | 'detail'> = {}
  ) {
    super(req, httpStatus.NOT_FOUND, 'not-found', {
      ...body,
      detail: key,
    });
  }
}

export class BadBodyRequestError extends RequestError {
  constructor(
    req: Request,
    detail: string,
    body: Omit<IApiErrorOptions, 'id' | 'title' | 'status' | 'detail'> = {}
  ) {
    super(req, httpStatus.BAD_REQUEST, 'required', {
      ...body,
      detail,
    });
  }
}
