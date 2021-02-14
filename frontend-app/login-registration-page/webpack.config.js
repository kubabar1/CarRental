const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

process.env.NODE_ENV = 'development';

const host = process.env.HOST || 'localhost';

const dist = path.join(__dirname, 'dist');

const eslintOptions = {
    extensions: ['ts', 'tsx', 'js', 'json'],
    exclude: 'node_modules',
    failOnError: false,
    failOnWarning: false,
    fix: false,
};

const stylelintOptions = {
    emitError: true,
    emitWarning: true,
    failOnError: false,
    failOnWarning: false,
    fix: false,
};

module.exports = {
    entry: {
        login: './src/login/login.tsx',
        registration: './src/registration/registration.tsx',
    },
    output: {
        path: dist,
        filename: '[name]/[name].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
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
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(gif|svg|jpe?g|png)$/,
                loader: 'file-loader',
                options: {
                    esModule: false,
                    outputPath: (url, resourcePath, context) => {
                        if (/src\/login/.test(resourcePath)) {
                            return `login/images/${url}`;
                        }

                        if (/src\/registration/.test(context)) {
                            return `registration/images/${url}`;
                        }

                        return `images/${url}`;
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/login.html'),
            chunks: ['login'],
            favicon: './src/images/car_rental_page_logo.png',
            path: dist,
            filename: 'login/login.html',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/registration.html'),
            chunks: ['registration'],
            favicon: './src/images/car_rental_page_logo.png',
            path: dist,
            filename: 'registration/registration.html',
        }),
        new ESLintPlugin(eslintOptions),
        new StylelintPlugin(stylelintOptions),
    ],
    devServer: {
        proxy: {
            '/*': {
                target: 'http://localhost:3000',
                bypass: (req) => {
                    if (req.url.indexOf('/registration') !== -1) {
                        return '/registration/registration.html';
                    } else if (req.url.indexOf('/login') !== -1) {
                        return '/login/login.html';
                    }
                },
            },
        },
        contentBase: dist,
        hot: true,
        host,
        port: 3000,
        publicPath: '/',
        historyApiFallback: true,
        open: true,
        openPage: 'login',
    },
};
