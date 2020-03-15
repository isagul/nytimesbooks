const webpack = require('webpack');

module.exports = {
  mode: 'development',  
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    port: 3001,
    historyApiFallback: true,
    proxy: {
      '/user': {
          target: 'http://localhost:3000',
          secure: false
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }
  },  
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
