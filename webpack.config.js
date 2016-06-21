var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: {
    vendor: './src/js/vendor.js',
    main: './src/js/entry.js'
  },
  output: {
    path: __dirname + "/dist/",
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.png$/,
      //loader: 'file-loader'
      loader: 'file-loader?name=/images/[name].[ext]' 
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: 'src/favicon.ico',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('css/styles.css')
  ]
};