import express, { Request } from 'express';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { postComponentsRender } from './rubics-components.controllers.js';

const rubicsComponentsRouter = express();
const components = readdirSync(resolve('src', 'components'));

// Extends store for components
const componentStores: {
  [key: string]: (req: Request) => object;
} = {
  MyComponent: (_req: Request) => ({}),
};

components.forEach((component) => {
  rubicsComponentsRouter.post(
    `/${component.toLowerCase()}`,
    postComponentsRender(component, componentStores[component])
  );
});

export default rubicsComponentsRouter;
