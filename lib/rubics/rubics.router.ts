import express from 'express';
import {
  authorize,
  authorizeWebhook,
  install,
  installCallback,
} from '@ludens-reklame/rubics-app-express';
import { setConfigToCtx } from '../middleware/app.middlewares.js';
import rubicsComponentsRouter from './components/rubics-components.router.js';
import dashboardRoutes from './dashboard/dashboard.routes.js';
import rubicsWebhooksRouter from './webhooks/rubics-webhooks.router.js';

const rubicsRouter = express();

rubicsRouter.get('/install', install);
rubicsRouter.get('/install/callback', installCallback);
rubicsRouter.use(setConfigToCtx);
rubicsRouter.use('/components', authorizeWebhook, rubicsComponentsRouter);
rubicsRouter.use('/webhooks', authorizeWebhook, rubicsWebhooksRouter);
rubicsRouter.use('/dashboard', authorize, dashboardRoutes);

export default rubicsRouter;
