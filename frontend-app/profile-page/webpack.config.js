// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mainConfig = require('../webpack.config');

module.exports = Object.assign({}, mainConfig, {
    name: 'profile-page',
    entry: {
        profile: path.join(__dirname, 'src/index.tsx'),
    },
    output: {
        ...mainConfig.output,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            chunks: ['profile'],
            favicon: path.join(__dirname, 'src/images/car_rental_page_logo.png'),
            filename: '../profile-page/profile.html',
        }),
    ],
    devServer: {
        ...mainConfig.devServer,
        index: 'profile.html',
    },
});
