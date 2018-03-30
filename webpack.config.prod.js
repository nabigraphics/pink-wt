const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_DIR = path.resolve(__dirname, 'src');
const SCSS_DIR = path.resolve(__dirname, 'src/scss');
const extractSass = new ExtractTextPlugin({
    filename: './css/[name].css',
});

module.exports = {
    mode: 'production',
    entry: {
        vender: ['babel-polyfill'],
        index: [APP_DIR + '/App.jsx', SCSS_DIR + '/index.scss'],
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
    },
    target: 'web',
    // node: {
    //     fs: 'empty'

    // },
    node: true,
    module: {
        rules: [
            {
                test: /\.js?/,
                // exclude: /node_modules/,
                // include: ['webtorrent'],
                use: { loader: "babel-loader" },
            }, {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" },
            }, {
                test: /\.(sass|scss)$/,
                include: SCSS_DIR,
                use: extractSass.extract([{ loader: 'css-loader' }, { loader: 'postcss-loader' }, { loader: 'sass-loader' }])
            },
        ]
    },
    plugins: [
        extractSass
    ],
    optimization: {
        minimize: true,
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    }
}