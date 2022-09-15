import { describe, expect, it, vi } from 'vitest';
import { renderDashboard } from './dashboard.utils.js';
import { mockExpress, toSpy } from '../../../test/vitest.mock.js';

const url = 'http://localhost:2000/dashboard';

describe('Web dashboard', () => {
  it('should render HTML to body and have store data in header and root in body', async () => {
    const json = vi.fn();
    const { req, res } = await mockExpress.contextWithMiddlewares({ url });
    res.json = json;
    await renderDashboard(req, res, {});
    const [key, store] = toSpy(res.render).calls[0];
    expect(key).to.equal('dashboard');
    expect(store).to.be.an.instanceof(Object);
    expect((store as any).script).toBeTruthy();
  });
});
