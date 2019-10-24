const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    port: 1905
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};