import fs from 'fs';
import path from 'path';

export interface IManifestInput {
  file: string;
  src: string;
  isEntry: boolean;
  imports: string[];
}

export interface IManifest {
  'src/dashboard/index.tsx': IManifestInput;
  'src/components/Component/index.tsx': IManifestInput;
  [key: string]: IManifestInput;
}

export const manifest: IManifest = JSON.parse(
  fs.readFileSync(path.join('public', 'manifest.json'), 'utf-8')
);
