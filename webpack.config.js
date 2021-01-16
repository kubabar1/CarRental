var path = require("path");
var webpack = require("webpack");

const PATHS = {
	build : path.join(__dirname, 'src', 'main', 'webapp', 'static', 'js')
};
module.exports = {
	entry : {
		car_rental_main:'./src/main/webapp/react-app/car_rental_main/index.js',
		car_rental_profile:'./src/main/webapp/react-app/car_rental_profile/index.js'
	},
	output : {
		path : PATHS.build,
		filename : '[name].js'
	},
	resolve : {
		modules : [ path.join(__dirname, "js/helpers"), "node_modules" ]
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