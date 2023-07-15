import path from 'path'
import esbuild from 'esbuild'
import inlineImagePlugin from 'esbuild-plugin-inline-image'
import { sassPlugin } from '@jgoz/esbuild-plugin-sass'

import { copy } from 'esbuild-plugin-copy'
import { clean } from 'esbuild-plugin-clean'

await esbuild
  .build({
    entryPoints: ['./src/index.jsx'],
    inject: ['./src/config.js'],
    outdir: './build/assets/',
    minify: true,
    bundle: true,
    loader: {
      '.js': 'jsx',
      '.ts': 'tsx',
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
      sassPlugin(),
      copy({
        assets: [
          {
            from: ['./src/index.html'],
            to: ['../index.html']
          },
          {
            from: ['./public/**/*'],
            to: ['../']
          }
        ]
      })

    ]
  })
  .catch(() => process.exit(1))
