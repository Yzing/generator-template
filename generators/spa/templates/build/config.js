'use strict'

const path = require('path')
const Env = require('./env')

const StaticPublisPath = Env.isDocker() ? 'https://wpstatic.' + process.argv[3] + '/webpack/generator-spa/' : 'https://wpstatic.mafengwo.net/webpack/generator-spa/';

module.exports = {
    // eslint-loader 相关配置
    eslintOpt: {
        // 打包过程是否需要 eslint-loader
        useEslint: true,
        // 打包过程是否在浏览器中输出 eslint 警告信息信息
        emitWarning: true,
    },

    // 静态资源所在根目录
    assetsRoot: path.resolve(__dirname, '../public'),
    // 静态资源所在子目录
    assetsSubDirectory: '',
    // 静态资源目录或域名
    assetsPublicPath: Env.isDev() ? '/' : StaticPublisPath,

    // px自动转换rem loader转换基数
    px2RemUnit: <%= pxOfPerRem %>,

    // 资源加载方式
    crossOriginLoading: process.env.ENV_TYPE === 'BRANPUB' ? false : 'anonymous',

    // 本地服务相关配置
    dev: {
        proxyTable: {
            '/api': {
                target: 'https://request-tracker.tracker.ab',
                changeOrigin: true,
                secure: false,
                // pathRewrite: {'^/server-api': ''},
            },
        },

        // 本地服务配置
        host: 'localhost', // 会被环境变量 process.env.HOST 覆盖
        port: 8080, // 会被 process.env.PORT 覆盖, 如果端口被占用，会自动使用未被占用的端口
        // 服务启动后，浏览器自动打开
        autoOpenBrowser: true,
        errorOverlay: true,
        // 本地服务器是否输出错误信息
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        extractCSS: false,
        usePostCSS: true,
        usePx2Rem: <% if (isUsePx2rem) { %> true <% } else { %> false <% } %>,

        /**
         * Source Maps
         */
        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // 设置css生成SourceMap
        cssSourceMap: true,

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',
    },

    // 代码打包时相关配置
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../public/html/index.html'),

        extractCSS: true,
        usePostCSS: true,
        usePx2Rem: true,

        /**
         * Source Maps
         */
        // 设置css生成SourceMap
        cssSourceMap: false,

        jsSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // 构建分析工具开关，会分析依赖包大小
        // 命令：npm run report
        bundleAnalyzerReport: process.env.bundleAnalyzerReport === 'true',
    }
}
