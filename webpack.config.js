const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'src');
const SCSS_DIR = path.resolve(__dirname, 'src/scss');
const extractSass = new ExtractTextPlugin({
    filename: './css/[name].css',
    allChunks: true
  });
  
// const BUILD_DIR = path.resolve(__dirname, 'dist/js');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: [APP_DIR + '/App.jsx', SCSS_DIR +'/index.scss'],
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
    },
    target: 'web',
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            }, {
                test: /\.(sass|scss)$/,
                use:extractSass.extract(['css-loader', 'postcss-loader', 'sass-loader'])
            }
        ]
    },
    plugins:[
        extractSass
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css','.scss'],
    }
}