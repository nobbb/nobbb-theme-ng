var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./webpack/helpers');
const { AotPlugin } = require('@ngtools/webpack');

module.exports = {
  entry: helpers.root('src', 'ssr.ts'),
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'ssr.js',
    path: helpers.root('dist'),
    publicPath: '/static'
  },
  target: 'node',
  plugins: [
    new webpack.ContextReplaacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'),
      {}
    ),
    new AotPlugin({
      tsConfigPath: helpers.root('src', 'tsconfig.server.json'),
      skipCodeGeneration: false
    })
  ],
  module: {
    rules: [
      { test: /\.ts$/, loader: '@ngtools/webpack' },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  }
};
