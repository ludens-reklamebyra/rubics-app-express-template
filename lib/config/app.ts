import { NextFunction, Request, Response } from 'express';
import { TokenResponse, RubicsError } from '@ludens-reklame/rubics-app-sdk';
import rubicsApp from '@ludens-reklame/rubics-app-express';
import {
  APP_NAME,
  APP_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  DEV_SITE,
  IS_DEV,
  RUBICS_URL,
  SCOPES,
} from '../utils/constants.js';

export const onInstall = async (
  req: Request,
  site: string,
  json: TokenResponse
) => {
  let config = await req.models.Config.findOne({ site });

  if (config) {
    config.token = json.accessToken;
    config.scope = json.scope;
  } else {
    config = new req.models.Config({
      site,
      token: json.accessToken,
      scope: json.scope,
    });
  }

  await config.save();
};

export async function setConfigToCtx(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const site = req.rubics.site || String(req.query.site);
    if (!site) throw new RubicsError(404, 'siteNotSet');
    const config = await req.models.Config.findOne({ site });
    if (!config) throw new RubicsError(404, 'siteNotFound');
    req.state.config = config;
    req.rubics.token = config.token;
    await next();
  } catch (e) {
    next(e);
  }
}

export default rubicsApp({
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
});
