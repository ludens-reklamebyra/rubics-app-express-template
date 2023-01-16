import express from 'express';
import expressSession, { SessionOptions } from 'express-session';
import { DOMAIN, IS_PROD, SESSION_SECRET } from '../utils/constants.js';

const cookie: SessionOptions['cookie'] = {
  secure: IS_PROD,
  signed: IS_PROD,
  sameSite: IS_PROD ? 'lax' : false,
  httpOnly: true,
  maxAge: 3600000 * 24,
};

if (DOMAIN) {
  cookie.domain = DOMAIN;
}

const session = expressSession({
  proxy: true,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie,
}) as express.RequestHandler;

export default session;
