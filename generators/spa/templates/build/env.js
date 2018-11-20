'use strict'

const prodEnv = 'prod';
const prepubEnv = 'prepub';
const dockerEnv = 'docker';
const devEnv = 'dev';

const NODE_ENV = process.env.NODE_ENV || prodEnv; // 默认没有则为线上环境
process.env.NODE_ENV = NODE_ENV;

console.log('命令执行环境变量:', NODE_ENV);

exports.isProd = () => {
    return NODE_ENV === prodEnv;
}

exports.isPrepub = () => {
    return NODE_ENV === prepubEnv;
}

exports.isDocker = () => {
    return NODE_ENV === dockerEnv;
}

exports.isDev = () => {
    return NODE_ENV === devEnv;
}

exports.getEnvStr = () => {
    return NODE_ENV;
}

exports.getEnvCfg = () => {
    const env = require(`../config/${NODE_ENV}.env`);
    console.log('输出到前端的环境变量\n', env, '\n\n');
    return env;
}
