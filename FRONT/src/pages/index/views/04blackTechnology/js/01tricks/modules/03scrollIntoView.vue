<style scoped>
pre {
    background: #f5f7ff;
    color:#5e6687;
    font-size: 13px;
    line-height: 1.6;
    margin-top: 0;
    padding: 5px 0;
}
</style>
<template>
    <el-card>
        <div slot="header">
            使用<code>scrollIntoView</code>来完成滚动定位
        </div>
        <p>
            最方便的是
            <pre style="display:inline-block;margin-bottom:0;">&lt;a href="#元素的id"&gt;导航1&lt;/a&gt;</pre>
        </p>
        <p>但是本项目的路由跳转是使用<code>#</code>来实现的，所以不能用这个方法。推荐用<code>scrollIntoView</code>，兼容性不错，IE8开始支持基本功能：</p>
        <p>HTML：</p>
        <pre>	&lt;a @click="scrollToContent(元素的id)"&gt;导航1&lt;/a&gt;</pre>
        <p>JS：</p>
        <pre>
	scrollToContent(id) {
	   document.getElementById(id).scrollIntoView({
	        block: 'start',
	        behavior: 'smooth'
	    });
	}</pre>
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