const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main/resources/templates/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                }
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(gif|ttf|eot|svg|woff2?)$/,
                use: 'url-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/main/resources/templates/index.html',
        filename: 'index.html',
        inject: 'body'
    })],
    devServer: {
        inline: true,
        contentBase: './src',
        historyApiFallback: true
    }
};