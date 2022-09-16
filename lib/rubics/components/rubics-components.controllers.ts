import { Request, Response } from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { createComponentConfig } from '../../../src/utils/rubics-components.js';
import { IRubicsComponentBody } from '../../types/rubics.js';
import { IS_DEV } from '../../utils/constants.js';
import { manifest } from '../../utils/manifest.js';
import {
  createRubicsComponentHtml,
  createRubicsComponentStore,
} from './rubics-components.utils.js';

let devReFetchCounter = 0;

export let postComponentsRender =
  (name: string, extendStore?: (req: Request) => object) =>
  async (req: Request, res: Response) => {
    try {
      const body = req.body as IRubicsComponentBody;
      const store = createRubicsComponentStore(req);
      let path = `../../../src/components/${name}/${name}.tsx`;
      if (IS_DEV) {
        // Changes the import to refetch the component for SSR and hot-reload.
        // Issues with memory leak in local environment. Is not a problem in production.
        path += `?c=${devReFetchCounter++}`;
      }

      const Component = await import(path);
      const content = ReactDOM.renderToString(
        React.createElement(Component.default, {
          ...(extendStore ? extendStore(req) : {}),
          ...store,
          pageContext: body.pageContext,
        })
      );

      const src = `src/components/${name}`;
      const indexSrc = `${src}/index.tsx`;
      const cssSrc = `${src}/${name}.css`;
      const config = createComponentConfig(name);
      const module = manifest[indexSrc];
      const html = createRubicsComponentHtml(config, {
        file: module.file,
        css: manifest[cssSrc].file,
        script: manifest[module.imports[0]].file,
        content,
        store,
      });

      res.json({ html });
    } catch (e: any) {
      console.error('App error', name, e);
      res.json({
        html: `<h2>MyComponent feilet</h2><p>${e.message}</p>`,
      });
    }
  };
