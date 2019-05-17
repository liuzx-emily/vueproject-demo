<style scoped>
code {
    font-weight: normal;
}
</style>
<template>
    <section>
        <el-card>
            <div slot="header">
                $
            </div>
            <!-- card body -->
            <p>vm.$el：挂载元素</p>
            <p>vm.$parent vm.$root</p>
            <p><code>vm.$attrs</code>：包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。</p>
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