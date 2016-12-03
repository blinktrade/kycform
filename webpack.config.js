const path = require('path');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const entries = ['./app/index.js'];
const plugins = [new webpack.optimize.OccurrenceOrderPlugin()];
const query = isDev ? { presets: ['react-hmre'] } : {};

if (isDev) {
  entries.push('webpack-hot-middleware/client');
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  devtool: 'eval',
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins,
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        query,
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
