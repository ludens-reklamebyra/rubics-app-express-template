import { useMemo } from 'react';
import { Image, RubicsImage } from '@ludens-reklame/rubics-sdk';
import { ImageSizes } from '@ludens-reklame/rubics-sdk/dist/types.js';

export default function useMedia(
  media: RubicsImage | null | undefined,
  width: ImageSizes,
  height: number,
  disableFullWidth?: boolean
) {
  return useMemo(() => {
    if (!media) return null;
    return Image.srcSet(media, width, height, { disableFullWidth });
  }, [media, width, disableFullWidth]);
}
