<template>
	<div class="error-page-404-container">
		<div class="text-container">
			<div class="big">Oops！</div>
				<div class="small">你没有权限访问该页面</div>
			<x-button class="go-back-btn" icon="angle-left" @click="goBack">返回</x-button>
		</div>
			<img src="./images/401.gif">
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
		padding-top: 15vh;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 200px;
		}
		.text-container {
			margin-right: 20px;
			.big {
				font-size: 60px;
				font-weight: bold;
				margin-bottom: 30px;
				color: #484848;
			}
			.small {
				font-size: 16px;
				margin-bottom: 30px;
			}
			.go-back-btn /deep/ {
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
		}

	}
</style>