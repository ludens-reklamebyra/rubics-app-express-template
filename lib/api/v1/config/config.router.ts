import express from 'express';
import { editConfig } from './config.controllers.js';

const configRouter = express();

configRouter.patch('/', editConfig);

export default configRouter;
