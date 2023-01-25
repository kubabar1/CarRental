// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mainConfig = require('../webpack.config');

module.exports = Object.assign({}, mainConfig, {
    name: 'reset-password-page',
    entry: {
        reset_password: path.join(__dirname, 'src/index.tsx'),
    },
    output: {
        ...mainConfig.output,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            chunks: ['reset_password'],
            favicon: path.join(__dirname, 'src/images/car_rental_page_logo.png'),
            filename: '../reset-password-page/reset-password.html',
        }),
    ],
    devServer: {
        ...mainConfig.devServer,
        index: 'reset-password.html',
    },
});
