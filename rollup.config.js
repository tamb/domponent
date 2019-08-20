import { terser } from "rollup-plugin-terser";
import stripCode from 'rollup-plugin-strip-code';

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/domponent.production.min.js",
      format: "umd",
      name: "Domponent"
    },
    plugins: [
      terser({
        compress: true,
        ecma: 8,
        mangle: {
          keep_classnames: true
        }
      }),
      stripCode({
        start_comment: "START.DEV",
        end_comment: "END.DEV"
      })
    ]
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/domponent.development.js",
      format: "umd",
      name: "Domponent"
    }
  },
];
