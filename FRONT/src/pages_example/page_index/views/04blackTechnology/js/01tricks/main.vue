<style scoped>
</style>
<template>
    <section>
        <section>
            1 时间字符串可以比较大小（要补零）
            const time1 = "2019-03-31 21:00:00";
            const time2 = "2019-05-01 09:00:00";
            const overtime = time1 > time2;
            // overtime => false
            2 数字取整（截断，不是四舍五入）
            ~~-9.05
            3 字符串转数字
            +"-59.65"
        </section>
        <!-- jQuery中，ready和load谁先执行？ -->
        <jQuery-ReadyAndLoad />
        <!-- 用>=时要小心 -->
        <beAlertToEqualTo />
        <!-- 使用scrollIntoView来完成滚动定位 -->
        <scrollIntoView />
        <!-- 方法链 -->
        <methodChaining />
    </section>
</template>
<script>
import jQuery_ReadyAndLoad from './modules/01jQuery_readyAndLoad.vue'
import beAlertToEqualTo from './modules/02beAlertToEqualTo.vue'
import scrollIntoView from './modules/03scrollIntoView.vue'
import methodChaining from './modules/04methodChaining.vue'
export default {
    props: {},
    components: { "jQuery-ReadyAndLoad": jQuery_ReadyAndLoad, beAlertToEqualTo, scrollIntoView, methodChaining },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>