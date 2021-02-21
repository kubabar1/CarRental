const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const mainConfig = require('../webpack.config');

const dist = path.join(__dirname, 'dist');

module.exports = Object.assign({}, mainConfig, {
    entry: {
        reservation: './src/reservation.tsx',
        reservation_status: './src/reservation_status.tsx',
    },
    output: {
        ...mainConfig.output,
        path: dist,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            chunks: ['reservation'],
            favicon: './src/images/car_rental_page_logo.png',
            path: dist,
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/reservation_status.html'),
            chunks: ['reservation_status'],
            favicon: './src/images/car_rental_page_logo.png',
            path: dist,
            filename: 'reservation_status.html',
        }),
    ],
    devServer: {
        ...mainConfig.devServer,
        contentBase: dist,
        proxy: {
            '/*': {
                target: 'http://localhost:3000',
                bypass: (req) => {
                    if (req.url.indexOf('/reservation-status') !== -1) {
                        return '/reservation_status.html';
                    } else {
                        return '/index.html';
                    }
                },
            },
        },
    },
});
