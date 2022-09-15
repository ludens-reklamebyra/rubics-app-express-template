import { describe, it, expect } from 'vitest';
import { mockExpress, toSpy } from '../../test/vitest.mock.js';
import { ping } from './api.controllers';

describe('API', () => {
  it('should ping and return pong', async () => {
    const { req, res } = await mockExpress.contextWithMiddlewares();
    ping(req, res);
    expect(toSpy(res.send).calls[0][0]).to.equal('pong');
  });
});
