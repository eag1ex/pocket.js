const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
// how to assing globals for window: `https://stackoverflow.com/questions/37656592/define-global-variable-with-webpack`

module.exports = {
  entry: {
    app: ['@babel/polyfill',Path.resolve(__dirname, '../Pocket/versions/Pocket.browser.js')]
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
    // library: 'Pocket',
    // libraryTarget: 'window'
  },

  plugins: [
    new CleanWebpackPlugin(['build'], { root: Path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ])
  ],
  resolve: {
    extensions: ['.js'],

  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  }
};
