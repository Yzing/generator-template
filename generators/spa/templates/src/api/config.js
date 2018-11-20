
const SERVER_HOST_HEAD = process.env.SERVER_HOST_HEAD;
const SERVER_HOST_TAIL = process.env.SERVER_HOST_TAIL;
export const host = `${SERVER_HOST_HEAD}${SERVER_HOST_TAIL}`;
export const baseUrl = '';
export const timeout = 20000;

export const apiList = {
    getFirst: {
        url: '/first',
        method: 'get',
    },
    postSecond: {
        url: '/second',
        method: 'post',
    },
};

export default {
    host,
    baseUrl,
    timeout,
    apiList,
};
