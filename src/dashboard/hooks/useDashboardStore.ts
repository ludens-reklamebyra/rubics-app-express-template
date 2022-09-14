import React from 'react';
import { InputStore } from '../../../lib/types/web';

export default function useDashboardStore(): InputStore {
  // @ts-ignore
  return React.useMemo<InputStore>(() => window['store'] as InputStore, []);
}
