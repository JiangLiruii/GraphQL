const path = require('path');
const ExactTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: [
      'babel-polyfill',
      './client/index.jsx',
    ],
  },
  output: {
    path: path.join(__dirname, 'build', 'public'),
    filename: '[name].js',
  },
  target: 'web',
  module: {
    loaders: [{
      loader: 'babel-loader',
      include: [path.resolve(__dirname, 'client')],
      exclude: 'node_modules',
      test: /\.(jsx|js)$/,
      query: {
        preset: ['react', 'es2015', 'stage-0'],
      },
    }, {
      loader: ExactTextPlugin.extract('style', 'css?modules&localIdentName=[local]__[hash:base64:5]'),
      test: /\.css$/,
      exclude: 'node_modules',
    }],
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      './client',
    ],
  },
  plugin: [new ExactTextPlugin('style.css')],
};
