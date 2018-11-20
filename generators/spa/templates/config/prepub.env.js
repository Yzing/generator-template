'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"prepub"',
    SERVER_HOST_HEAD: '"https://request-tracker."',
    SERVER_HOST_TAIL: '"mafengwo.cn"',
})
