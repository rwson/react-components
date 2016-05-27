var path = __dirname;
var webpack = require("webpack");

module.exports = {
    entry: [
        path + "index.js"
    ],
    output: {
        path: path,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/, loader: "jsx!babel"
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    }
};