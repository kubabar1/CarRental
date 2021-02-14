const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const mainConfig = require('../webpack.config');

const dist = path.join(__dirname, 'dist');

module.exports = Object.assign({}, mainConfig, {
    entry: {
        login: './src/login.tsx',
    },
    output: {
        ...mainConfig.output,
        path: dist,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/login.html'),
            chunks: ['login'],
            favicon: './src/images/car_rental_page_logo.png',
            path: dist,
            filename: 'login.html',
        }),
    ],
    devServer: {
        ...mainConfig.devServer,
        index: 'login.html',
    },
});
