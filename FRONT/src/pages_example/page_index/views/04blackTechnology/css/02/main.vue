<style scoped lang="less">
@tipBackgroundColor: #546e7a;
#cssContentAttrDemo {
	position: relative;
	margin-top: 50px;
	margin-left: 50px;
	&:before {
		display: none;
		content: attr(tips);
		position: absolute;
		left: 0;
		top: -35px;
		background: @tipBackgroundColor;
		color: white;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
		border-radius: 2px;
	}
	&:after {
		display: none;
		content: "";
		width: 0;
		height: 0;
		border: 6px solid transparent;
		border-top: 6px solid @tipBackgroundColor;
		position: absolute;
		left: 10px;
		top: -5px;
		font-size: 12px;
	}
}
#cssContentAttrDemo:hover {
	&:before {
		display: block;
	}
	&:after {
		display: block;
	}
}
</style>
<template>
	<section>
		<section id="cssContentAttrDemo" tips="嘿嘿嘿~">你好呀</section>
	</section>
</template>
<script>
export default {};
</script>