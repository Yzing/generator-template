'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const dockerAddress = process.argv[3] || '';
module.exports = merge(prodEnv, {
    NODE_ENV: '"docker"',
    SERVER_HOST_HEAD: '"https://request-tracker."',
    SERVER_HOST_TAIL: '"' + dockerAddress + '"',
})
