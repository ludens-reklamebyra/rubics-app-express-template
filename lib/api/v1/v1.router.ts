import { authorizeApi } from '@ludens-reklame/rubics-app-express';
import express from 'express';
import { setConfigToCtx } from '../../middleware/app.middlewares.js';
import publicRouter from './public/public.router.js';
import configRouter from './config/config.router.js';

const v1Router = express();

v1Router.use('/public', setConfigToCtx, publicRouter);
v1Router.use(authorizeApi);
v1Router.use(setConfigToCtx);
v1Router.use('/config', configRouter);

export default v1Router;
