const dotenv = require('dotenv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
dotenv.config();

const DEV = process.env.DEV === 'true';
const DEBUG = process.env.DEBUG === 'true';

process.env.BABEL_ENV = DEV ? 'development' : 'production';
process.env.NODE_ENV = DEV ? 'development' : 'production';

const useStyleSourceMap =
  process.env.CARBON_REACT_STORYBOOK_USE_STYLE_SOURCEMAP === 'true';

const useRtl = process.env.CARBON_REACT_STORYBOOK_USE_RTL === 'true';

module.exports = {
  mode: DEV ? 'development' : 'production',
  devtool: DEV ? 'source-map' : false,

  entry: ['./src/config.js', './src/index.tsx'],
  output: {
    path: path.join(__dirname, 'build'), // the bundle output path
    filename: 'js/bundle.js', // the name of the bundle
    publicPath: 'auto',
  },
  devServer: {
    port: 3000, // you can change the port
    // static: path.join(__dirname, 'public'),
  },
  // proxy: {
  //   '/api': 'http://localhost:3000',
  //   changeOrigin: true,
  // },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Only perform type checking
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
              esModule: false,
            },
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                $feature-flags: (
                  ui-shell: true,
                );
              `,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name][hash][ext][query]',
        },
      },
      {
        test: /\.(aac|wav|mp3|mp4|mkv)$/i,
        type: 'asset',
        generator: {
          filename: 'media/[name][hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name][hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      // components: path.resolve(__dirname, 'src/components'),
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      'react/jsx-runtime.js': 'react/jsx-runtime',
    },
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html', // to import index.html file inside index.js
      // favicon:"./src/assets/img/logo.ico",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles/[name].[contenthash].css' }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: './' }],
    }),
  ],
};
