import express from 'express';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { postComponentsRender } from './rubics-components.controllers.js';

const components = readdirSync(resolve('src', 'components'));

const rubicsComponentsRouter = express();

components.forEach((component) => {
  rubicsComponentsRouter.post(
    `/${component.toLowerCase()}`,
    postComponentsRender(component)
  );
});

export default rubicsComponentsRouter;
