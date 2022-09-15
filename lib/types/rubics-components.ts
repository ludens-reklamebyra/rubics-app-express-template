import { IConfig } from '../models/Config/config.types.js';
import { IRubicsComponentBody } from './rubics.js';

export interface IRubicsComponentProps
  extends Pick<IRubicsComponentBody, 'pageContext'> {
  appUrl: string;
  config: IConfig;
  search: string;
}
