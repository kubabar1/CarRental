const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

process.env.NODE_ENV = 'development';

const host = process.env.HOST || 'localhost';

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
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
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     loader: 'source-map-loader'
            // },
            // {
            //     test: /\.css$/,
            //     use: 'css-loader'
            // },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(gif|svg|jp(e)?g|png)$/,
                loader: 'file-loader',
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file-loader',
                // options: {
                //     name: '[name].[ext]',
                //     outputPath: '../icons',
                //     publicPath: '/CarRental/static/icons/',
                // },
            },
        ],
    },
    devServer: {
        contentBase: './',
        // compress: true,
        hot: true,
        host,
        port: 3000,
        publicPath: '/',
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            filename: 'index.html',
        }),
    ],
};
