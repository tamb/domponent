const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
  return [
    // main site
    {
      entry: {
        index: path.resolve(__dirname, "src/index.js")
      },
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /\.pug$/,
            use: "pug-loader"
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "icons/[name].[ext]"
                  // bypassOnDebug: true, // webpack@1.x
                  // disable: true, // webpack@2.x and newer
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: "src/index.pug",
          minify: false
        })
      ],
      resolve:
        argv.mode === "development"
          ? {
              alias: {
                domponent: "domponent/dist/domponent.development.js"
              }
            }
          : {},
      devtool: argv.mode === "development" ? "source-map" : false
    },

    // benchmark domponent
    {
      mode: "production",
      entry: {
        "benchmark/domponent": path.resolve(
          __dirname,
          "src/benchmarks/domponent/"
        )
      },
      output: {
        filename: "[name].bundle.js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"]
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /\.pug$/,
            use: {
              loader: "pug-loader",
              options: {
                pretty: true
              }
            }
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "icons/[name].[ext]"
                  // bypassOnDebug: true, // webpack@1.x
                  // disable: true, // webpack@2.x and newer
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: "src/benchmarks/domponent/domponent.pug",
          filename: "dist/benchmarks/domponent/domponent.html",
          minify: false
        })
      ]
    },

    // benchmark react
    {
      mode: "production",
      entry: {
        "benchmark/react": path.resolve(__dirname, "src/benchmarks/react/")
      },
      output: {
        filename: "[name].bundle.js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-react", "@babel/preset-env"]
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /\.pug$/,
            use: {
              loader: "pug-loader",
              options: {
                pretty: true
              }
            }
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "icons/[name].[ext]"
                  // bypassOnDebug: true, // webpack@1.x
                  // disable: true, // webpack@2.x and newer
                }
              }
            ]
          }
        ]
      }
    },

    // benchmark preact
    {
      mode: "production",
      entry: {
        "benchmark/preact": path.resolve(__dirname, "src/benchmarks/preact/")
      },
      output: {
        filename: "[name].bundle.js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [["@babel/plugin-transform-react-jsx", { pragma: "h" }]]
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /\.pug$/,
            use: "pug-loader"
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "icons/[name].[ext]"
                  // bypassOnDebug: true, // webpack@1.x
                  // disable: true, // webpack@2.x and newer
                }
              }
            ]
          }
        ]
      }
      // resolve: {
      //   alias: {
      //     react: "preact/compat",
      //     "react-dom": "preact/compat"
      //   }
      // }
    },

    // benchmark inferno
    {
      mode: "production",
      entry: {
        "benchmark/inferno": path.resolve(__dirname, "src/benchmarks/inferno/")
      },
      output: {
        filename: "[name].bundle.js"
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: [
                  [
                    "inferno",
                    {
                      imports: true,
                      pragma: "",
                      pragmaCreateComponentVNode: "",
                      pragmaNormalizeProps: "",
                      pragmaTextVNode: ""
                    }
                  ]
                ]
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /\.pug$/,
            use: "pug-loader"
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "icons/[name].[ext]"
                  // bypassOnDebug: true, // webpack@1.x
                  // disable: true, // webpack@2.x and newer
                }
              }
            ]
          }
        ]
      }
    }
  ];
};
