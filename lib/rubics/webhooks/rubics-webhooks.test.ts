import { describe, expect, it, vi } from 'vitest';
import { mockExpress } from '../../../test/vitest.mock.js';
import { appSettingsUpdate } from './rubics-webhooks.controllers.js';
import { Config } from '../../models/Config/config.js';

describe('Rubics webhooks', () => {
  it('should update settings with rubics payload', async () => {
    const next = vi.fn();
    const { req, res } = await mockExpress.contextWithMiddlewares({
      url: 'http://localhost/rubics/webooks/app-settings-update',
      body: {
        site: {
          id: '621f9...921f',
          name: 'test',
        },
        timestamp: 1656320435,
        action: 'appSettingsUpdate',
        payload: {
          app: 'teamtailor',
          settings: {
            setting: 'settings-value',
          },
        },
      },
    });
    await appSettingsUpdate(req, res, next);
    const config = await Config.findOne({});
    expect(config).toBeTruthy();
    expect(config).to.have.property('setting');
    expect(config!.setting).to.equal('settings-value');
  });
});
