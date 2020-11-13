const path = require('path');
 
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    name: 'memory-master',
    mode: 'development', //real time: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {"client.jsx": "./src/js/client.jsx"
    }, //input
    devtool: "source-map",
    plugins: [
		new CleanWebpackPlugin({dry: false, cleanOnceBeforeBuildPatterns: ["js/*"], cleanAfterEveryBuildPatterns: ["js/*"]}),
		// new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "../index.html"
		})
	],
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', {
                    targets: {
                        browsers:['> 5% in KR'],
                    },
                    debug: true,
                }], '@babel/preset-react',
            ],
                plugins: ['@babel/plugin-proposal-class-properties',
                          'react-hot-loader/babel',
        ],
            },
        },
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
        }
    ],
    },
    plugins: [
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    }, //output
    
};