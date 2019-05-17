<style scoped>
</style>
<template>
    <section>
        <!-- jQuery中，ready和load谁先执行？ -->
        <jQuery-ReadyAndLoad />
        <!-- 用>=时要小心 -->
        <beAlertToEqualTo />
        <!-- 使用scrollIntoView来完成滚动定位 -->
        <scrollIntoView />
    </section>
</template>
<script>
import jQuery_ReadyAndLoad from './modules/01jQuery_readyAndLoad.vue'
import beAlertToEqualTo from './modules/02beAlertToEqualTo.vue'
import scrollIntoView from  './modules/03scrollIntoView.vue'
export default {
    props: {},
    components: { "jQuery-ReadyAndLoad": jQuery_ReadyAndLoad, beAlertToEqualTo ,scrollIntoView},
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