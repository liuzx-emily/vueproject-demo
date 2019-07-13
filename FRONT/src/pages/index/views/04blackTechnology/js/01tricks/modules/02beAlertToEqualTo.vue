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
            用<code>&gt;=</code>时要小心
        </div>
        <!-- card body -->
        <section>
            <pre>
	// 在搜索前，判断时间是否正确
	if (this.searchparam.startTime >= this.searchparam.endTime) {
		alert("起始时间不能晚于结束时间");
		return;
	}</pre>
            <p>上面这样写是不行的。如果<code>startTime</code>和<code>endTime</code>都是null，那么<code>null >= null</code>是<code>true</code></p>
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