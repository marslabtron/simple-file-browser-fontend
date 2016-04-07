var webpack = require("webpack");

var publicPath = "/dist/";

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: __dirname + publicPath,
    publicPath: publicPath,
    filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      }
    ]
  },

  plugins: [
  ],

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
};
