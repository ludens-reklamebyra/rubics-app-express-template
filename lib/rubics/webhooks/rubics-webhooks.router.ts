import express from 'express';
import { appSettingsUpdate } from './rubics-webhooks.controllers.js';

const rubicsWebhooksRouter = express();

rubicsWebhooksRouter.post('/app-settings-update', appSettingsUpdate);

export default rubicsWebhooksRouter;
