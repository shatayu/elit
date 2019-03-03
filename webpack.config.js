module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        main: '/home/shatayu/Desktop/elit/src/index.js'
    },

    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};