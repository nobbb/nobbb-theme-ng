var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./webpack/helpers');

console.log('hi');
module.exports = {
  entry: {
    'polyfills': '../src/polyfills.ts',
    'app': '../src/main.ts'
  },
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    publicPath: path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
