const HtmlWebPackPlugin = require("html-webpack-plugin");
require("babel-polyfill");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [
      'babel-polyfill', './src/index.js'
    ],
    output: {
      publicPath: '/'
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          },
          {
            test: /\.scss|css$/i,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
              }
            ]
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./dist/index.html",
          filename: "./index.html",
          favicon: "./dist/favicon.ico"
        }),
        new Dotenv({
          path: './.env',
          systemvars: true
        })
    ]
  }
