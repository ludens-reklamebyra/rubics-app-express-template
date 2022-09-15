import { Request } from 'express';
import { IRubicsComponentProps } from '../../types/rubics-components.js';
import { IRubicsComponentBody } from '../../types/rubics.js';
import { APP_URL } from '../../utils/constants.js';

export const createRubicsComponentStore = (
  req: Request
): Omit<IRubicsComponentProps, 'pageContext'> => {
  return {
    appUrl: APP_URL,
    config: req.state.config.toJSON() as any,
    search: new URLSearchParams(
      (req.body as IRubicsComponentBody).query
    ).toString(),
  };
};

export interface IRubicsComponentHtmlOptions<T> {
  file: string;
  script: string;
  css: string;
  content: string;
  store: T;
}

export const createRubicsComponentHtml = <T>(
  propsKey: string,
  { file, script, css, content, store }: IRubicsComponentHtmlOptions<T>
) => `
  <script type="module" crossorigin src="${APP_URL}/${file}">
  </script>
  <script rel="modulepreload" src="${APP_URL}/${script}"></script>
  <link rel="stylesheet" href="${APP_URL}/${css}"/>
  <div id="rubics_app_component">${content}</div>
  <script>var ${propsKey}=${JSON.stringify(store)};</script>
`;
