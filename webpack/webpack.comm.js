const Path = require("path")
const CleanWebpackPlugin = require("clean-webpack-plugin")
// const CopyWebpackPlugin = require("copy-webpack-plugin")
// const Webpack = require('webpack')
// how to assing globals for window: `https://stackoverflow.com/questions/37656592/define-global-variable-with-webpack`

const entry = () => {
    if (process.env.NODE_ENV === "none") {
        return {
            pocket_umd: Path.resolve(__dirname, "../libs/Pocket/PocketExit.module.js")
        }
    } else {
        return {
            pocket_browser: Path.resolve(__dirname, "../libs/versions/Pocket.browser.js")
        }
    }
    // executes es6+ app:
    // app: ['@babel/polyfill',Path.resolve(__dirname, '../Pocket/versions/Pocket.browser.js')]
}

module.exports = {
    entry: entry(),
    output: {
        path: Path.join(__dirname, "../build"),
        filename: "js/[name].js",
        // NOTE only use if not setting window.xxx globals for `browser` versions
        library: "Pocket",
        // libraryTarget: process.env.NODE_ENV === 'none' ? 'commonjs-module' : 'window'
        libraryTarget: "umd",
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },

    plugins: [
        new CleanWebpackPlugin(["build/js"], { root: Path.resolve(__dirname, "..") })
        // new CopyWebpackPlugin([{ from: Path.resolve(__dirname, "../build"), to: "build" }])
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            }
        ]
    }
}
