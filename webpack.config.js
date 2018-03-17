const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
// const BUILD_DIR = path.resolve(__dirname, 'dist/js');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
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
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    }
}