const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry:{
        app:path.resolve('app','index.js')
    },
    output:{
        filename:path.join('bundle','[name].js'),
        publicPath:'/'
    },
    resolve:{
        alias:{
            root:path.resolve(),
            bundle:path.resolve('bundle'),
            app:path.resolve('app'),
            components:path.resolve('app','components'),
            styles:path.resolve('assets','styles'),
            fonts:path.resolve('assets','fonts')
        }
    },
    module:{
        rules:[
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'eslint-loader',
                include: [
                    path.resolve('app')
                ]
            },
            {
                test:/\.js$/,
                include:path.resolve('app'),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            'env',//https://babeljs.io/docs/plugins/preset-env/
                            'react',
                            'stage-3'//https://babeljs.io/docs/plugins/preset-stage-3/
                        ],
                        plugins:[
                            'transform-decorators-legacy'
                        ],
                        cacheDirectory:true
                    }
                }
            }
        ]
    },
    devServer:{
        port:3000,
        open:true,
        historyApiFallback: true
    },
    plugins:[
        new CleanWebpackPlugin(
            [
                'bundle',
                'index.html'
            ],
            {
                root:     path.resolve(),
                verbose:  true
            }
        ),
        new HtmlWebpackPlugin({
            inject:false,
            template: path.resolve('templates','index.html.ejs'),
            filename:'index.html'
        })
    ]
};