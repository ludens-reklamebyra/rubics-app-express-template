import { describe, it } from 'vitest';
import { mockExpress } from '../../../../test/vitest.mock.js';
import { getPublicData } from './public.controllers';

describe('public.controllers', () => {
  it('should fetch public routes with only site in query', async () => {
    const { req, res, next } = await mockExpress.contextWithMiddlewares({
      url: `http://localhost:2000/api/v1/public?site=config`,
    });
    await getPublicData(req, res, next);
    // todo: Fix test
  });
});
