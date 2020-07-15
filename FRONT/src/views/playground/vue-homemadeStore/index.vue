<style lang="scss" scoped>
	.container {
		display: flex;
		.view-box /deep/ {
			flex: 1 1 50%;
			box-shadow: 0 0 4px #aaa;
			padding: 20px;
			header {
				margin-bottom: 10px;
			}
		}
		.view-box:nth-child(1) {
			margin-right: 20px;
		}
	}
</style>
<template>
	<section class="container">
		<view1 class="view-box"></view1>
		<view2 class="view-box"></view2>
    <a @click="$router.push('/permission-test/2')">点我</a>
	</section>
</template>

<script>
	import view1 from './view1'
	import view2 from './view2'
	export default {
		components: { view1, view2 }
	}
</script>