const path = require('path');

module.exports = {
mode: 'development',
  entry: './src/app.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: __dirname + '/dist'
  } 
};