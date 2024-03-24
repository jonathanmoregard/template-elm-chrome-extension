/* global require module */

const outputDir = "TemplateElmChromeExtension";

const webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = WebpackMerge(commonConfig, {
  devtool: "inline-source-map",
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          { loader: "elm-hot-webpack-loader" },
          {
            loader: "elm-webpack-loader",
            options: {
              // add Elm's debug overlay to output
              debug: false,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      staticOptions: { index: "app.html" },
      directory: `./${outputDir}`,
    },
    port: 9000,
    hot: true,
  },
  stats: "errors-only",
});
