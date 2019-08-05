import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default [{
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'es'
    },
    plugins: [terser({
        compress: true,
        ecma: 8,
        mangle: {
          keep_classnames: true,
        }
    })]
  },
   {
    input: 'src/index.js',
    output: {
      file: 'dist/domponent.min.js',
      format: 'iife',
      name: 'Domponent'
    },
    plugins: [
      terser({
        compress: true,
        ie8: true,
      }),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }];