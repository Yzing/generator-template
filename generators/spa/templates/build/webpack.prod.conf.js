'use strict'

const Env = require('./env')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')('build')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginPatch = require('./plugins/HtmlWebpackPluginPatch')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    module: {
        rules: [
        ]
    },
    devtool: config.build.jsSourceMap ? config.build.devtool : false,
    
    plugins: [
        // 注入环境变量
        new webpack.DefinePlugin({
            'process.env': Env.getEnvCfg()
        }),
        // 混淆压缩代码
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.jsSourceMap,
            parallel: true
        }),
        // 抽取css文件到单独的文件中
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css',
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true,
        }),
        // 优化抽取出来的css
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.cssSourceMap ?
                {
                    safe: true,
                    map: {
                        inline: false
                    }
                } :
                {
                    safe: true
                }
        }),
        // 入口模板设置
        // see https://github.com/ampedandwired/html-webpack-plugin
        HtmlWebpackPluginPatch(HtmlWebpackPlugin, {
            // 外部引入资源的配置属性
            crossOrigin: 'anonymous',
            // 内部构建生成资源属性
            crossOriginLoading: config.crossOriginLoading,
            externalsJS: {
                head: [
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/flexable@100x/1.0.0/flexable@100x.min.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/lodash/4.17.11/lodash.min.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/vue/2.5.17/vue.min.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/vue-router/3.0.1/vue-router.min.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/axios/0.18.0/axios.min.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/vuex/3.0.1/vuex.min.js',
                ],
                body: [],
            },
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // 更多配置说明 https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks(module) {
        //         // any required modules inside node_modules are extracted to vendor
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     }
        // }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks: Infinity
        // }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'app',
        //     async: 'vendor-async',
        //     children: true,
        //     minChunks: 3
        // }),

        // copy custom static assets
        // new CopyWebpackPlugin([{
        //     from: path.resolve(__dirname, '../static'),
        //     to: config.assetsSubDirectory,
        //     ignore: ['.*']
        // }])
    ]
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
