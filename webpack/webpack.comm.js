const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
// how to assing globals for window: `https://stackoverflow.com/questions/37656592/define-global-variable-with-webpack`

module.exports = {
  entry: {
    //app: Path.resolve(__dirname, '../index.js')
    app: Path.resolve(__dirname, '../Pocket/Pocket.module.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
    library: 'Pocket',
    libraryTarget: 'window'
  },
  // output: {
  //   path: './www/js/',
  //   filename: 'index.js',
  //   library: 'myLibrary',
  //   libraryTarget: 'var'
  plugins: [
    new CleanWebpackPlugin(['build'], { root: Path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ]),
    // new Webpack.ProvidePlugin({
    //   'Pocket': 'Pocket'
    // })
  ],
  resolve: {
    extensions: ['.js'],
    // alias: {
    //   'Pocket': Path.resolve(__dirname, '../Pocket/Pocket.module.js')
    // }
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
