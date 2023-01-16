import { Request, Response } from 'express';
import { vi, MockContext } from 'vitest';
import { ExpressMock } from '@ludens-reklame/vitest-mockify/dist/ExpressMock.js';
import { MongooseMock } from '@ludens-reklame/vitest-mockify/dist/MongooseMock.js';
import { RestMock } from '@ludens-reklame/vitest-mockify/dist/RestMock.js';
import rubicsApp from '@ludens-reklame/rubics-app-express';
import db from '../lib/config/db.js';
import { mockConfig, mockConfigId } from '../lib/models/Config/config.mock.js';
import { initTestDatabase } from './mock/models.mock.js';
import { restHandlers } from './mock/rest.mock.js';
import { onInstall } from '../lib/config/app.js';
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
    db,
    async (req, res, next) => {
      req.state.config = mockConfig({ _id: mockConfigId });
      req.rubics.site = req.state.config.site;
      req.rubics.token = req.state.config.token;
      res.render = vi.fn() as any;
      res.json = vi.fn() as any;
      res.send = vi.fn() as any;
      return next();
    },
  ],
  vi.fn
);

export const toSpy = <T extends (...args: any) => any>(
  fn: T
): MockContext<Parameters<T>, ReturnType<T>> => fn as any;
