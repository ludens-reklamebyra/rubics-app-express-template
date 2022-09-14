import express from 'express';
import { setConfigToCtx } from '../../middleware/app.middlewares.js';
import { appSettingsUpdate } from './rubics-webhooks.controllers.js';

const rubicsWebhooksRouter = express();

rubicsWebhooksRouter.post(
  '/app-settings-update',
  setConfigToCtx,
  appSettingsUpdate
);

export default rubicsWebhooksRouter;
