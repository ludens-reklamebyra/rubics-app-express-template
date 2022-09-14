import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Component from './Component.js';

// @ts-ignore
const props: any = window['__RUBICS_APP_COMPONENT__'];
// @ts-ignore
const _store: any = window['_STORE'];

const container = document.getElementById('rubics_app_component');
hydrateRoot(
  container!,
  <Component {...props} pageContext={_store.pageContext} />
);
