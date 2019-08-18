import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

export default [
  { // for webpack consumption - 
    input: "src/index.js",
    output: {
      file: "dist/domponent.es.js",
      format: "es"
    },
    plugins: [
      terser({
        compress: true,
        ecma: 8,
        mangle: {
          keep_classnames: true
        }
      })
    ]
  },
  { // for CDN consumption
    input: "src/index.js",
    output: {
      file: "dist/domponent.min.js",
      format: "iife",
      name: "Domponent"
    },
    plugins: [
      terser({
        compress: true,
        ie8: true
      }),
      babel({
        exclude: "node_modules/**"
      })
    ]
  }
];
