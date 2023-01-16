import express from 'express';
import cookieParser from 'cookie-parser';
import { SSO_COOKIE_SECRET } from '../utils/constants.js';
export default cookieParser(SSO_COOKIE_SECRET) as express.RequestHandler;
