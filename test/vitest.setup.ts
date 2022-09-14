import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';
import { databaseMock, mockExpress, restMock } from './vitest.mock.js';

beforeAll(async () => {
  await databaseMock.beforeAll();
  restMock.beforeAll();
});
beforeEach(async () => {
  await databaseMock.beforeEach();
});
afterEach(async () => {
  await databaseMock.afterEach();
  restMock.afterEach();
  mockExpress.reset();
});
afterAll(async () => {
  await databaseMock.afterAll();
  restMock.afterAll();
});
