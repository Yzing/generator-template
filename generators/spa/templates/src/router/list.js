const Index = () => import(/* webpackChunkName: "index" */ '@/pages/index');
const First = () => import(/* webpackChunkName: "first" */ '@/pages/first');

// vue-router文档 https://router.vuejs.org/zh/

export default [
    {
        path: '/first',
        name: 'first',
        component: First,
    },
    {
        path: '/index',
        alias: '/',
        component: Index,
    },
    {
        path: '*',
        redirect: '/',
    },
];
