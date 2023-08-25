// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mainConfig = require('../webpack.config');

module.exports = Object.assign({}, mainConfig, {
    name: 'reservation-page',
    entry: {
        reservation: path.join(__dirname, 'src/reservation.tsx'),
    },
    output: {
        ...mainConfig.output,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            chunks: ['reservation'],
            favicon: path.join(__dirname, 'src/images/car_rental_page_logo.png'),
            filename: '../reservation-page/reservation.html',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/reservation_status.html'),
            chunks: ['reservation_status'],
            favicon: path.join(__dirname, 'src/images/car_rental_page_logo.png'),
            filename: '../reservation-page/reservation_status.html',
        }),
    ]
});
