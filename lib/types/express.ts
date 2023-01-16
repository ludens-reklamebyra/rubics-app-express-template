import winston from 'winston';
import {
  IConfigDocument,
  IConfigModel,
} from '../models/Config/config.types.js';

export interface IRequestForApp {
  id: string;
  logger: winston.Logger;
  models: IRequestModels;
  state: IRequestState;
}

export interface IRequestModels {
  Config: IConfigModel;
}

export interface IRequestState {
  config: IConfigDocument;
}
