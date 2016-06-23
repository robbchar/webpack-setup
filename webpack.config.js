"use strict;"
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge');
const path = require('path');
const validate = require('webpack-validator');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

// webpack config
const devserverConfig = require('./webpack.config.devserver.js');
const minifyConfig = require('./webpack.config.minify.js');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const config = {
  entry: {
    vendor: PATHS.src + '/js/vendor.js',
    entry: PATHS.src + '/js/entry.js'
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)?$/,
        loaders: ['eslint'],
        include: PATHS.src
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }, {
        test: /\.png$/,
        loader: 'file-loader?name=/images/[name].[ext]' 
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }, { 
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  },
  postcss: function () {
      return [precss, autoprefixer];
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'main.html',
      favicon: PATHS.src + '/favicon.ico',
      template: PATHS.src + '/main.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'second.html',
      favicon: PATHS.src + '/favicon.ico',
      template: PATHS.src + '/second.html'
    }),
    new ExtractTextPlugin('css/styles.css')
  ]
};

switch(process.env.npm_lifecycle_event) {
  case 'dev':
    config = merge(
      config,
      {
        devtool: 'source-map'
      },
      devserverConfig({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
    break;
  case 'build':
    config = merge(
      config,
      minifyConfig()
    );
    break;
}

module.exports = validate(config);