const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
      './src/index.js'
    ],
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
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
          },
        ]
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
      port: 1905
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./dist/index.html",
          filename: "./index.html"
        })
    ]
  }