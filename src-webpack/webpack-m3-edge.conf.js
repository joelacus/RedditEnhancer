const path = require('path');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	mode: 'production',
	//devtool: 'source-map',
	entry: {
		background: './src/common/background.js',
		content: './src/common/content-index.js',
		content_first: './src/common/content-first-index.js',
		'popup/popup': './src/common/popup/popup-index.js',
		restore_config: './src/common/restore_config.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist/edge'),
		filename: '[name].js',
		clean: true,
	},
	module: {
		rules: [
			{ test: /\.html$/i, type: 'asset/resource' },
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(?:png)$/i,
				type: 'asset/resource',
				generator: {
					filename: './icons/[hash][ext][query]',
				},
			},
			{
				test: /\.(?:svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: './icons/ui/[name][ext][query]',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new CopyPlugin({
			patterns: [
				{
					context: path.resolve(__dirname, 'src/common/_locales'),
					from: '**/*.json',
					to: '_locales',
				},
				{
					context: path.resolve(__dirname, 'src/common/icons'),
					from: 'icon-*.png',
					to: 'icons',
				},
				{
					context: path.resolve(__dirname, 'src/common/popup'),
					from: '*.html',
					to: 'popup',
				},
				{
					context: path.resolve(__dirname, 'src/manifest_v3'),
					from: 'manifest.json',
					to: 'manifest.json',
				},
				{
					context: path.resolve(__dirname, 'src/common/videojs'),
					from: 'video.js',
					to: 'videojs/video.min.js',
				},
				{
					context: path.resolve(__dirname, 'src/common/videojs'),
					from: 'vtt.js',
					to: 'videojs',
				},
				{
					context: 'node_modules/video.js/dist/',
					from: 'video-js.css',
					to: 'videojs',
				},
				{
					context: path.resolve(__dirname, 'src/common'),
					from: 'restore_config.html',
					to: 'restore_config.html',
				},
				{
					context: path.resolve(__dirname, 'src/common'),
					from: 'restore_config.css',
					to: 'restore_config.css',
				},
				{
					context: path.resolve(__dirname, '.'),
					from: 'changelog.txt',
					to: 'changelog.txt',
				},
			],
		}),
		new webpack.DefinePlugin({
			BROWSER_API: 'chrome',
		}),
		new webpack.DefinePlugin({
			CHECK_LEGACY_FIREFOX: false,
		}),
		new webpack.DefinePlugin({
			CHECK_LEGACY_EDGE: true,
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new HtmlMinimizerPlugin(), new CssMinimizerPlugin(), new TerserPlugin()],
	},
	performance: {
		hints: false,
	},
};
