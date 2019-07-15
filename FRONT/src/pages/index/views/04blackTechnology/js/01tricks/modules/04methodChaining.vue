<style scoped>
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
	<el-card>
		<div slot="header">
			方法链：返回this
		</div>
		<pre>
	var Check = function(age, num) {
	    this.age = age;
	    this.num = num;
	    this.flag = true;
	};
	Check.prototype.checkAge = function() {
	    if (this.flag) {
	        this.flag = (this.age <= 30);
	    }
	    return this;
	}
	Check.prototype.checkNum = function() {
	    if (this.flag) {
	        this.flag = (this.num <= 100);
	    }
	    return this;
	}
	Check.prototype.getResult = function() {
	    return this.flag;
	}

	new Check(12, 13).checkAge().checkNum().getResult();
	new Check(12, 33).checkAge().checkNum().getResult();</pre>
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
	created() { },
	mounted() { },
	methods: {}
};
</script>