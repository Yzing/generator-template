
import Apis from '@/api';

export default {
    namespaced: true,
    state() {
        return {
            count: 0,
            list: [],
        };
    },
    getters: {
        // 获取需要通过计算state，产生的值
        listLenGetter(state) {
            return state.list.length;
        },
    },
    mutations: {
        // 处理同步操作
        increment(state) {
            state.count += 1;
        },
        updateCount(state, { num = 0 }) {
            state.count = num;
        },
    },
    actions: {
        // 处理一部操作，比如发请求
        // 第一个参数为 context {state, getters, commit, dispatch},后边的为附加参数
        // commit可以触发mutation提交，dispatch可以触发action分发
        async getDataList(context, ...param) {
            console.log(context, param);
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('等待2秒');
                    resolve(1);
                }, 2000);
            });
            console.log('等待后调用');
        },
        async testApi(context, ...param) {
            console.log(context, param);
            await Apis.getFirst({ ss: 1 })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
