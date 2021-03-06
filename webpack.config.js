const path = require("path");

module.exports = [
  {
    entry: "./src/compiler.js",
    output: {
        filename: "compiler-amd.js",
        library: "Compiler",
        libraryExport: 'default',
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "amd"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                "useBuiltIns": false,
                            }]
                        ],
                        plugins: [
                          "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            }
        ]
    }
  },
  {
    entry: "./src/compiler.js",
    output: {
        filename: "compiler-umd.js",
        library: "Compiler",
        libraryExport: 'default',
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                "useBuiltIns": false,
                            }]
                        ],
                        plugins: [
                          "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            }
        ]
    }
  }
];
