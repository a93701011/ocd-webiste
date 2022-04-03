const path = require("path")

module.exports = {

  mode: "development",
  entry: "./public/js/export.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "export.bundle.js",
    clean: true
  }
}