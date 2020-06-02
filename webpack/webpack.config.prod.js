// const Path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.comm.js')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    // stats: 'errors-only',
    bail: true,
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
    },
    optimization: {
        removeEmptyChunks: false,
        mergeDuplicateChunks: false,
        minimize: true,
        minimizer: [
            (compiler) => {
                new TerserPlugin({
                    terserOptions: {
                        ecma: 5,
                        compress: {
                            passes: 2
                        },
                        output: {
                           // comments: 'all',
                            beautify: false
                        },
                        mangle: true,
                        parallel: 3
                    }

                }).apply(compiler)
            }
        ],
        splitChunks: {
            chunks: 'all',
            name: true
        }
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new Webpack.optimize.ModuleConcatenationPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
})
