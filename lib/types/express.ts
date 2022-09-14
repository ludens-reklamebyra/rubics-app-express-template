import {
  IConfigDocument,
  IConfigModel,
} from '../models/Config/config.types.js';

export interface IRequestModels {
  models: {
    Config: IConfigModel;
  };
}

export interface IRequestState {
  state: {
    config: IConfigDocument;
  };
}
