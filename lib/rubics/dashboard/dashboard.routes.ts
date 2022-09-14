import express from 'express';
import { renderDashboardContent } from './dasbhoard.controllers.js';

const dashboardRoutes = express();

dashboardRoutes.get('/', renderDashboardContent);

export default dashboardRoutes;
