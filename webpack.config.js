var webpack = require('webpack'),
	path = require('path');
	
var ExtractTextPlugin = require("extract-text-webpack-plugin");

	module.exports = {
		devtool: 'inline-source-map',
		entry: [
			'webpack-dev-server/client?http://127.0.0.1:8080',
			'webpack/hot/only-dev-server',
			'./src'
		],
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js'
		},
		resolve: {
			extensions: ['.js']
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: [
						'react-hot-loader', 
						'babel-loader?presets[]=react,presets[]=es2015'
					]
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
				},
				{
					test: /\.less$/,
					loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!less-loader"})
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new ExtractTextPlugin("[name].css")
		]
	};