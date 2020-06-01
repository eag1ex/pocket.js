const Path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.comm.js')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: 'none',
    output: {
        chunkFilename: 'js/[name].chunk.js'
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('none')
        })
    ],
    optimization: {
        // namedModules: true,
        removeEmptyChunks: false,
        mergeDuplicateChunks: false,
        // minimize: true,
        minimizer: [
            (compiler) => {
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            passes: 2
                        },
                        // ecma: 6,
                        output: { 
                            beautify: false,
                            comments: 'small'
                        },
                        mangle: true,
                        parallel: 3
                    }

                }).apply(compiler)
            }
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: Path.resolve(__dirname, '../Pocket/versions/Pocket.nodejs.js'),
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    presets: [ 'transform-es2015-modules-commonjs'],
                    plugins: []
                }
            }, 
            {
                test: /\.(js)$/,
                include: Path.resolve(__dirname, '../Pocket/versions/Pocket.nodejs.js'),
                loader: 'babel-loader'
            }
        ]
    }
})
