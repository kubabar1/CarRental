const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const mainConfig = require('../webpack.config');

const dist = path.join(__dirname, 'dist');

module.exports = Object.assign({}, mainConfig, {
    entry: {
        registration: './src/registration.tsx',
    },
    output: {
        ...mainConfig.output,
        path: dist,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/registration.html'),
            chunks: ['registration'],
            favicon: './src/images/car_rental_page_logo.png',
            path: dist,
            filename: 'registration.html',
        }),
    ],
    devServer: {
        ...mainConfig.devServer,
        index: 'registration.html',
    },
});
