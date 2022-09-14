import { PageContext, RubicsImage } from '@ludens-reklame/rubics-sdk';

export interface IRubicsImage extends RubicsImage {
  _id: string;
}

export interface IRubicsComponentBody {
  site: { name: string };
  timestamp: number;
  query: Record<string, string>;
  pageContext: PageContext;
}
