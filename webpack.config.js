const path = require("path");

module.exports = {
    entry: "./src/compiler.js",
    output: {
        filename: "compiler-umd.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};
