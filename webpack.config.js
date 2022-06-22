const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
};
