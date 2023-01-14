'use-strict';

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  entry: ['regenerator-runtime/runtime', path.resolve(__dirname, 'src/index.tsx')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    alias: {
      client: path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              require.resolve('@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: '3.0',
                targets: '>0.2% , not dead ,not op_mini all',
              }),
              require.resolve('@babel/preset-typescript'),
              require.resolve('@babel/preset-react'),
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    port: 4000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
    new WebpackManifestPlugin({
      writeToFileEmit: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};
