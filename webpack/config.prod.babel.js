const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlFileNames = fs.readdirSync('./src/html/');

const getEntries = () => {
    const entries = [
        './src/js/app.js',
        './src/scss/app.scss'
    ];

    htmlFileNames.forEach((filename) => {
        entries.push(`./src/html/${filename}`);
    });

    return entries;
};

const getPlugins = () => {
    const plugins = [
        new CleanWebpackPlugin('dist', {
            root: `${__dirname}/../`
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CopyWebpackPlugin([
            {
                from: `${__dirname}/../src/assets/`,
                to: `${__dirname}/../dist/assets/`
            }
        ]),
        new ExtractTextPlugin({
            filename: './assets/css/styles.css',
            allChunks: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ];
    htmlFileNames.forEach((filename) => {
        if (filename.substr(0, 1) !== '_') {
            const splitted = filename.split('.');
            if (splitted[1] === 'html') {
                plugins.push(
                    new HtmlWebpackPlugin({
                        template: `./src/html/${filename}`,
                        filename: `./${filename}`
                    }),
                );
            }
        }
    });

    return plugins;
};

module.exports = {
    entry: getEntries(),
    output: {
        filename: './assets/js/bundle.js',
    },
    plugins: getPlugins(),
    module: {
        rules: [
            {
                test: /\.(html)$/,
                loader: path.resolve(__dirname, 'loader/html-loader.js'),
                options: {
                    html: htmlFileNames
                }
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jpg', '.html', '.scss'],
    }
};
