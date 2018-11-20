'use strict'
const path = require('path')
const eslintFrindlyFormatter = require('eslint-friendly-formatter')

const utils = require('./utils')

const config = require('./config')

module.exports = (mode = 'build') => ({
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js',
    },
    output: {
        crossOriginLoading: config.crossOriginLoading,
        path: config.assetsRoot,
        publicPath: config.assetsPublicPath
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'lodash': '_',
        'vuex': 'Vuex',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': utils.resolve('src'),
        }
    },
    module: {
        rules: [
            ...(config.eslintOpt.useEslint ? [
                {
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    include: [utils.resolve('src')],
                    options: {
                        formatter: eslintFrindlyFormatter,
                        emitWarning: config.eslintOpt.emitWarning
                    }
                }
            ] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: utils.cssLoaders({
                        sourceMap: config[mode].cssSourceMap,
                        extractCSS: config[mode].extractCSS,
                        usePostCSS: config[mode].usePostCSS,
                        usePx2Rem: config[mode].usePx2Rem,
                        px2RemUnit: config.px2RemUnit,
                    }),
                    cssSourceMap: config[mode].cssSourceMap,
                    cacheBusting: config.dev.cacheBusting,
                    transformToRequire: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [utils.resolve('src'), utils.resolve('node_modules/webpack-dev-server/client')]
            },
            ...utils.styleLoaders({
                sourceMap: config[mode].cssSourceMap,
                extractCSS: config[mode].extractCSS,
                usePostCSS: config[mode].usePostCSS,
                usePx2Rem: config[mode].usePx2Rem,
                px2RemUnit: config.px2RemUnit,
            }),
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 10000,
            //         name: utils.assetsPath('img/[name].[hash:7].[ext]')
            //     }
            // },
            // {
            //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 10000,
            //         name: utils.assetsPath('media/[name].[hash:7].[ext]')
            //     }
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 10000,
            //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //     }
            // }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
});
