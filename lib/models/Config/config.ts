import mongoose from 'mongoose';
import {ConfigSchema} from './config.schema.js';
import {IConfigDocument, IConfigModel} from './config.types.js';

export * from './config.types.js';

ConfigSchema.index({ site: 1 });

export const Config = mongoose.model<IConfigDocument, IConfigModel>(
  'Config',
  ConfigSchema
);
