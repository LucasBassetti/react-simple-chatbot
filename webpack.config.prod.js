const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  target: ['web', 'es5'],
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'lib/index'),
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'styled-components': {
      root: 'styled',
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-simple-chatbot.js',
    library: {
      name: 'ReactSimpleChatbot',
      type: 'umd'
    },
    globalObject: "typeof self !== 'undefined' ? self : this",
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: process.env.BUNDLE_ANALYZE === 'true' ? [new BundleAnalyzerPlugin()] : [],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // flatted ships modern syntax, transpile it with the library
        exclude: /node_modules\/(?!flatted)/,
        // package.json sets "type": "commonjs", but the sources use ES modules
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
