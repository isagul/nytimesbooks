const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: './'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          name: 'async',
          chunks: 'async',
          minChunks: 4,
        },
      },
    },
    runtimeChunk: true,
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // publicPath: '/dist/',
                    sourceMap: true
                }
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ]
    }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
      chunkFilename: `css/[name].css`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        "API_KEY":process.env.API_KEY,
        "FB_API_KEY":process.env.FB_API_KEY,
        "FB_AUTH_DOMAIN":process.env.AFB_AUTH_DOMAINPI_KEY,
        "FB_DB_URL":process.env.FB_DB_URL,
        "FB_PROJECT_ID":process.env.FB_PROJECT_ID,
        "FB_STORAGE_BUCKET":process.env.FB_STORAGE_BUCKET,
        "FB_MESSAGING_ID":process.env.FB_MESSAGING_ID,
        "FB_APP_ID":process.env.FB_APP_ID,
        "FB_MEASUREMENT_ID":process.env.FB_MEASUREMENT_ID
      }
    })
  ],
  devtool: 'source-map',
};
