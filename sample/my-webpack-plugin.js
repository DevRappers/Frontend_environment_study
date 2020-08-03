class MyWebpackPlugin {
  apply(compiler) {
    compiler.plugin("emit", (compilation, callback) => {
      const source = compilation.assets["main.js"].source();

      compilation.assets["main.js"].source = () => {
        const banner = ["/*빌드 결과물*/"].join("\n");

        return banner + "\n\n" + source;
      };

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
