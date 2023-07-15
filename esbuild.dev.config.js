import path from 'path'
import esbuild from 'esbuild'
import inlineImagePlugin from 'esbuild-plugin-inline-image'
import { sassPlugin } from '@jgoz/esbuild-plugin-sass'

import { copy } from 'esbuild-plugin-copy'
import { clean } from 'esbuild-plugin-clean'

const ctx = await esbuild
  .context({
    entryPoints: ['./src/index.jsx'],
    inject: ['./src/config.js'],
    outdir: './.serve/assets/',
    bundle: true,
    sourcemap: 'inline',
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
        patterns: ['./.serve/*']
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

await ctx.watch()
const { host, port } = await ctx.serve({
  host: '127.0.0.1',
  port: 3000,
  servedir: '.serve'
})
console.log('watching...')
console.log(`serving development build at: http://${host}:${port}`)
