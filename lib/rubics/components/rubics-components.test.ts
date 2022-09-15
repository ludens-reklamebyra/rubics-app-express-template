import { describe, expect, it, vi } from 'vitest';
import { mockExpress, toSpy } from '../../../test/vitest.mock.js';
import { IRubicsComponentBody } from '../../types/rubics.js';
import { APP_URL } from '../../utils/constants.js';
import { postComponentsRender } from './rubics-components.controllers.js';

describe('components', () => {
  describe('/jobs', () => {
    it('should render jobs as html and respond with object', async () => {
      const { req, res } = await mockExpress.contextWithMiddlewares({
        url: `${APP_URL}/rubics/components/my-component`,
        body: {
          site: { name: 'site' },
          timestamp: 1662978668,
          query: {},
          pageContext: {},
        } as IRubicsComponentBody,
      });
      res.json = vi.fn();

      await postComponentsRender('MyComponent')(req, res);

      const html = toSpy(res.json).calls[0][0].html;
      expect(html).to.match(/<script type="module" crossorigin src="/);
      expect(html).to.match(/<script rel="modulepreload" src="/);
      expect(html).to.match(
        /<div id="rubics_app_component"><div class="rubics-app-component">/
      );
      expect(html).to.match(/<script>var __MY_APP_MYCOMPONENT__={"appUrl":/);
    });
  });
});
