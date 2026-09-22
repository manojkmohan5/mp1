const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: { directory: path.resolve(__dirname, 'build') },
    open: true,
    host: "localhost",
    watchFiles: 'index.html',
  },
  context: path.join(__dirname, 'src'),
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        // Extracted to a real stylesheet rather than injected by JS at
        // runtime: a <link> in the head is render-blocking, so the page
        // never paints unstyled and nothing shifts when the CSS lands.
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif|webp|mp4|webm)$/i,
        type: "asset",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "styles.css" }),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: 'body',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build"),
  },
};
