import { describe, expect, it, MockContext, vi } from 'vitest';
import { renderDashboard } from './dashboard.utils.js';
import { mockExpress } from '../../../test/vitest.mock.js';

const url = 'http://localhost:2000/dashboard';

describe('Web dashboard', () => {
  it('should render HTML to body and have store data in header and root in body', async () => {
    const json = vi.fn();
    const { req, res } = await mockExpress.contextWithMiddlewares({ url });
    res.json = json;
    await renderDashboard(req, res, {});
    const body = (res.json as unknown as MockContext<any, any>).calls[0];
    expect(body).to.match(/src="\/dashboard\.[a-f\d]{8}\.js"/);
    expect(body).to.match(/window\['store']=\{"/);
    expect(body).to.match(/<div id="root"><\/div>/);
    // todo: Fix test
  });
});
