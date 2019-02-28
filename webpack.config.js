const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry:  {
    main: './src/main.js',
    admin: './src/admin/main.js'
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.pcss$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "[hash].[ext]"
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              extract: true,
              spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
            }
          },
          "svg-transform-loader",
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                {
                  removeAttrs: {
                    attrs: "(fill|stroke)"
                  }
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ["pug-plain-loader"]
          },
          {
            use: ["pug-loader"]
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      images: path.resolve(__dirname, "src/images")
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    overlay: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.pug",
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: "src/admin/index.pug",
      filename: "admin/index.html",
      chunks: ['admin']
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    new VueLoaderPlugin()
  ],
  devtool: "#eval-source-map"
};

// if (process.env.NODE_ENV === "production") {
//   module.exports.devtool = "#source-map";
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       "process.env": {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ]);
// }
