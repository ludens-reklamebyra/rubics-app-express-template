import { NextFunction, Request, Response } from 'express';
import { TokenResponse } from '@ludens-reklame/rubics-app-sdk';
import { RubicsError } from '../../../rubics-app-sdk/lib/index.js';

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

export function initRequestState(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  req.state = {} as Request['state'];
  next();
}
