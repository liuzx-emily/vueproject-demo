<style scoped></style>
<template>
    <section>
        <el-card>
            <div slot="header">watch</div>
            <!-- card body -->
            <p>1 不要用箭头函数，因为this指向会出错</p>
            <p>2 设置属性<code>immediate:true</code>的话，那么该回调将会在侦听开始之后被立即调用。顺序是 watch到了-> created -> mounted。要小心，这里HTML结构还没有渲染出来，$refs等是取不到的。</p>
        </el-card>
    </section>
</template>
<script>
export default {
    props: {},
    components: {},
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