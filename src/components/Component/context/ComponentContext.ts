import React from 'react';
import { IConfig } from '../../../../lib/models/Config/config.types.js';
import { IRubicsComponentBody } from '../../../../lib/types/rubics.js';
export interface IClientContextProps
  extends Pick<IRubicsComponentBody, 'pageContext'> {
  appUrl: string;
  config: IConfig;
  search: string;
}

export const ComponentContext = React.createContext<IClientContextProps>({
  pageContext: {} as IRubicsComponentBody['pageContext'],
  appUrl: '',
  config: {} as any,
  search: '',
});

export const ComponentProvider = ComponentContext.Provider;
