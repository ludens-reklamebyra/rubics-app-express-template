import { Config } from '../../lib/models/Config/config.js';
import {
  mockConfig,
  mockConfigId,
} from '../../lib/models/Config/config.mock.js';

export async function initTestDatabase() {
  await Promise.all([initTestDatabaseConfig()]);
}

export async function initTestDatabaseConfig() {
  return Config.create(mockConfig({ _id: mockConfigId }));
}
