var prefPath = "./js/";
var webpack = require("webpack");

module.exports = {
    entry: [
        prefPath + "index.js"
    ],
    output: {
        path : prefPath,
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
                test: /\.less$/, loader: "style!css!less"
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    }
};