var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


config.entry.app.unshift("webpack-dev-server/client?http://localhost:8001", "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var proxy = {
  "/api/*": {target: "http://sfb.markgao.com", host: "sfb.markgao.com"}
};

if (process.env.NODE_ENV === 'dev') {
  proxy = {
    "/api/*": "http://127.0.0.1:8000"
  }
}

var app = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  proxy: proxy,
  hot: true,
});

app.listen(8001, '0.0.0.0', function(err, result) {
  console.log('http://localhost:8001');
  if (err) {
    console.log(err);
  }
});
