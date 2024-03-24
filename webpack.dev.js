/* global require module */
const WebpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const ExtReloader = require("webpack-ext-reloader");

module.exports = WebpackMerge(commonConfig, {
  devtool: "inline-source-map",
  plugins: [
    new ExtReloader({
      reloadPage: true, // Force the reload of the page also
      entries: {
        // The entries used for the content/background scripts
        contentScript: "content-script", // Use the entry names, not the file name or the path
        background: "background" // *REQUIRED
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          {
            loader: "elm-hot-webpack-loader"
          },
          {
            loader: "elm-webpack-loader",
            options: {
              // add Elm's debug overlay to output
              debug: true,
              optimize: false,
              cwd: __dirname
            }
          }
        ]
      }
    ]
  }
});