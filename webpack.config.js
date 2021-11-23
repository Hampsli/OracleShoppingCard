const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
mode: 'development',
  entry: './src/app.js',
  devtool: 'inline-source-map',
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
},
  plugins: [new HtmlWebpackPlugin(
    {template: './src/index.html',
    filename: 'index.html',
    inject:'body'}
  )],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  } ,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};