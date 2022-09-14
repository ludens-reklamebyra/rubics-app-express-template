import { rest } from '@ludens-reklame/vitest-mockify';
import {
  mockRubicsStorefrontPageId,
  mockRubicsStorefrontPages,
} from './rubics/rubics.mock';

const restHandlers = [
  rest.get(`http://localhost:1337/health`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.body('OK'));
  }),
  rest.get(
    /http:\/\/localhost:1337\/api\/v1\/(admin|storefront)\/pages$/,
    (req, res, ctx) => {
      const text = req.url.searchParams.get('text');
      const ret = text
        ? mockRubicsStorefrontPages.filter((x) => x.title.match(text))
        : mockRubicsStorefrontPages;
      return res(ctx.status(200), ctx.json(ret));
    }
  ),
  rest.get(
    new RegExp(
      `http:\/\/localhost:1337\/api\/v1\/(admin|storefront)\/pages\/${mockRubicsStorefrontPageId.toHexString()}$`
    ),
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockRubicsStorefrontPages[0]));
    }
  ),
  rest.get('*', (req, res, ctx) => {
    console.warn('Rest not mocked', req.url.toString());
    return res(ctx.status(200), ctx.json(mockRubicsStorefrontPages[0]));
  }),
];

export { restHandlers };
