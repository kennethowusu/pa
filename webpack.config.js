const path = require('path');

module.exports = {
  entry: './views/summary/index.ejs',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
         path.resolve(__dirname, "fff")
       ],
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};
