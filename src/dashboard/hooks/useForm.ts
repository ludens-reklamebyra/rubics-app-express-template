import { FormEvent, useCallback, useMemo, useState } from 'react';
import { fetchFromApi } from '../../utils/api';

type UseFormFn = (e: FormEvent<HTMLFormElement>) => Promise<void>;

export default function useForm(
  path: string,
  method: 'PATCH' | 'POST' = 'PATCH'
): [busy: boolean, onSubmit: UseFormFn, error: Error | null] {
  const [error, setError] = useState<Error | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        setBusy(true);
        e.preventDefault();
        const body = new FormData(e.target as HTMLFormElement);
        const _id = body.get('_id');
        body.delete('_id');
        await fetchFromApi(`${path}/${_id}`, {
          headers: new Headers({}),
          method,
          body,
        });
        window.location.reload();
      } catch (e: any) {
        setError(e);
      } finally {
        setBusy(false);
      }
    },
    [path, method]
  );

  return useMemo(() => [busy, onSubmit, error], [busy, onSubmit, error]);
}
