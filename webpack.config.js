const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'example/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'example'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    static: path.join(__dirname, 'example'),
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/index.html'
    })
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
