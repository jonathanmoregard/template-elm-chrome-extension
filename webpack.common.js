/* global require module __dirname */

const packageDetails = require("./package.json");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const sourceDir = "src";
const outputDir = "TemplateElmChromeExtension";

module.exports = {
  context: __dirname,
  mode: "development",
  entry: {
    app: `./${sourceDir}/js/app/app.js`,
    background: `./${sourceDir}/js/background.js`,
    'content-script': `./${sourceDir}/js/content-script.js`
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.scss$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-private-methods"
          ]
        }
      },
      {
        test: /.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [outputDir]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${sourceDir}/manifest.json`,
          to: 'manifest.json',
          transform: (content, path) =>
            content
              .toString()
              .replace(/#version#/g, packageDetails.version)
              .replace(/#description#/g, packageDetails.description)
        },
        {
          from: `${sourceDir}/assets/icons`,
          to: "icons"
        }
      ]
    }),    
    new HtmlWebpackPlugin({
      template: `${sourceDir}/js/app/app.html`,
      filename: "app.html",
      chunks: ['app'],
    }),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".elm", ".scss", ".png"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, outputDir),
    publicPath: ""
  }
};