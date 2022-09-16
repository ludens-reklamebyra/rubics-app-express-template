import React from 'react';
import type { IRubicsComponentProps } from '../../../../lib/types/rubics-components.js';
import type { IRubicsComponentBody } from '../../../../lib/types/rubics.js';

export const ComponentContext = React.createContext<IRubicsComponentProps>({
  pageContext: {} as IRubicsComponentBody['pageContext'],
  appUrl: '',
  config: {} as any,
  search: '',
});

export const ComponentProvider = ComponentContext.Provider;
