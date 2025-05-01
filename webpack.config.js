const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { argv } = require("process");

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === "development";

    return {
        entry: './src/script.js',
        output: {
          filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
          path: path.resolve(__dirname, 'dist')
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader"
              }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader",
                     {loader: "css-loader",
                     options: {
                        sourceMap: true,
                     }},]
              }
          ],
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: "./src/index.html"
          })
        ],

        devtool: 'source-map',

        optimization: {
            splitChunks: {
              chunks: 'all',
            },
          }
      }
      
};