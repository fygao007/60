import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const directory = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(directory, '..')

await build({
  entryPoints: [path.join(root, 'components/edit-overlay-templates.jsx')],
  outfile: path.join(root, 'assets/bundles/edit-overlay-templates.bundle.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  loader: {
    '.png': 'file',
    '.svg': 'file',
  },
  assetNames: 'edit-overlay-assets/[name]-[hash]',
  legalComments: 'none',
})

console.log('Built React edit overlay preview bundle.')
