import express from 'express';
import { getComponentsComponent } from './rubics-components.controllers.js';

const rubicsComponentsRouter = express();

rubicsComponentsRouter.post('/component', getComponentsComponent);

export default rubicsComponentsRouter;
