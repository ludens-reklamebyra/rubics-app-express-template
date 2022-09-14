import { describe, expect, it, vi } from 'vitest';
import { mockExpress } from '../../test/vitest.mock.js';
import { initRequestState } from './app.middlewares.js';

describe('App middleware', () => {
  it('should set state', () => {
    const next = vi.fn();
    const { req, res } = mockExpress.context();
    initRequestState(req, res, next);
    expect(next).toHaveBeenCalledOnce();
  });
  it('should populate page data on job', async () => {
    const { req, res } = await mockExpress.contextWithMiddlewares();
    const next = vi.fn();
    req.state.job = (await Job.findOne({}))!;
    await populateRubicsPageToJob()(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(req.state.job).toBeTruthy();
    expect(req.state.job.page).toBeTruthy();
    expect(req.state.job.page).to.have.property('title');
  });
});
