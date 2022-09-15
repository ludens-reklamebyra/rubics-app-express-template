import { Request, Response } from 'express';
import { InputStore, OutputStore } from '../../types/web.js';
import { APP_URL } from '../../utils/constants.js';
import { manifest } from '../../utils/manifest.js';

export async function renderDashboard(
  req: Request,
  res: Response,
  store: Omit<InputStore, 'site'> = {}
) {
  return res.render('dashboard', {
    ...getRuntimeAndScript(),
    store: createDashboardStore({
      site: req.rubics.site,
      ...store,
    }),
  });
}

export function createDashboardStore(store: InputStore) {
  const output: OutputStore = {
    ...store,
    origin: APP_URL || '',
  };

  return output;
}

export function getRuntimeAndScript() {
  const script = manifest['src/dashboard/index.tsx'].file;
  const runtime = manifest['src/dashboard/index.tsx'].imports[0];
  return { script, runtime: manifest[runtime].file };
}
