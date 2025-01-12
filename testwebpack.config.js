const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "admin/assets/js"),
    filename: "admin-script.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"], // Use svgr to import SVGs as React components
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "development",
};
