const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'example/main.jsx'),
  output: {
    path: path.resolve(__dirname, 'example'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),
    host: '0.0.0.0',
    disableHostCheck: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [],
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
