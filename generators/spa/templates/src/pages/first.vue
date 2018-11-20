<template>
    <div class="">
        环境变量为：{{msg}} <br/>
        host：{{host}} <br/>
        页面一 <br/>
        count: {{count}} <br/>
        listLen: {{listLenGetter}} <br/>
        <comp-one></comp-one>
        <button @click="increment" style="background-color: green">加一</button>
    </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions,
} from 'vuex';
import CompOne from '@/components/CompOne';
import Apis from '@/api';

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
        ...mapState('first', [
            'count',
        ]),
        ...mapGetters('first', [
            'listLenGetter',
        ]),
    },
    watch: {
    },
    methods: {
        ...mapMutations('first', [
            'increment',
            'updateCount',
        ]),
        ...mapActions('first', [
            'getDataList',
            'testApi',
        ]),
    },
    created() {
        this.getDataList(1, '342');
        console.log(this.$store);
        Apis.getFirst({ a: '中文' });
        Apis.getFirst(null, null, { method: 'post' });
        Apis.postSecond(null, {
            a: '中文',
            b: 123,
        });
        this.testApi();
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
