const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.resolve(__dirname, 'app/index'),
  devServer: {
    historyApiFallback: true,
    outputPath: path.join(__dirname, ''),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: false,
    }),
    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, 'app/static'),
        from: '**/*',
        to: path.resolve(__dirname, ''),
      },
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  postcss: () => [
    precss,
    autoprefixer,
  ],
};
