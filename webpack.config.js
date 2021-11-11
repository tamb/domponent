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

const dev = {
  path: path.resolve(__dirname, "dist"),
  filename: "main.dev.js",
  library: {
    name: "Domponent",
    type: "umd"
  }
};

const prodRules = [
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
];

const devRules = [
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/
  }
];

const plugins = [new TypescriptDeclarationPlugin()];

module.exports = env => {
  return {
    mode: "production",
    entry: "./src/index.ts",
    output: env.mode === "production" ? prod : dev,
    plugins,
    module: {
      rules: env.mode === "production" ? prodRules : devRules
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    optimization: {
      minimize: env.mode === "production",
      minimizer: [new TerserPlugin()]
    }
  };
};
