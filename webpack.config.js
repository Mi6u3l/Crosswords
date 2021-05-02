const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"] 
  },
  module: {
    rules: [
      { test: /\.(js|ts|tsx)$/, use: 'babel-loader' },
      { test: /\.s[ac]ss$/i, use: [ 'style-loader', 'css-loader', 'sass-loader']}
    ]
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
}