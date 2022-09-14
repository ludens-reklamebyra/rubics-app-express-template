import session, { SessionOptions } from 'express-session';
import { IS_PROD } from '../utils/constants.js';

const cookie: SessionOptions['cookie'] = {
  secure: IS_PROD,
  signed: IS_PROD,
  sameSite: IS_PROD ? 'lax' : false,
  httpOnly: true,
  maxAge: 3600000 * 24,
};

if (process.env.SSO_DOMAIN) {
  cookie.domain = process.env.SSO_DOMAIN;
}

const expressSession = session({
  proxy: true,
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: true,
  cookie,
});

export default expressSession;
