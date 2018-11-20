'use strict'

const merge = require('webpack-merge')
const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const webpack = require('webpack')

// 处理 NODE_ENV 环境变量，获取当前环境配置文件
const Env = require('./env')
// 处理样式相关loader + 处理本地服务报错信息
const utils = require('./utils')
// 打包相关配置项
const config = require('./config')
// 打包基础配置
const baseWebpackConfig = require('./webpack.base.conf')('dev')
// 自定义修改插件，改变外部资源引入的 属性设置
const HtmlWebpackPluginPatch = require('./plugins/HtmlWebpackPluginPatch')

// 读取环境变量中设置的 域名和端口
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        rules: [
        ],
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // 本地服务配置项
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: path.posix.join(config.assetsPublicPath, 'index.html')
            }, ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ?
            {
                warnings: false,
                errors: true
            } :
            false,
        publicPath: config.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        // 注入环境变量
        new webpack.DefinePlugin({
            'process.env': Env.getEnvCfg()
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // 入口模板设置
        // https://github.com/ampedandwired/html-webpack-plugin
        HtmlWebpackPluginPatch(HtmlWebpackPlugin, {
            // 外部引入资源的配置属性
            crossOrigin: 'anonymous',
            // 内部构建生成资源属性
            crossOriginLoading: config.crossOriginLoading,
            externalsJS: {
                head: [
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/flexable@100x/1.0.0/flexable@100x.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/lodash/4.17.11/lodash.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/vue/2.5.17/vue.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/vue-router/3.0.1/vue-router.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/axios/0.18.0/axios.js',
                    'https://wpstatic.mafengwo.net/webpack/sales-static/js/vuex/3.0.1/vuex.js',
                ],
                body: [],
            },
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
        // copy custom static assets
        // new CopyWebpackPlugin([{
        //     from: path.resolve(__dirname, '../static'),
        //     to: config.assetsSubDirectory,
        //     ignore: ['.*']
        // }])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            process.env.PORT = port
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`本地服务器已启动，所在地址: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() :
                    undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})
