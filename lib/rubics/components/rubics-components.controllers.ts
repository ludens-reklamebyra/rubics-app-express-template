import { Request, Response } from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import MyComponent from '../../../src/components/MyComponent/MyComponent.js';
import { createComponentConfig } from '../../../src/utils/rubics-components.js';
import { IRubicsComponentBody } from '../../types/rubics.js';
import { manifest } from '../../utils/manifest.js';
import {
  createRubicsComponentHtml,
  createRubicsComponentStore,
} from './rubics-components.utils.js';

export let postComponentsRender =
  (name: string, extendStore?: (req: Request) => object) =>
  async (req: Request, res: Response) => {
    try {
      const body = req.body as IRubicsComponentBody;
      const store = createRubicsComponentStore(req);
      const content = ReactDOM.renderToString(
        React.createElement(MyComponent, {
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
      const html = createRubicsComponentHtml(config.props, {
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
