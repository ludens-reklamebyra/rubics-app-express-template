import 'dotenv/config';

export const CORS_ALLOW_URLS: string[] = (process.env.CORS_ALLOW_URLS || '')
  .split(',')
  .map((x) => x.trim());
export const SSO_COOKIE_SECRET =
  process.env.SSO_COOKIE_SECRET || 'cookie-secret';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;
export const IS_TEST = !!process.env.TEST;
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

export const PORT: string | number =
  (process.env.PORT as any) || process.getuid!() || 2000;
export const MONGO_CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || '';

export const APP_NAME = 'my-app';
export const CLIENT_ID = process.env.CLIENT_ID || '';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
export const SCOPES = ['read:content'];

export const SESSION_SECRET = process.env.SESSION_SECRET || 'session-secret';
export const DOMAIN = process.env.DOMAIN || '';
export const APP_URL = process.env.APP_URL || '';
export const RUBICS_URL =
  process.env.RUBICS_URL || 'https://service.rubics-vp.com';

export const DEV_SITE = process.env.DEV_SITE;
