const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/main.jsx'),
  externals: { 'styled-components': 'styled-components' },
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
    ],
  },
};
