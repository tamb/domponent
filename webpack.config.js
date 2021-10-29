const path = require("path");
const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const prod = {
  path: path.resolve(__dirname, "dist"),
  filename: "main.js",
  library: {
    name: "Domponent",
    type: "umd"
  }
};

const prodInput = {
  index: "./src/index.ts"
};

const demoInput = {
  index: "./src/demo.ts"
};

module.exports = env => {
  const plugins = env.demo
    ? [
        env.demo
          ? new HtmlWebpackPlugin({
              template: "src/index.html"
            })
          : null,
        new TypescriptDeclarationPlugin()
      ]
    : [new TypescriptDeclarationPlugin()];

  return {
    mode: "production",
    entry: env.demo ? demoInput : prodInput,
    output: prod,
    plugins,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.ts$/,
          enforce: "pre",
          exclude: /(node_modules|bower_components|\.spec\.js)/,
          use: [
            {
              loader: "webpack-strip-block",
              options: {
                start: "START.DEV",
                end: "END.DEV"
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    //   plugins: [new TypescriptDeclarationPlugin()],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
  };
};
