import { describe, it } from 'vitest';
import { mockExpress } from '../../test/vitest.mock.js';
import { ping } from './api.controllers';

describe('API', () => {
  it('should ping and return pong', () => {
    const { req, res } = mockExpress.context();
    ping(req, res);
    // todo Fix test
  });
});
