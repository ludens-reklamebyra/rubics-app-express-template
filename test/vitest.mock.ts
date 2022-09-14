import { Request, Response } from 'express';
import { vi } from 'vitest';
import {
  ExpressMock,
  MongooseMock,
  rest,
  RestMock,
} from '@ludens-reklame/vitest-mockify';
import rubicsApp from '@ludens-reklame/rubics-app-express';
import { initMongooseModels } from '../lib/config/mongoose.js';
import { mockConfig, mockConfigId } from '../lib/models/Config/config.mock.js';
import { initTestDatabase } from './mock/models.mock.js';
import { restHandlers } from './mock/rest.mock.js';
import {
  initRequestState,
  onInstall,
} from '../lib/middleware/app.middlewares.js';
import {
  APP_NAME,
  APP_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  IS_DEV,
  RUBICS_URL,
  SCOPES,
} from '../lib/utils/constants.js';

export const databaseMock = new MongooseMock(initTestDatabase);

export const restMock = new RestMock(...restHandlers);

export const mockExpress = new ExpressMock<Request, Response, typeof vi.fn>(
  {},
  {},
  [
    rubicsApp({
      onInstall: onInstall as any,
      development: IS_DEV,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      appName: APP_NAME,
      appUrl: APP_URL,
      rubicsUrl: RUBICS_URL,
      scopes: SCOPES,
    }),
    initRequestState,
    initMongooseModels,
    async (req, _res, next) => {
      req.state.config = mockConfig({ _id: mockConfigId });
      req.rubics.site = req.state.config.site;
      req.rubics.token = req.state.config.token;
      return next();
    },
  ],
  vi.fn
);

export { rest };
