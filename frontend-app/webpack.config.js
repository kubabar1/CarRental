const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

process.env.NODE_ENV = 'development';

const host = process.env.HOST || 'localhost';

const eslintOptions = {
	extensions: ['ts', 'tsx', 'js', 'json'],
	exclude: 'node_modules',
	failOnError: true,
	failOnWarning: true,
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
	output: {
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
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(gif|svg|jpe?g|png)$/,
				loader: 'file-loader',
				options: {
					esModule: false,
					outputPath: 'images'
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
				loader: 'file-loader',
				options: {
					outputPath: 'fonts'
				},
			},
		],
	},
	plugins: [
		new ESLintPlugin(eslintOptions),
		new StylelintPlugin(stylelintOptions),
	],
	devServer: {
		hot: true,
		host,
		port: 3000,
		publicPath: '/',
		historyApiFallback: true,
		open: true,
	},
};
