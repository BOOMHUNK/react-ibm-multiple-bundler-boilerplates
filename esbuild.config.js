import path from 'path'
import esbuild from 'esbuild'
import inlineImagePlugin from 'esbuild-plugin-inline-image'
import { sassPlugin } from '@jgoz/esbuild-plugin-sass'

import { clean } from 'esbuild-plugin-clean'

// const nodeModulesPath = path.resolve('node_modules')

esbuild
  .build({
    entryPoints: ['./src/index.jsx'],
    outfile: './build/app.js',
    minify: true,
    bundle: true,
    loader: {
      '.eot': 'file',
      '.woff': 'file',
      '.woff2': 'file'
    },
    alias: {
      '~@ibm/plex': path.resolve('node_modules/@ibm/plex'),
      'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
      'react/jsx-runtime.js': 'react/jsx-runtime'
    },
    plugins: [
      clean({
        patterns: ['./build/*']
      }),
      inlineImagePlugin(),
      sassPlugin()
    ]
  })
  .catch(() => process.exit(1))
