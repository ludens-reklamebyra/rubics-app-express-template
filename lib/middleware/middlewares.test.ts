import { describe, expect, it, vi } from 'vitest';
import { mockExpress } from '../../test/vitest.mock.js';
import { initRequestState } from './app.middlewares.js';

describe('App middleware', () => {
  it('should set state', () => {
    const next = vi.fn();
    const { req, res } = mockExpress.context();
    initRequestState(req, res, next);
    expect(req.state).toBeTypeOf('object');
    expect(next).toHaveBeenCalledOnce();
  });
});
