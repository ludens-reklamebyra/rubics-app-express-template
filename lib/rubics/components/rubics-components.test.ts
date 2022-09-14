import { describe, it, vi } from 'vitest';
import { mockExpress } from '../../../test/vitest.mock.js';
import { IRubicsComponentBody } from '../../types/rubics.js';
import { APP_URL } from '../../utils/constants.js';
import { getComponentsComponent } from './rubics-components.controllers.js';

describe('components', () => {
  describe('/jobs', () => {
    it('should render jobs as html and respond with object', async () => {
      const { req, res } = await mockExpress.contextWithMiddlewares({
        url: `${APP_URL}/rubics/components/component`,
        body: {
          site: { name: 'site' },
          timestamp: 1662978668,
          query: {},
          pageContext: {},
        } as IRubicsComponentBody,
      });
      res.json = vi.fn();

      await getComponentsComponent(req, res);

      // todo: Fix test here.
    });
  });
});
