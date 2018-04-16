const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const cssUtils = require('./css-utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
	baseWebpackConfig.entry[name] = ['./build/hot-reload.js', baseWebpackConfig.entry[name]]
})

const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: cssUtils.styleRules({ sourceMap: config.dev.cssSourceMap, postcss: true })
	},
	devtool: config.dev.devtool,
	devServer: {
		historyApiFallback: true,
		noInfo: true
	}
})
