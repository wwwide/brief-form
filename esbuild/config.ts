import { BuildOptions } from 'esbuild'

export const buildConfig = (): BuildOptions => ({
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  bundle: true,
  metafile: true,
  sourcemap: false,
  minify: true,
  splitting: false,
  format: 'cjs',
  color: true,
  publicPath: '/',
  loader: {
    '.js': 'jsx'
  },
  external: ['react', 'react-dom', 'react-query']
})
