import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import run from '@rollup/plugin-run';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];

/** @type {import('rollup').RollupOptions} */
const config = {
    input: 'src/app.ts',
    output: {
        dir: 'dist',
        format: 'es',
        name: 'Cardinal',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js',
    },
    
    plugins: [
        resolve({ extensions }),
        commonjs(),
        babel({
          extensions,
          babelHelpers: 'bundled',
          include: ['src/**/*'],
        }),
      ],
}

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  config.watch = {};
  config.output.sourcemap = true;
  config.plugins = [
    ...config.plugins,
    run(),
  ];
}

if (!isDevelopment) {
  config.output.sourcemap = false;
  config.plugins = [...config.plugins, terser({})];
}

export default config;