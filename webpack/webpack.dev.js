const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rupture = require('rupture');

let extractStylus = new ExtractTextPlugin({
    filename:path.join('bundle','[name].css')
});

module.exports = {
    devtool:'cheap-eval-source-map',
    devServer:{
        openPage:'',
    },
    module:{
        rules:[
            {
                test:/\.styl$/,
                exclude:path.resolve('assets','styles'),
                use:extractStylus.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader: 'css-loader',
                        options: {
                            sourceMap:true,
                            modules: true,
                            importModules:2,
                            //https://github.com/webpack/loader-utils#interpolatename
                            localIdentName: '[path][name]-[local]-[hash:base64:3]'
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap: true
                        }
                    },
                    {
                        loader:'stylus-loader',
                        options:{
                            use:[rupture()]
                        }
                    }]
                })
            },
            {
                test:/\.styl$/,
                include:path.resolve('assets','styles'),
                use:extractStylus.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader: 'css-loader',
                        options: {
                            sourceMap:true,
                            importModules:2
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap: true
                        }
                    },
                    {
                        loader:'stylus-loader',
                        options:{
                            use:[rupture()]
                        }
                    }]
                })
            }
        ]
    },
    plugins:[
        extractStylus
    ]
};