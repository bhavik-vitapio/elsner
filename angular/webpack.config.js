'use strict';

// Modules
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var I18nPlugin = require("i18n-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';

module.exports = function() {

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = isTest ? {} : {
    app: ['babel-polyfill', './src/app/app.js']
  };

  // Resolve dependencies
  config.resolve = {
    modulesDirectories: ["web_modules", "node_modules", "bower_components"],
    alias: {
      spinjs: 'spin.js'
    }
  },

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = isTest ? {} : {

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: `[name].bundle.js`,

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: `[name].bundle.js`
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isTest) {
    config.devtool = 'inline-source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */


  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: { compact: false }
    },{
      // SCSS LOADER
      // Reference: https://github.com/jtangelder/sass-loader
      // Allow loading scss through js
      test: /\.scss$/,
      loaders: ['style-loader','css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
    }, {     
      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess your css with PostCSS plugins
      test: /\.css$/,
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files in production builds
      // Reference: https://github.com/webpack/style-loader
      loaders: ['style-loader','css-loader?sourceMap','postcss-loader']
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/html-loader
      // Exports HTML as string. HTML is minimized when the compiler demands.
      test: /\.html$/,
      loader: 'html-loader',
      // loader: isTest ? 'null' : extractHTML.extract('html-loader')
      // loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader'
    }]
  };


  // Configure SASS loader to look in styles and bootstrap
  config.sassLoader = {
    includePaths: [
      path.resolve(__dirname, "./src/style"),
      path.resolve(__dirname, "./node_modules"),
      path.resolve(__dirname, "./bower_components"),
      path.resolve(__dirname, "./node_modules/bootstrap/scss")
    ]
  };

  // Configure HTML loader
  config.htmlLoader = {
    minimize: false,
    interpolate: true
  }

  // ISTANBUL LOADER
  // https://github.com/deepsweet/istanbul-instrumenter-loader
  // Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
  // Skips node_modules and files that end with .test
  if (isTest) {
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /bower_components/,
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'istanbul-instrumenter',
      query: {
        esModules: true
      }
    })
  }

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:9000')
      }
    })
  ]

  // Skip rendering index.html in test mode
  if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      })
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal',
    host: '0.0.0.0',
    watchOptions: {
      poll: 1000
    }
  };

  return config;

}();
