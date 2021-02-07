const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry : {
		car_rental_main:'./src/react-app/car_rental_main/index.js',
		car_rental_profile:'./src/react-app/car_rental_profile/index.js'
	},
	output : {
		path : path.join(__dirname, 'dist'),
		filename : '[name].js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module : {
		loaders : [ {
			test : /\.js?$/,
			/** Regular expression to scan for files */
			exclude : /node_modules/,
			loader : 'babel-loader',
			query : {
				presets : [ "react", "es2015", "stage-2" ]
			},
		}, {
			test : /\.css$/,
			loader : 'style-loader!css-loader'
		}, {
			test : /\.(gif|svg|jpg|png)$/,
			loader : "file-loader",
			options : {
				name : '[name].[ext]',
				outputPath : '../img',
				publicPath : '/CarRental/static/img/'
			}
		}, {
			test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
			loader : "file-loader",
			options : {
				name : '[name].[ext]',
				outputPath : '../icons',
				publicPath : '/CarRental/static/icons/'
			}
		} ]
	}
};