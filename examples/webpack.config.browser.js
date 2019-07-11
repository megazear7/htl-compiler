const path = require("path");

module.exports = {
    entry: "./examples/browser/index.js",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "browser/public"),
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
