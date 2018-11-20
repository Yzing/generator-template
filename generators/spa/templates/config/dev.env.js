'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const dockerAddress = process.argv[7] || '';

let SERVER_HOST_HEAD = '';
if (dockerAddress) {
    SERVER_HOST_HEAD = 'https://request-tracker.';
}

module.exports = merge(prodEnv, {
    NODE_ENV: '"dev"',
    SERVER_HOST_HEAD: '"' + SERVER_HOST_HEAD + '"',
    SERVER_HOST_TAIL: '"' + dockerAddress + '"',
})
