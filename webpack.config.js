const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const combineLoaders = require("webpack-combine-loaders");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            query: {
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          }
        ])
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    stats: "errors-only",
    contentBase: "./dist",
    historyApiFallback: {
      disableDotRule: true
    },
    port: 3000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            unused: false,
            dead_code: false,
            join_vars: true,
            drop_console: true,
            comparisons: true,
            loops: true,
            drop_debugger: true
          },
          warnings: true,
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
