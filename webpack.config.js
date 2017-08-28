const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:{
      bundle: ['./src/client.js','./src/scss/style.scss']
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].js'
    },

    devServer: {
        //hot:true,
        inline: true,
        //host:"moe.cloud",
        //port: 25252,
        contentBase: __dirname + '/dist/',
        historyApiFallback: true,

        hot:true,
        port:"3456",
        proxy: {
            "**": "http://x.moe.cloud:25253"
        }

    },

    module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                },
                {
                  test: /\.scss$/,
                  loader: ExtractTextPlugin.extract({fallback:"style-loader",use: "css-loader!sass-loader"})

                },
                {
                  test: /\.css$/,
                  loader: 'style!css!postcss-loader'
                },
                {
                  test:/\.json$/,
                  loader:'json'
                },
                {
                  test: /\.(ttf|eot|woff|woff2|otf|svg)$/,
                  loader: 'file',
                  options: {
                    name: 'fonts/[name].[ext]',
                  },
                }
            ]
        },
    resolveLoader: {
      moduleExtensions: ["-loader"]
    },
    plugins: [
        //new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].css")
    ]
};
