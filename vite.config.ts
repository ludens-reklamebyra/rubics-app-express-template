import { resolve } from 'path';
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

const watch = process.argv.includes('--watch');
const componentsRoot = resolve(__dirname, 'src', 'components');

const plugins: PluginOption[] = [react()];

if (!watch) {
  plugins.push(viteCompression());
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        dashboard: resolve(__dirname, 'src', 'dashboard', 'index.tsx'),
        component: resolve(componentsRoot, 'Component', 'index.tsx'),
        componentCss: resolve(componentsRoot, 'Component', 'component.css'),
      },
    },
    outDir: 'public',
    assetsDir: 'js',
    manifest: true,
    minify: !watch,
  },
  plugins,
});
