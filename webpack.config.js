const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DESTINATION = path.resolve(__dirname, 'dist')

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: DESTINATION
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['./src', 'node_modules']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
      },
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  }
}
