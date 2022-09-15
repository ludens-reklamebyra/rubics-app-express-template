import express from 'express';
import { postComponentsRender } from './rubics-components.controllers.js';

const rubicsComponentsRouter = express();

rubicsComponentsRouter.post(
  '/my-component',
  postComponentsRender('MyComponent')
);

export default rubicsComponentsRouter;
