import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// '~@ibm/plex': path.resolve('node_modules/@ibm/plex'),
// 'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
// 'react/jsx-runtime.js': 'react/jsx-runtime'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '~@ibm/plex',
        replacement: path.resolve('node_modules/@ibm/plex'),
      },
      {
        find: 'react/jsx-dev-runtime.js',
        replacement: 'react/jsx-dev-runtime',
      },
      {
        find: 'react/jsx-runtime.js',
        replacement: 'react/jsx-runtime',
      },
    ],
  },
});
