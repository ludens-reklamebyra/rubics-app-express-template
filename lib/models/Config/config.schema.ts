import mongoose from 'mongoose';
import { EncryptedString } from '../model.getters.js';
import { IConfigDocument, IConfigModel } from './config.types.js';

export const ConfigSchema = new mongoose.Schema<IConfigDocument, IConfigModel>(
  {
    site: { type: String, required: true, unique: true },
    token: { ...EncryptedString, required: true },
    scope: [{ type: String }],
    setting: String,
    createdAt: { type: Date, default: () => new Date() },
  },
  {
    toObject: { getters: true, virtuals: true },
    toJSON: {
      virtuals: true,
      transform: (_, doc) => {
        delete doc.token;
        return doc;
      },
    },
  }
);
