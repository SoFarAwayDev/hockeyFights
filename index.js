'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var multer  = require('multer')
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

var readFile = require('jsonfile').readFileSync; 

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));
app.use('/dist', express.static(__dirname + '/dist'));

app.disable('x-powered-by');

var env = {
  production: process.env.NODE_ENV === 'production'
};

const manifestPath = path.join(__dirname, 'dist/build-manifest.json');
const manifest = readFile(manifestPath); 

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null,__dirname + '/videos');
    },
    filename: function(req, file, callback){
      callback(null, file.originalname);
    }
  });

  var upload = multer({storage: storage}).single('videoFile');

  app.post('/upload', function(req, res){
    upload(req, res, function(err){
        if(err) {
          return res.end("Error");
        }

        res.end("Uploaded")
    });
  });


app.get('/*', function(req, res, next) {
  if(req.url.startsWith('/videos')){
    return next();
  }

  res.render('index', {
    env: env,
    jsBundle: '/dist/' + manifest['main.js']
  });
});

app.use('/videos', express.static(__dirname + '/videos'));

var port = Number(process.env.PORT || 3001);
app.listen(port, function () {
  console.log('server running at localhost:3001, go refresh and see magic');
});

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:3000');
  });
}
