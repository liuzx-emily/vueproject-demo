<template>
	<div class="error-page-404-container">
		<x-button class="go-back-btn" icon="angle-left" @click="goBack">返回</x-button>
		<img src="./images/404.png">
	</div>
</template>

<script>
	export default {
		methods: {
			goBack() {
				this.$router.push("/")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.error-page-404-container {
		width: 1000px;
    max-width: 90%;
		margin: 0 auto;

		.go-back-btn /deep/ {
			margin-top: 5vh;
      margin-bottom: 20px;
			display: block;
			padding-left: 10px;
			padding-right: 12px;
			height: 32px;
			line-height: 32px;
			font-size: 14px;
			background: #304156;
			color: white;
			border: none;
			i.fa {
				font-size: 16px;
			}
			i.fa+.x-button-content {
				margin-left: 2px;
			}
		}
		img {
			width: 100%;
		}

	}
</style>