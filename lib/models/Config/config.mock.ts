import mongoose from 'mongoose';
import { SCOPES } from '../../utils/constants.js';
import { Config, IConfigLean } from './config.js';

export const mockConfigId = new mongoose.Types.ObjectId();
export const mockConfig = (override: Partial<IConfigLean> = {}) =>
  new Config({
    _id: new mongoose.Types.ObjectId(),
    name: 'config',
    site: 'site',
    token: 'token',
    scopes: [SCOPES],
    setting: 'setting',
    ...override,
  });
