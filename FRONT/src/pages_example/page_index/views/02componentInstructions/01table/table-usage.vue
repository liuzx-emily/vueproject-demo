<template>
    <section>
        <el-card>
            <section slot="header">搜索参数（使用方法和之前版本大不相同）</section>
            <p>组件内部维护了一个搜索参数。</p>
            <p>调用组件的<code>refreshTable</code>方法时，可以通过传参，来修改组件内部的搜索参数。</p>
            <p style="color:crimson">如果有初始搜索参数，那么第一次刷新表格数据时，一定要记得传过去！</p>
        </el-card>
        <el-card>
            <p>1 分页：<code>enablePaging</code>，默认开启。内置分页参数：<code>page row</code> （page从1开始）</p>
            <p>2 多选：<code>enableCheckbox</code>，默认关闭。使用<code>getSelection</code> 方法获取选中行数据。 </p>
            <p>3 后端排序：
                组件内部已经绑定了排序函数，只需要给排序列添加<code>sortable="custom"</code>。
                <br>内置的接口排序参数为：<code>sort order</code>。
                <br>如果有初始排序，使用<code>defaultsort</code>来传递。
            </p>
            <hr>
            <p>1 内置loading，在 <code>refresh</code> 方法中自动切换 </p>
            <p>2 自定义表头： <code> &lt;template slot="header"&gt;&lt;/template&gt;</code> （这一列的label就不需要了）</p>
        </el-card>
        <el-card>
            <section slot="header">
                el-pagination的特性(bug)：分页组件初始化完成后，再通过js修改 <code>current-page</code> ，组件是不会响应它的变化的。
            </section>
            <p>所以为了实现 “一上来就显示第3页” 这种需求，必须先把 <code>current-page</code> 改成3，然后再初始化分页组件。</p>
            <p>xTable组件内部引入了<code>startRenderingPaging</code> 参数，控制分页组件的初始化时间。初始化为 false。在<code>refreshTable</code>方法中，把 <code>startRenderingPaging</code>的值改为true。</p>
            <p>所以只要在调用 <code>refreshTable</code> 之前设置好 <code>current-page</code>就可以了。</p>
            <pre>
            mounted() {
                this.$refs.table.pageNum = 3;
                this.$refs.table.refreshTable();
            },</pre>
        </el-card>
    </section>
</template>
<script>
export default {
    components: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>