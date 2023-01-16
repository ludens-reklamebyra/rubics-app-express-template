import bodyParser from 'body-parser';
import express from 'express';
import expressStatic from 'express-static-gzip';
import ejs from 'ejs';
import {
  authorize,
  initExpressWithClusters,
} from '@ludens-reklame/rubics-app-express';

import apiRouter from './api/api.router.js';
import cookie from './config/cookie.js';
import cors from './config/cors.js';
import error from './config/error.js';
import db, { connectToDatabase } from './config/db.js';
import helmet from './config/helmet.js';
import id from './config/id.js';
import morgan from './config/morgan.js';
import nocache from './config/nocache.js';
import session from './config/session.js';
import rubicsRouter from './rubics/rubics.router.js';
import app from './config/app.js';
import { PORT } from './utils/constants.js';

connectToDatabase();
const server = express();

server.set('view engine', 'html');
server.engine('html', ejs.renderFile);
server.set('trust proxy', true);

server.use(nocache);
server.use(helmet);
server.use(id);
server.use(morgan);
server.use(cors);
server.use(session);
server.use(cookie);

server.use(db);
server.use(app);

server.use('/api', bodyParser.json(), apiRouter);
server.use('/rubics', bodyParser.json(), rubicsRouter);

server.use(authorize);
server.use(
  expressStatic('public', {
    index: false,
    enableBrotli: true,
    // @ts-ignore
    extensions: ['br'],
  })
);
server.use(error);

initExpressWithClusters(server, Number(PORT));
