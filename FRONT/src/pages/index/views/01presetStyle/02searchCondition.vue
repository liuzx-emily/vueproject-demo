<style scoped>
	p{
		color:crimson;
		margin: 5px 0;
		font-size: 14px;
	}
</style>
<template>
    <section>
    	<el-card>
    	    <div slot="header">
    	        结构
    	    </div>
    	    <!-- card body -->
    	    <p>section.search-condition</p>
    	    <p style="margin-left:30px;">section.box</p>
    	    <p style="margin-left:60px;">span.search-label</p>
    	    <p style="margin-left:60px;">span.search-input</p>
            <p style="margin-left:30px;">section.search-btn-box</p>
    	</el-card>
        <section class="search-condition">
            <div class="box">
                <span class="search-label">
                    标题：
                </span>
                <span class="search-input">
                    <el-input v-model.trim="title"></el-input>
                </span>
            </div>
            <section class="search-btn-box">
                <el-button type="warning">搜索</el-button>
            </section>
        </section>
    </section>
</template>
<script>
export default {
    data() {
        return {
            title: ""
        }
    }
};
</script>