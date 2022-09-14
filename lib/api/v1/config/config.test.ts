import { describe, expect, it } from 'vitest';
import { mockExpress } from '../../../../test/vitest.mock.js';
import { mockConfigId } from '../../../models/Config/config.mock.js';
import { editConfig } from './config.controllers';
import { Config } from '../../../models/Config/config.js';

describe('config.controllers', () => {
  it('should update config with only customFields', async () => {
    const configBefore = await Config.findOne({ _id: mockConfigId });
    const { req, res, next } = await mockExpress.contextWithMiddlewares({
      body: {
        _id: 'should-not-change',
        site: 'should-not-change',
        token: 'should-not-change',
        scope: ['should-not-change'],
        setting: 'should-change',
      },
    });
    await editConfig(req, res, next);
    const config = await Config.findOne({ _id: mockConfigId });

    const before = configBefore!.toObject();
    const after = config!.toObject();

    expect(after.setting).to.equal('should-change');

    after.setting = before.setting;
    expect(before).to.deep.equal(after);
  });
});
