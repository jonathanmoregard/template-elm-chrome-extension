/* global require module */

const WebpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const ElmMinify = require("elm-minify");
const elmMinify = new ElmMinify.WebpackPlugin();

module.exports = WebpackMerge(commonConfig, {
  mode: "production",
  plugins: [elmMinify],
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: "elm-webpack-loader",
          options: {
            optimize: true,
          },
        },
      },
    ],
  },
});
