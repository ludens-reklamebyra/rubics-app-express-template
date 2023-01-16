import express from 'express';
import {
  authorize,
  authorizeWebhook,
  install,
  installCallback,
} from '@ludens-reklame/rubics-app-express';
import { setConfigToCtx } from '../config/app.js';
import rubicsComponentsRouter from './components/rubics-components.router.js';
import dashboardRoutes from './dashboard/dashboard.routes.js';
import rubicsWebhooksRouter from './webhooks/rubics-webhooks.router.js';

const rubicsRouter = express();

rubicsRouter.get('/install', install);
rubicsRouter.get('/install/callback', installCallback);
rubicsRouter.use(
  '/components',
  authorizeWebhook,
  setConfigToCtx,
  rubicsComponentsRouter
);
rubicsRouter.use(
  '/webhooks',
  authorizeWebhook,
  setConfigToCtx,
  rubicsWebhooksRouter
);
rubicsRouter.use('/dashboard', authorize, setConfigToCtx, dashboardRoutes);

export default rubicsRouter;
