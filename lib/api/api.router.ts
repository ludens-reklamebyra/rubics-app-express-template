import express from 'express';
import { ping } from './api.controllers.js';
import v1Router from './v1/v1.router.js';

const apiRouter = express();

apiRouter.get('/ping', ping);
apiRouter.use('/v1', v1Router);

export default apiRouter;
