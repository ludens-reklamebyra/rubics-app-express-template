import React from 'react';
import AppBar from '@ludens-reklame/rubics-app-bridge/dist/actions/AppBar';

export default function useAppBar(slug: string, path: string, label: string) {
  React.useEffect(() => {
    new AppBar({ breadcumbs: [{ slug, path, label }] });
  }, [slug, path, label]);
}
