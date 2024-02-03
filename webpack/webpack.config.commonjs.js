const Path = require("path")
const Webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.comm.js")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(common, {
    mode: "production",
    output: {
        library: "Pocket",
        libraryTarget: "umd",
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
        chunkFilename: "js/[name].chunk.js"
    },
    plugins: [
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ],
    optimization: {
        namedModules: true,
        concatenateModules: false,
        removeEmptyChunks: false,
        mergeDuplicateChunks: false,
        minimize: true,
        minimizer: [
            (compiler) => {
                new TerserPlugin({
                    terserOptions: {
                        keep_classnames: true,
                        keep_fnames: true,
                        compress: {
                            passes: 2
                        },
                        ecma: 7,
                        output: {
                            beautify: false
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
                include: Path.resolve(__dirname, "../libs/Pocket/PocketExit.module.js"),
                enforce: "pre",
                loader: "eslint-loader"
            },
            {
                test: /\.(js)$/,
                include: Path.resolve(__dirname, "../libs/Pocket/PocketExit.module.js"),
                loader: "babel-loader"
            }
        ]
    }
})
