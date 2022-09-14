import { useCallback, useEffect, useRef, useState } from "react";

type Return<T> = [T, (state: T) => void];
type ValidTypes = number | string;

export function useStateThrottle<T extends ValidTypes>(
  state: T,
  wait = 500,
  onChange?: (state: T) => void,
): Return<T> {
  const init = useRef(false);
  const waitTimer = useRef<number | NodeJS.Timeout>(-1);
  const [_state, _setState] = useState<T>(state);

  const setState = useCallback(
    (newState: T) => {
      if (wait > 0) {
        if (typeof waitTimer.current === 'number') {
          clearTimeout(waitTimer.current);
        } else if ('unref' in waitTimer.current) {
          waitTimer.current.unref();
        }

        waitTimer.current = setTimeout(() => {
          _setState(newState);
        }, wait);
      } else {
        _setState(newState);
      }
    },
    [waitTimer, onChange]
  );

  useEffect(() => {
    if (init.current && onChange) {
      onChange(_state);
    }
    init.current = true;
  }, [onChange, _state])

  return [_state, setState];
}
