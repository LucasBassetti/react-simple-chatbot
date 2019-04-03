const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'lib/index'),
  externals: {
    'styled-components': 'styled-components',
    react: 'react'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-simple-chatbot.js',
    publicPath: 'dist/',
    library: 'ReactSimpleChatbot',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new UglifyJsPlugin({
      comments: false
    }),
    process.env.BUNDLE_ANALYZE === 'true' ? new BundleAnalyzerPlugin() : () => {}
  ],
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
