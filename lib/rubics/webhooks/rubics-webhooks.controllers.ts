import { Request, Response, NextFunction } from 'express';
import { IConfig } from '../../models/Config/config.types.js';

interface SettingsPayload {
  app: string;
  settings: Partial<IConfig>;
}

const KEYS: (keyof IConfig)[] = [];
const toSet = (payload: SettingsPayload) => {
  const body: Partial<IConfig> = {};
  for (const _key in payload.settings) {
    const key = _key as keyof IConfig;
    if (KEYS.includes(key)) {
      body[key] = payload.settings[key] as any;
    }
  }
  return body;
};

export const appSettingsUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body.payload as SettingsPayload;
    const set = toSet(body);

    if (Object.keys(set).length > 0) {
      await req.models.Config.updateOne(
        { _id: req.state.config._id },
        {
          $set: set,
        }
      );
    }

    res.send('OK');
  } catch (e) {
    next(e);
  }
};
