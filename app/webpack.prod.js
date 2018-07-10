const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const common = require('./webpack.common.js');
const createMinifier = require('css-loader-minify-class');

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    camelCase: true,
    ignore: '/node_modules/',
    url: false,
    minimize: true,
    getLocalIdent: createMinifier(),
  },
};

const rules = [{
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: ['css-loader', 'sass-loader'],
  }),
}, {
  test: /\.styl$/,
  use: ExtractTextPlugin.extract({
    use: [cssLoader, 'stylus-loader'],
  }),
}, {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [cssLoader, 'sass-loader'],
  }),
}];

const productionPlugins = [
  new CleanWebpackPlugin(PATHS.dist),
  new ExtractTextPlugin('styles.css'),
  new OptimizeCSSAssetsPlugin({
    cssProcessor: cssnano,
    cssProcessorOptions: {
      discardComments: {
        removeAll: true,
      },
      safe: true,
    },
    canPrint: false,
  }),
];

common.module.rules.push(...rules);
common.plugins.unshift(...productionPlugins);

module.exports = merge(common, {
  mode: 'production', 
  optimization: {
    namedModules: true, // NamedModulesPlugin()
    splitChunks: { // CommonsChunkPlugin()
      name: 'vendor',
      minChunks: 2,
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true, // ModuleConcatenationPlugin
  },
});
