const HtmlWebPackPlugin = require("html-webpack-plugin");
require("babel-polyfill");
const Dotenv = require('dotenv-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const path = require('path');

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
            loader: 'url-loader',
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
    }),
    new WebpackPwaManifest({
      name: 'New York Times Bestsellers',
      start_url: '/',
      short_name: 'NYT Best Sellers',
      description: 'New york times bestsellers books.',
      display: "standalone",
      orientation: "portrait",
      background_color: '#f0f2f5',
      theme_color: '#96f2d7',
      inject: true,
      ios: true,
      icons: [
        {
          "src": path.resolve('assets/icons/android-icon-36x36.png'),
          "size": "36x36"
        },
        {
          "src": path.resolve('assets/icons/android-icon-48x48.png'),
          "size": "48x48"
        },
        {
          "src": path.resolve('assets/icons/android-icon-72x72.png'),
          "size": "72x72"
        },
        {
          "src": path.resolve('assets/icons/android-icon-96x96.png'),
          "size": "96x96"
        },
        {
          "src": path.resolve('assets/icons/android-icon-144x144.png'),
          "size": "144x144"
        },
        {
          "src": path.resolve('assets/icons/android-icon-192x192.png'),
          "size": "192x192"
        },
        {
          "src": path.resolve('assets/icons/apple-icon-152x152.png'),
          "size": "152x152",
          "ios": true,
          "destination": path.join('icons', 'ios'),
        }
      ]
    }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   maximumFileSizeToCacheInBytes: 100000000
    // }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: "./src/service-worker.js"
    // })
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/service-worker.js')
    }),
  ]
}
