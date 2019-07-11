import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import includePaths from 'rollup-plugin-includepaths';

module.exports = [
  {
    input: 'src/html-parser.js',
    output: {
      file: 'dist/htmlparser-esm.js',
      format: 'esm'
    },
    plugins: [
      resolve(),
      commonjs({
        namedExports: {
          'node_modules/htmlparser2/lib/index.js': ['htmlparser'],
        }
      }),
      nodeGlobals(),
      builtins(),
      json()
    ]
  },
  {
    input: 'src/compiler.js',
    output: {
      file: 'dist/compiler-esm.js',
      format: 'esm'
    },
    plugins: [
      includePaths({
        paths: ['dist'],
      }),
      replace({
        delimiters: ['', ''],
        values: {
          "htmlparser2": "./htmlparser-esm.js"
        }
      })
    ]
  }
];
