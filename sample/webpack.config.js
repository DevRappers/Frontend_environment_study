const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*
 * entry : 시작점
 * output : 저장위치
 * */
module.exports = {
  mode: "development",
  entry: {
    main: "./app.js"
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js"
  },
  devServer: {
    overlay: true,
    stats: "errors-only"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 배열 뒤에서 부터 앞에로 옴. css => style
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          // publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
          limit: 20000 // 2kb미만은 url loader로 base64로 하고, 그 이상은 파일을 복사하게끔함.(file loader)
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleDateString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
      `
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("http://dev.api.domain.com")
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : ""
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true
            }
          : false
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : [])
  ]
};
