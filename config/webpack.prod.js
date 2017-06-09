// webpack.prod.js
var webpack = require('webpack');
var path = require('path');
var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',

    entry: "./src/index.js",

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    resolve: {
        alias: {
            "ag-grid-root" : "../node_modules/ag-grid"
        },
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=[path]/[name].[ext]'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'config/index.html'
        }),

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin()
    ]
};
