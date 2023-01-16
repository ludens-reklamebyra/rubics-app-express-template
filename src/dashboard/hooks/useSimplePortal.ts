import { MouseEventHandler, useCallback, useMemo } from 'react';
import usePortal, { UsePortalOptions } from 'react-useportal';

export default function useSimplePortal(
  opts?: UsePortalOptions
): [Portal: any, open: boolean, toggle: MouseEventHandler] {
  const { Portal, isOpen, openPortal, closePortal } = usePortal(opts);

  const handleToggle = useCallback(
    (e: any) => {
      if (isOpen) {
        closePortal(e);
      } else {
        openPortal(e);
      }
    },
    [isOpen, openPortal, closePortal]
  );

  return useMemo(
    () => [Portal, isOpen, handleToggle],
    [Portal, isOpen, handleToggle]
  );
}
