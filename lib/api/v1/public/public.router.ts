import express from 'express';
import { getPublicData } from './public.controllers.js';

const publicRouter = express();

publicRouter.get('/', getPublicData);

export default publicRouter;
