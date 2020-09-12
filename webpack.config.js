const path = require("path");
const Dotenv = require("dotenv-webpack");
const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// webpack plugin that generates a 'manifest.json' for our Progressive Web Application
const WebpackPwaManifest = require('webpack-pwa-manifest')

const workboxPlugin = require('workbox-webpack-plugin');
module.exports = {
  node: {
    fs: "empty"
  },
  output: {
    filename: process.env.NODE_ENV === "production" ? '[name].[contenthash].js' : '[name].js',
    path: path.join(__dirname, "public/")
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
              reloadAll: true
            }
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === "production" ? '[name].[contenthash].css' : '[name].css'
    }),
    new HtmlWebPackPlugin({
      title: 'Caching',
      template: "./src/index.html",
      filename: "./index.html",
      favicon: 'src/assets/images/icons/favicon-16x16.png'
    }),
    new workboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
    }),
    new WebpackPwaManifest({
      name: 'Weather',
      short_name: 'Weather',
      description: 'Smash It - Weather App!',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('src/assets/images/icons/weather-icon.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join('icons', 'ios'),
          ios: true
        },
        {
          src: path.resolve('src/assets/images/icons/weather-icon.png'),
          size: 1024,
          destination: path.join('icons', 'ios'),
          ios: 'startup'
        },
        {
          src: path.resolve('src/assets/images/icons/weather-icon.png'),
          sizes: [36, 48, 72, 96, 144, 180, 192, 256, 384, 512],
          destination: path.join('icons', 'android')
        },
        {
          src: path.resolve('src/assets/images/icons/weather-icon.png'),
          size: '196x196',
          purpose: 'maskable'
        }
      ]
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin()]
  }
};
