import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import stripCode from "rollup-plugin-strip-code";

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
  {
    input: "./src/index.js",
    output: {
      file: "dist/domponent.es5.production.min.js",
      format: "umd",
      name: "Domponent"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      terser({
        ecma: 5,
        compress: {
          drop_console: true
        }
      })
    ]
  },
  {
    input: "./src/index.js",
    output: {
      file: "dist/domponent.es5.development.min.js",
      format: "umd",
      name: "Domponent"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      terser({
        compress: true,
        ecma: 5
      })
    ]
  }
];
