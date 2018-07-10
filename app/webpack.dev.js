const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    camelCase: true,
    ignore: '/node_modules/',
    url: false,
  },
};

const config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    quiet: true,
    host: process.env.HOST || '0.0.0.0', // Defaults to `localhost`
    port: process.env.APP_DEV_PORT || 8080, // Defaults to 8080
  },
});

config.module.rules.push(
  ...[
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.styl$/,
      use: ['style-loader', cssLoader, 'stylus-loader'],
    },
    {
      test: /\.scss$/,
      use: ['style-loader', cssLoader, 'sass-loader'],
    },
  ],
);

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = config;
