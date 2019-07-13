<style scoped>
h6 {
    margin: 15px 0 6px;
    font-size: 13px;
    color: #E91E63;
}
ul li {
    font-size: 12px;
    color: #555;
    margin-bottom: 5px;
}
ul.inline-and-fuhao li {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 0;
}
ul.inline-and-fuhao li:after {
    content: "->";
    margin-left: 10px;
    color: #aaa;
}
ul.inline-and-fuhao li:last-child:after {
    display: none;
}
</style>
<template>
    <el-card>
        <div slot="header">
            jQuery中，<code>ready</code>和<code>load</code>谁先执行？
        </div>
        <!-- card body -->
        <section>
            <h6 style="margin-top:0;">DOM文档加载步骤：</h6>
            <ul class="inline-and-fuhao">
                <li>解析HTML结构</li>
                <li>加载外部js和css </li>
                <li>解析并执行js </li>
                <li>构造HTML DOM模型(<code>ready</code>)</li>
                <li>加载图片等外部文件</li>
                <li>页面加载完毕(<code>load</code>)</li>
            </ul>
        </section>
        <section>
            <h6>总结：</h6>
            <ul>
                <li>1 ready：在dom结构加载完成后执行，保证js一定可以找到元素（但是图片可能没加载完，图片高度可能是0）</li>
                <li>2 load：在dom结构加载完成后，还要等待所有外部资源（图片、视频等）都加载完毕</li>
            </ul>
        </section>
        <section>
            <h6>页面加载时，触发顺序</h6>
            <ul class="inline-and-fuhao">
                <li>$(document).ready()</li>
                <li>$(window).ready() </li>
                <li>$(window).load() </li>
            </ul>
            <p>说明：1.以上三个都是在页面中可以有多个，并且都会执行（已实测）&nbsp;&nbsp;&nbsp;2.没有 $(document).load&nbsp;&nbsp;&nbsp;3.原生JS中只有window.onload（已实测）</p>
        </section>
    </el-card>
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