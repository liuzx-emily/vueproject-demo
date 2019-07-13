<style scoped>
code {
    /*font-weight: normal;*/
}
pre {
    background: #f5f7ff;
    color: #5e6687;
    font-size: 13px;
    line-height: 1.6;
    margin-top: 0;
    padding: 5px 0;
}
</style>
<template>
    <section>
        <el-card>
            组件传递prop，如果prop是个对象并且修改了地址。
            那么组件内部的参数变化，要 nextTick 才会变化。（xTable组件内部就处理了这个问题）
        </el-card>
        <el-card>
            <div slot="header">
                <code>computed</code>or <code>methods</code>
            </div>
            <!-- card body -->
            <p>1 <code>computed</code>：计算属性可以依赖其他计算属性；计算属性不仅可以依赖当前Vue实例的数据，还可以依赖其他实例的数据</p>
            <p>2 每次触发重新渲染时：</p>
            <ul style="margin-left:30px;margin-top:-10px;">
                <li><code>computed</code>：基于依赖进行缓存的。只在相关依赖发生改变时才会重新求值。如果依赖没有变化，那么多次访问都会立即返回之前的计算结果，不会执行计算函数。</li>
                <li><code>methods</code>：每次都会执行函数，重新计算</li>
            </ul>
            <pre>
                computed:{
                    // 每次触发重新渲染，不会重新计算，而是返回之前缓存的值
                    now(){
                        return Date.now();
                    }
                }</pre>
        </el-card>
        <el-card>
            <p><code>vm.$el</code>：挂载元素</p>
            <p><code>vm.$parent</code>、<code>vm.$root</code></p>
            <p><code>vm.$attrs</code>：包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。</p>
        </el-card>
        <el-card>
            <p>1 建议所有会用到的数据都预先在 data 声明，这样不至于将数据散落在业务逻辑中，难以维护。</p>
            <p>2 使用<code>v-html</code> 时，如果内容是用户自己输入的，那么要小心XSS（跨站脚本攻击，Cross Site Scripting）</p>
            <p>3 <code>v-pre</code>中的内容不会被编译</p>
            <p>4 <code>v-cloak</code>这个指令保持在元素上直到关联实例结束编译。和如下CSS一起用时，可以隐藏未编译完成的的元素：
                <pre style="margin-top:10px;margin-left:30px;width:250px;">
        [v-cloak]{
            display: none;
        }</pre>
            </p>
            <p>5 <code>v-once</code>：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。</p>
            <p>6 <code>filters</code>：filters里面的this不指向vue实例
                <pre v-pre>
                &lt;template&gt;
                    {{scope.row.startTime | formatDate }}
                &lt;/template&gt;                
                &lt;script&gt;                     
                export default{ 
                    filters: {
                        formatDate(value) {
                            return this.xtools.formattingDate(value, 2);
                        }
                    },
                }
                &lt;/script&gt;              
                </pre>
            </p>
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