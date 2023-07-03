// eslint-disable-next-line @typescript-eslint/no-var-requires
const ESLintPlugin = require('eslint-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StylelintPlugin = require('stylelint-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

process.env.NODE_ENV = 'development';

const host = process.env.HOST || 'localhost';

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
    plugins: [new ESLintPlugin(eslintOptions), new StylelintPlugin(stylelintOptions)],
    devServer: {
        hot: true,
        host,
        port: 3000,
        publicPath: '/',
        historyApiFallback: true,
        open: true,
    },
};
