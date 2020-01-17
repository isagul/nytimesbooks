const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',  
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    port: 1905,
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  plugins: [
    new Dotenv({
      path: './.env',
      systemvars: true
    })
]
};
