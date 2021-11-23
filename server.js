/* https://expressjs.com/en/starter/static-files.html*/ 
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);


app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(express.static('src/utils'))


app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
