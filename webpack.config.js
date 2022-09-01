const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'build')
    },
    devtool: argv.mode === 'development' ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: {
      static: [
        {
          directory: path.join(__dirname)
        },
      ],
      port: 3000
    },
    module: {
      rules: [
        {
          test: /\.(png|svg)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 3 * 1024,
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html')
      })
    ]
  }
};
