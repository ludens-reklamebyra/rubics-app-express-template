import { useCallback, useMemo, useState } from 'react';
import type { Types } from 'mongoose';
import { fetchFromApi } from '../../utils/api';

type DocOrId = Types.ObjectId | { _id: Types.ObjectId };
const toId = (doc: DocOrId) => ('_id' in doc ? doc._id : doc);

export type UseDeleteFn = (docOrId: DocOrId) => () => Promise<void>;
export default function useDelete(
  path: string,
  onDelete: () => void
): [UseDeleteFn, Error | null] {
  const [error, setError] = useState<Error | null>(null);

  const _onDelete = useCallback(
    (docOrId: DocOrId) => async () => {
      if (window.confirm('Er du sikker?')) {
        try {
          await fetchFromApi(`${path}/${toId(docOrId)}`, {
            method: 'DELETE',
          });
          onDelete();
        } catch (e: any) {
          setError(e);
        }
      }
    },
    [path, onDelete]
  );

  return useMemo(() => [_onDelete, error], [_onDelete, error]);
}
