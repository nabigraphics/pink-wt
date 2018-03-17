const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src');
module.exports = {
    mode: 'production',
    entry: {
        vender: ['babel-polyfill'],
        index: [APP_DIR + '/App.jsx'],
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
                test: /\.scss?/,
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    optimization:{
        minimize: true,
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    }
}