const path = require("path");

/*
* entry : 시작점
* output : 저장위치 
* */
module.exports = {
    mode: "development",
    entry:{
        main: "./src/app.js"
    },
    output:{
        path: path.resolve("./dist"),
        filename: '[name].js'
    }
}