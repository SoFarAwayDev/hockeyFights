'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.base.js'); 
var ManifestPlugin = require('webpack-manifest-plugin');

var SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.output = {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    publicPath: '/dist/'
}; 

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new ManifestPlugin({
         fileName: 'build-manifest.json'
    }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
]);

config.module.loaders = config.module.loaders.concat([
  {test: /\.jsx?$/, loaders: [ 'babel-loader'], exclude: /node_modules/}
]);

module.exports = config;
