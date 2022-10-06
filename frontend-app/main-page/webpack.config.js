const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const mainConfig = require('../webpack.config');

module.exports = Object.assign({}, mainConfig, {
    name: 'main-page',
    entry: {
        main: path.join(__dirname, 'src/index.tsx'),
    },
    output: {
        ...mainConfig.output,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            chunks: ['main'],
            favicon: path.join(__dirname, 'src/images/car_rental_page_logo.png'),
            filename: '../main-page/main.html',
        }),
    ],
    devServer: {
        ...mainConfig.devServer,
        index: 'main.html',
    },
});
