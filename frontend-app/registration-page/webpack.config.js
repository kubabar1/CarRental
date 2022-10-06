// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mainConfig = require('../webpack.config');

module.exports = Object.assign({}, mainConfig, {
    name: 'registration-page',
    entry: {
        registration: path.join(__dirname, 'src/registration.tsx'),
    },
    output: {
        ...mainConfig.output,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            chunks: ['registration'],
            favicon: path.join(__dirname, 'src/images/car_rental_page_logo.png'),
            filename: '../registration-page/registration.html',
        }),
    ],
    devServer: {
        ...mainConfig.devServer,
        index: 'registration.html',
    },
});
