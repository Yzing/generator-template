'use strict'
const path = require('path')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
    return path.posix.join(config.assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
            // autoprefixer:true,
            // importLoaders: 2,      //解决 @import外部css
            // minimize: true,        //压缩 css，解决插件压缩属性丢失问题 by JD 2018.06.24
        }
    }

    /* no */ // 使用此注释，不会转换
    const px2remLoader = {
        loader:'px2rem-loader',
        options:{
            remUnit: options.px2RemUnit || 100
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
            // autoprefixer:true,
            // minimize: true,        //压缩 css，解决插件压缩属性丢失问题 by JD 2018.06.24
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [cssLoader]

        // 设置 px 自动转换 rem
        if (options.usePx2Rem) {
            loaders.push(px2remLoader)
        }
        // 设置是否使用postcss
        if (options.usePostCSS) {
            loaders.push(postcssLoader)
        }

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // 设置抽取css
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        // less: generateLoaders('less'),
        // sass: generateLoaders('sass', {
        //     indentedSyntax: true
        // }),
        scss: generateLoaders('sass'),
        // stylus: generateLoaders('stylus'),
        // styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            // icon: path.join(__dirname, 'logo.png')
        })
    }
}

exports.resolve = (dir) => {
    return path.join(__dirname, '..', dir)
}