'use strict'
require('./check-versions')()

require('./env')

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('./config')
const webpackConfig = require('./webpack.prod.conf')

console.log(chalk.green('开始构建，环境为：NODE_ENV=' + process.env.NODE_ENV + '，ENV_TYPE=' + process.env.ENV_TYPE + '，参数为：' + process.argv[3]))
const spinner = ora('构建中...')
spinner.start()

rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  构建失败.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  构建成功.\n'))
        console.log(chalk.yellow(
            '  提示：构建内容是用于发布到服务器上的.\n' +
            '  在本地打开html文件访问是不可用的\n'
        ))
    })
})
