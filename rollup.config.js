import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `
/**
 * @license
 * author: ${pkg.author}
 * ${pkg.name} v${pkg.version}
 * (c) 2022-${new Date().getFullYear()}
 * Released under the ${pkg.license} license.
 */
`;

const filename = pkg.main.replace('.js', '');

/** @type {import('rollup').RollupOptions} */
const rollupConfig = {
  input: 'src/index.js',
  output: [
    {
      file: filename + '.js',
      format: 'umd',
      name: 'Calculator',
      exports: 'default',
      banner,
      plugins: [
        terser(),
      ]
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      module: 'es6',
      declarationDir: 'typings'
    }),
    babel(),
  ],
};

export default rollupConfig;
