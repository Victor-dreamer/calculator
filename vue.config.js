module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/style/common.scss";`
      }
    }
  }
}
