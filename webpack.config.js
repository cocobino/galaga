var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: [
    './src/ts/index.ts',
    './src/scss/index.scss',
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        // { test: /\.js$/, loader: "source-map-loader" }
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use : [
            'file-loader'
          ]
        }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss', '.css', '.jpg', '.gif', '.png'],
  },
  devServer: {
    port: 9000,
    publicPath: '/dist',
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'bundle.css'}),
  ],
};