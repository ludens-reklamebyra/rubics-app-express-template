import mongoose from 'mongoose';
import { SimplePageWithParents } from '@ludens-reklame/rubics-sdk/dist/types';

export const mockRubicsStorefrontPageId = new mongoose.Types.ObjectId();
export const mockRubicsStorefrontPage = {
  _id: mockRubicsStorefrontPageId.toHexString(),
  title: 'Page title',
  slug: 'page-slug',
  url: '/page-slug',
  plug: {
    title: 'Page title',
  },
  author: {
    _id: new mongoose.Types.ObjectId().toHexString(),
    name: '',
  },
  ingress: '',
  featuredImage: undefined,
  tags: [],
};
export const mockRubicsStorefrontPages: SimplePageWithParents[] = [
  mockRubicsStorefrontPage,
  {
    _id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Page title 2',
    slug: 'page-slug-2',
    url: '/page-slug-2',
    plug: {
      title: 'Page title 2',
    },
    author: {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: '',
    },
    ingress: '',
    featuredImage: undefined,
    tags: [],
  },
];
