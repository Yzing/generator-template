<template>
    <div class="">
        环境变量为：{{msg}},
        host：{{host}}
        首页
        <comp-one></comp-one>
        <a href="first">跳到first</a>
    </div>
</template>

<script>
import CompOne from '@/components/CompOne';
export default {
    name: 'index',
    data() {
        return {
            msg: process.env.NODE_ENV,
            host: process.env.HOST,
        };
    },
    components: {
        CompOne,
    },
    props: {
    },
    computed: {
    },
    watch: {
    },
    methods: {
    },
    created() {
    },
    mounted() {
        // 这里可以进行 DOM操作
    },
    updated() {
    },
    destroyed() {
    },
};
</script>

<style scoped>
    
</style>
