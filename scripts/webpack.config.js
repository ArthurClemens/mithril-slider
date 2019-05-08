/* global process */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseDir = process.cwd();
const env = process.env;
const whichCyano = env.CYANO;

module.exports = {

  context: path.resolve(baseDir, "./src"),

  entry: {
    index: path.resolve(baseDir, env.ENTRY || "./src/index.js"),
  },

  output: {
    path: path.resolve(baseDir, "./dist"),
    filename: "js/[name].js"
  },

  resolve: {
    // Make sure that Mithril is included only once
    alias: {
      "mithril/stream": path.resolve(baseDir, "node_modules/mithril/stream/stream.js"),
      // Keep in this order!
      "mithril": path.resolve(baseDir, "node_modules/mithril/mithril.js"),
      "react": path.resolve(baseDir, "node_modules/react"),
      "react-dom": path.resolve(baseDir, "node_modules/react-dom"),
      // Resolve "cyano" to the proper lib
      "cyano": path.resolve(baseDir, `node_modules/${whichCyano}`),
    },
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: [{
          loader: "babel-loader",
          options: {
            configFile: "../../babel.config.js"
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: "[local]"
            }
          },
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/app.css"
    }),
  ],

  devtool: "source-map"

};
