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
    static: path.join(__dirname, 'example'),
    host: 'localhost',
    port: 8080,
    open: false
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // package.json sets "type": "commonjs", but the sources use ES modules
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
