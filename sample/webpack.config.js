const path = require("path");
const MyWebPackPlugin = require("./my-webpack-plugin");

/*
 * entry : 시작점
 * output : 저장위치
 * */
module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js"
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 배열 뒤에서 부터 앞에로 옴. css => style
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
          limit: 20000 // 2kb미만은 url loader로 base64로 하고, 그 이상은 파일을 복사하게끔함.(file loader)
        }
      }
    ]
  },
  plugins: [new MyWebPackPlugin()]
};
