<style lang="scss">
	body {
		margin: 0;
		font: 16px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
	}
	ul, li {
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
<template>
	<div id="app">
		<router-view v-if="!needPermissionData||$store.state.permission.permissionDataLoaded" />
	</div>
</template>

<script>
	import { initPermissionData } from '@/permission/index'
	export default {
		name: 'App',
		data() {
			return {
				needPermissionData: true, // 当前路由页面是否需要权限数据
				loadingPermissionData: false, // 当前是否正在加载权限数据（防止网速慢的时候，一连发好几个请求）
			}
		},
		watch: {
			// 这里不能用 immediate。不然第一次触发时，$route 还没有加载好（不知道为什么 onReady 方法没起作用。。。）
			'$route': {
				handler() {
					this.handleRouteChange();
				}
			}
		},
		mounted() {
			// 因为 $route 中用不了 immediate，所以在 mounted 中要手动调一遍。
			this.handleRouteChange();
		},
		methods: {
			handleRouteChange() {
				this.$router.onReady(() => {
					if (this.$store.state.permission.permissionDataLoaded) {
						return;
					}
					if (this.$route.meta.dontNeedPermissionData) {
						this.needPermissionData = false;
						return;
					}
					if (this.loadingPermissionData) {
						return;
					}
					// 当前页面需要权限数据，并且当前还有权限数据，也不是正在获取。这种情况，调用 getMenusAndBtns
					this.getMenusAndBtns();
				})
			},
			getMenusAndBtns() {
				this.loadingPermissionData = true;
				this.needPermissionData = true;
				this.xaxios({
					url: "/api/getMenusAndBtns.do",
				}).then(res => {
					initPermissionData(res.data);
					this.loadingPermissionData = false;
					this.$store.state.permission.permissionDataLoaded = true;
				});
			},
		}
	}
</script>