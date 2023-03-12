const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
});

const mode = process.env.NODE_ENV || 'development';
const host = process.env.HOST || '0.0.0.0';

module.exports = {
  mode: mode,
  entry: './src/index.js',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|pdf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    host,
    proxy: {
      '/api/**': {
        target: `http://${host}:${process.env.PORT || 9000}`,
        secure: false,
      },
    },
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  plugins: [htmlPlugin, new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ro/)],
};
