'use strict';

var webpack = require('webpack');
var config = require('./webpack.config.base.js');

var SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.profile = false;
config.devtool = '#source-map';

config.output = {
  path: './client/dist',
  publicPath: '/client/dist/',
  filename: 'bundle.[hash].min.js'
};

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json'
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
