const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    context: path.join(__dirname, './app'),
    entry: './src/index.js',
    target: 'web',
    output: {
        path: __dirname + "/app/dist",
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ],
        rules: [{
            test: /\.js$/,
            exclude: ['node_modules'],
            loader: 'babel-loader',
            query: {
                babelrc: false,
                presets: [
                    ['es2015', { modules: false }],
                ],
                cacheDirectory: true
            }
        }]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: false
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, './app/src/assets'), to: path.join(__dirname, './app/dist/assets') }
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        host: 'localhost',
        contentBase: __dirname + '/app/dist/',
        port: 3000,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};