/// <reference types="express" />
import { IRequestForApp, IRequestState } from './types/express.js';
import type { IRequestModels } from './types/express.js';

declare global {
  namespace Express {
    interface Request extends IRequestForApp {}
  }
}
