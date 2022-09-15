import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { getComponentState } from '../../utils/rubics-components.js';
import MyComponent from './MyComponent.js';

const { container, props, store } = getComponentState('MyComponent');
hydrateRoot(
  container,
  <MyComponent {...props} pageContext={store.pageContext} />
);
