const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
};

module.exports = {
  entry: {
    src: PATHS.src,
  },
  resolve: {
    alias: {
      // react: 'preact-compat',
      // 'react-dom': 'preact-compat',
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
      Config: path.resolve(__dirname, 'src/config/'),
      Actions: path.resolve(__dirname, 'src/redux/actions/'),
      Reducers: path.resolve(__dirname, 'src/redux/reducers/'),
      Store: path.resolve(__dirname, 'src/redux/store.js'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Interfaces: path.resolve(__dirname, 'src/interfaces.js'),
    },
    extensions: ['.jsx', '.js'],
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: '[name][hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre',
      },
      {
        test: /\.(jpe?g|png)$/i,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[hash].[ext]',
            },
          },
          // 'webp-loader', // Still not supported by all browsers
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=1000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=1000&mimetype=application/font-woff',
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          noquotes: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'AireApp',
      appMountId: 'app',
      baseHref: '/',
      mobile: true,
      links: [
        'https://fonts.googleapis.com/css?family=Roboto+Condensed:300',
        'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
        {
          href: 'manifest',
          rel: '/manifest.json',
        },
        {
          href: 'https://necolas.github.io/normalize.css/7.0.0/normalize.css',
          rel: 'stylesheet',
        },
      ],
      meta: [
        {
          name: 'description',
          content: 'Add Description.',
        },
        {
          name: 'keywords',
          content: 'Add keywords here.',
        },
        {
          name: 'theme-color',
          content: '#c50c3f',
        },
      ],
    }),
  ],
};
