const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
          test: /\.pug$/,
          use: "pug-loader"
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: "src/index.pug"
      })
    ],
    resolve:
      argv.mode === "development"
        ? {
            alias: {
              domponent: "domponent/dist/domponent.development.js"
            }
          }
        : {},
    devtool: argv.mode === "development" ? "source-map" : false
  };
};
