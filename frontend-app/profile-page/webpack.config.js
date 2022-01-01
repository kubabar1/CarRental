// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mainConfig = require('../webpack.config');

const dist = path.join(__dirname, 'dist');

module.exports = Object.assign({}, mainConfig, {
    entry: {
        index: './src/index.tsx',
    },
    output: {
        ...mainConfig.output,
        path: dist,
    },
    plugins: [
        ...mainConfig.plugins,
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            chunks: ['index'],
            favicon: './src/images/car_rental_page_logo.png',
            path: dist,
            filename: 'index.html',
        }),
    ],
    devServer: {
        ...mainConfig.devServer,
        index: 'index.html',
    },
});
