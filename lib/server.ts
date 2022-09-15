import bodyParser from 'body-parser';
import express from 'express';
import expressStatic from 'express-static-gzip';
import cookie from 'cookie-parser';
import ejs from 'ejs';
import rubicsApp, {
  authorize,
  initExpressWithClusters,
} from '@ludens-reklame/rubics-app-express';

import apiRouter from './api/api.router.js';
import cors from './config/cors.js';
import errorHandler from './config/error.js';
import { connectToDatabase, initMongooseModels } from './config/mongoose.js';
import session from './config/session.js';
import rubicsRouter from './rubics/rubics.router.js';
import { initRequestState, onInstall } from './middleware/app.middlewares.js';
import {
  APP_NAME,
  APP_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  DEV_SITE,
  IS_DEV,
  PORT,
  RUBICS_URL,
  SCOPES,
} from './utils/constants.js';

connectToDatabase();
const app = express();

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('trust proxy', true);

app.use(cors);
app.use(session);
app.use(cookie(process.env.SSO_COOKIE_SECRET));

app.use(initRequestState);
app.use(initMongooseModels);
app.use(
  rubicsApp({
    onInstall: onInstall as any,
    development: IS_DEV,
    developmentSite: DEV_SITE,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    appName: APP_NAME,
    appUrl: APP_URL,
    appPath: 'rubics',
    rubicsUrl: RUBICS_URL,
    scopes: SCOPES,
  })
);

app.use('/api', bodyParser.json(), apiRouter);
app.use('/rubics', bodyParser.json(), rubicsRouter);

app.use(authorize);
app.use(
  expressStatic('public', {
    index: false,
    enableBrotli: true,
    // @ts-ignore
    extensions: ['br'],
  })
);
app.use(errorHandler);

initExpressWithClusters(app, PORT);
