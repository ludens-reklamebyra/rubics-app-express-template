import React from 'react';
import { IRubicsComponentProps } from '../../../../lib/types/rubics-components.js';
import { IRubicsComponentBody } from '../../../../lib/types/rubics.js';

export const ComponentContext = React.createContext<IRubicsComponentProps>({
  pageContext: {} as IRubicsComponentBody['pageContext'],
  appUrl: '',
  config: {} as any,
  search: '',
});

export const ComponentProvider = ComponentContext.Provider;
