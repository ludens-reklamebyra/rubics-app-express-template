import { describe, expect, it, vi } from 'vitest';
import { mockExpress } from '../../test/vitest.mock.js';

describe('app config', () => {
  it('should set state', () => {
    const next = vi.fn();
    const { req } = mockExpress.context();
    expect(req.state).toBeTypeOf('object');
    expect(next).toHaveBeenCalledOnce();
  });
});
