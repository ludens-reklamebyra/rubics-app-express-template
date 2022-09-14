import { IConfig } from '../models/Config/config.types.js';

export interface OutputStore {
  site: string;
  origin: string;
}

export type InputStoreConfig = IConfig;

export interface InputStore extends Pick<OutputStore, 'site'> {
  config?: IConfig;
}

export interface IClientStore extends Pick<OutputStore, 'site'> {
  filters?: IWebFilter[];
  theme?: IClientTheme;
}

export interface IClientTheme {
  color: string;
}

export interface IWebFilter {
  value: string;
  label: string;
  options: IWebFilterOption[];
}

export interface IWebFilterOption {
  value: string;
  label: string;
}
