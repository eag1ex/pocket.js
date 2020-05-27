const Path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.comm.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    output: {
        chunkFilename: 'js/[name].chunk.js'
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: Path.resolve(__dirname, '../Pocket/versions/Pocket.browser.js'),
                enforce: 'pre',
                loader: 'eslint-loader'
                // options: {
                //    presets: ['es2015']
                // }
            },
            {
                test: /\.(js)$/,
                include: Path.resolve(__dirname, '../Pocket/versions/Pocket.browser.js'),
                loader: 'babel-loader'
            }
        ]
    }
})
