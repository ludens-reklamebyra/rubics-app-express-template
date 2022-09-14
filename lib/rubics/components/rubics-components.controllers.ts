import { Request, Response } from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Component from '../../../src/components/Component/Component.js';
import { IClientContextProps } from '../../../src/components/Component/context/ComponentContext.js';
import { IRubicsComponentBody } from '../../types/rubics.js';
import { APP_URL } from '../../utils/constants.js';
import { manifest } from '../../utils/manifest.js';

export let getComponentsComponent = async (req: Request, res: Response) => {
  try {
    const body = req.body as IRubicsComponentBody;
    req.query = body.query;

    const search = new URLSearchParams(body.query).toString();
    const props: Omit<IClientContextProps, 'pageContext'> = {
      appUrl: APP_URL,
      config: req.state.config.toJSON() as any,
      search,
    };
    const content = ReactDOM.renderToString(
      React.createElement(Component, {
        ...props,
        pageContext: body.pageContext,
      })
    );

    const module = manifest['src/components/Component/index.tsx'];
    const css = manifest['src/components/Component/component.css'].file;
    const script = manifest[module.imports[0]].file;

    res.json({
      html: `
      <script type="module" crossorigin src="${APP_URL}/${module.file}">
      </script>
      <script rel="modulepreload" src="${APP_URL}/${script}"></script>
      <link rel="stylesheet" href="${APP_URL}/${css}"/>
      <div id="rubics_app_component">${content}</div>
      <script>var __RUBICS_APP_COMPONENT__=${JSON.stringify(props)};</script>
    `,
    });
  } catch (e: any) {
    console.error('App error', e);
    res.json({
      html: `<h2>Teamtailor APP feilet</h2><p>${e.message}</p>`,
    });
  }
};
