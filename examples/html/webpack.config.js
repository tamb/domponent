const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env, argv) => {
  return {
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin()],
    resolve: argv.mode === 'development'? {
      alias: {
        domponent: 'domponent/dist/domponent.development.js'
      }
    }: {},
    devtool: argv.mode === 'development'? 'source-map': null,
  };
};
