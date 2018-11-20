import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { apiList, host, baseUrl, timeout } from './config';
// import { gotoSSO } from './sso';

// 超时
axios.defaults.timeout = timeout || 0;
// 允许发送cookie
axios.defaults.withCredentials = true;
//标记 XMLHttpRequest
// axios.defaults.headers = {
//     'Content-Type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest',
// };

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    // console.log(config);
    // 在发送请求之前做些什么
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response;
}, (error) => {
    // 对响应错误做点什么
    if (error.response) {
        const res = error.response;
        switch (res.status) {
            case 401: {
                // gotoSSO();
                break;
            }
            default: {
                break;
            }
        }
    }
    return Promise.reject(error);
});

// 封装的
const ajax = {
    get(url, data) {
        return new Promise((resolve, reject) => {
            const a = {
                params: data || '',
            };
            axios.get(url, a).then((response) => {
                resolve(response.data);
            }, (response) => {
                reject(response.data);
            });
        });
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(data)).then((response) => {
                resolve(response.data);
            }).catch((response) => {
                reject(response.data);
            });
        });
    },
};

Vue.prototype.$ajax = ajax;
Vue.prototype.$axios = axios;

/*
Apis.getFirst(query, data, opt);
getFirst 为api配置中名称
query 为query参数,
data 为请求体参数,
opt 为自定义配置项 会覆盖默认配置
*/
const Apis = {};
Object.keys(apiList).forEach((key) => {
    Apis[key] = (query = {}, bodyData = {}, opt = {}) => {
        const cfg = apiList[key];
        const queryString = qs.stringify(query);
        const str = queryString ? `?${queryString}` : '';
        const {
            url,
            errmsg,
        } = cfg;
        return axios({
            ...cfg,
            ...opt,
            url: `${host}${baseUrl}${url}${str}`,
            data: bodyData,
            // data: qs.stringify(bodyData),
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then((response) => {
                const {
                    // status,
                    data,
                } = response;
                const {
                    errno,
                    // errmsg: msg,
                } = data;
                if (errmsg && errno !== 0) {
                    // vant.Toast(`${msg}(${errno})`);
                }
                return data;
            })
            .catch((e) => {
                const {
                    status,
                } = e.response;
                if (status !== 401 && errmsg) {
                    // vant.Toast(errmsg);
                }
                throw Error(e);
            });
    };
});

export default Apis;
