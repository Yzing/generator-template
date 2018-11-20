import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 模块自动加载，支持在modules中一级目录，不支持子目录
// 命名中的 - . _  会自动去除，转换成驼峰式
const storeModules = require.context('./modules', false, /\.js$/);

const modules = {};
storeModules.keys().forEach((k) => {
    const key = k.replace(/\.\/|\.js/g, '')
        .replace(/-+|\.+|_+/g, '-')
        .replace(/-([a-z])/g, (s1, s2) => {
            return s2.toUpperCase();
        });
    modules[key] = storeModules(k).default;
});

export default new Vuex.Store({
    modules: {
        // 基于文件名，生成store子模块名称
        ...modules,
    },
    strict: false,
    plugins: [],
});
