// eslint-disable-next-line @typescript-eslint/no-var-requires
const ESLintPlugin = require('eslint-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StylelintPlugin = require('stylelint-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

process.env.NODE_ENV = 'development';

const eslintOptions = {
    extensions: ['ts', 'tsx', 'js', 'json'],
    exclude: ['**/node_modules/**', '**/build/**', '**/dist/**'],
    failOnError: true,
    failOnWarning: true,
    fix: true,
};

const stylelintOptions = {
    emitError: true,
    emitWarning: true,
    failOnError: false,
    failOnWarning: false,
    fix: true,
};

module.exports = {
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist', 'static'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@car-rental/shared/model': path.resolve(__dirname, './shared/model'),
            '@car-rental/shared/service': path.resolve(__dirname, './shared/service'),
            '@car-rental/shared/constant': path.resolve(__dirname, './shared/constant'),
        }
    },
    mode: process.env.NODE_ENV,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s?[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(gif|svg|jpe?g|png)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ESLintPlugin(eslintOptions),
        new StylelintPlugin(stylelintOptions),
        new webpack.DefinePlugin({
            'process.env.AUTH_SERVICE_PROTOCOL': JSON.stringify(process.env.AUTH_SERVICE_PROTOCOL ?? 'http'),
            'process.env.BOOKING_SERVICE_PROTOCOL': JSON.stringify(process.env.BOOKING_SERVICE_PROTOCOL ?? 'http'),
            'process.env.RATING_SERVICE_PROTOCOL': JSON.stringify(process.env.RATING_SERVICE_PROTOCOL ?? 'http'),
            'process.env.STORAGE_STUB_SERVICE_PROTOCOL': JSON.stringify(process.env.STORAGE_STUB_SERVICE_PROTOCOL ?? 'http'),
            'process.env.USER_SERVICE_PROTOCOL': JSON.stringify(process.env.USER_SERVICE_PROTOCOL ?? 'http'),
            'process.env.VEHICLE_SERVICE_PROTOCOL': JSON.stringify(process.env.VEHICLE_SERVICE_PROTOCOL ?? 'http'),

            'process.env.AUTH_SERVICE_HOSTNAME': JSON.stringify(process.env.AUTH_SERVICE_HOSTNAME ?? 'localhost'),
            'process.env.BOOKING_SERVICE_HOSTNAME': JSON.stringify(process.env.BOOKING_SERVICE_HOSTNAME ?? 'localhost'),
            'process.env.RATING_SERVICE_HOSTNAME': JSON.stringify(process.env.RATING_SERVICE_HOSTNAME ?? 'localhost'),
            'process.env.STORAGE_STUB_SERVICE_HOSTNAME': JSON.stringify(process.env.STORAGE_STUB_SERVICE_HOSTNAME ?? 'localhost'),
            'process.env.USER_SERVICE_HOSTNAME': JSON.stringify(process.env.USER_SERVICE_HOSTNAME ?? 'localhost'),
            'process.env.VEHICLE_SERVICE_HOSTNAME': JSON.stringify(process.env.VEHICLE_SERVICE_HOSTNAME ?? 'localhost'),

            'process.env.AUTH_SERVICE_PORT': JSON.stringify(process.env.AUTH_SERVICE_PORT ?? 8080),
            'process.env.BOOKING_SERVICE_PORT': JSON.stringify(process.env.BOOKING_SERVICE_PORT ?? 8080),
            'process.env.RATING_SERVICE_PORT': JSON.stringify(process.env.RATING_SERVICE_PORT ?? 8080),
            'process.env.STORAGE_STUB_SERVICE_PORT': JSON.stringify(process.env.STORAGE_STUB_SERVICE_PORT ?? 8080),
            'process.env.USER_SERVICE_PORT': JSON.stringify(process.env.USER_SERVICE_PORT ?? 8080),
            'process.env.VEHICLE_SERVICE_PORT': JSON.stringify(process.env.VEHICLE_SERVICE_PORT ?? 8080),

            'process.env.AUTH_SERVICE_CONTEXT': JSON.stringify(process.env.AUTH_SERVICE_CONTEXT ?? '/car-rental'),
            'process.env.BOOKING_SERVICE_CONTEXT': JSON.stringify(process.env.BOOKING_SERVICE_CONTEXT ?? '/car-rental'),
            'process.env.RATING_SERVICE_CONTEXT': JSON.stringify(process.env.RATING_SERVICE_CONTEXT ?? '/car-rental'),
            'process.env.STORAGE_STUB_SERVICE_CONTEXT': JSON.stringify(process.env.STORAGE_STUB_SERVICE_CONTEXT ?? '/car-rental'),
            'process.env.USER_SERVICE_CONTEXT': JSON.stringify(process.env.USER_SERVICE_CONTEXT ?? '/car-rental'),
            'process.env.VEHICLE_SERVICE_CONTEXT': JSON.stringify(process.env.VEHICLE_SERVICE_CONTEXT ?? '/car-rental'),

            'process.env.FRONTEND_APP_PROTOCOL': JSON.stringify(process.env.FRONTEND_APP_PROTOCOL ?? 'http'),
            'process.env.FRONTEND_APP_HOSTNAME': JSON.stringify(process.env.FRONTEND_APP_HOSTNAME ?? 'localhost'),
            'process.env.FRONTEND_APP_PORT': JSON.stringify(process.env.FRONTEND_APP_PORT ?? 3030),
            'process.env.FRONTEND_APP_CONTEXT': JSON.stringify(process.env.FRONTEND_APP_CONTEXT),
        })
    ],
};
