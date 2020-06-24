<style lang="scss" scoped>
	.no-permission {
		&::after {
			display: inline-block;
			content: "（没权限）";
			color: red;
		}
	}
</style>
<template>
	<section>
		<div class="title">权限测试页面</div>
		<div :class="{'no-permission':checkNoPermission(1)}">
			<x-button @click="goTo(1)">电之生气</x-button>
		</div>
		<div :class="{'no-permission':checkNoPermission(2)}">
			<x-button @click="goTo(2)">火之高兴</x-button>
		</div>
		<div>
			<x-button @click="goTo(3)">霜之哀伤</x-button>（设置了 <code>route.meta.noIntercept = true</code>）
		</div>
		<div :class="{'no-permission':checkNoPermission(4)}">
			<x-button @click="goTo(4)">水之难过</x-button>
		</div>
		<div>
			<x-button @click="goTo(5)">土之疲惫</x-button>（页面不存在）
		</div>
	</section>
</template>

<script>
	export default {
		methods: {
			getPath(type) {
				let path;
				if (type == 1) {
					path = "electricity"
				} else if (type == 2) {
					path = "fire"
				} else if (type == 3) {
					path = "frost"
				} else if (type == 4) {
					path = "water"
				} else if (type == 5) {
					path = "land"
				}
				return "/permission-test/1/2/" + path;
			},
			checkNoPermission(type) {
				let path = this.getPath(type);
				return !(this.$store.state.permission.permissionCodeList.includes(path));
			},
			goTo(type) {
				let path = this.getPath(type);
				this.$router.push(path);
			}
		}

	}
</script>
<style lang="scss" scoped>
	.title {
		font-size: 16px;
		margin-bottom: 10px;
	}
</style>