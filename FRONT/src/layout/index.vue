<template>
	<section class="layout">
		<template v-if="initDone">
			<section class="layout-sidebar-container">
				<el-scrollbar style="height:100%">
					<sidebar id="sidebar" :data="$store.state.permission.navigationTreeData" @mouseleave.stop></sidebar>
				</el-scrollbar>
			</section>
			<section class="layout-right-container">
				<section id="topbar">
					<breadcrumb />
					<userbox />
				</section>
				<section class="layout-main-container">
					<router-view id="mainContent" :key="$route.fullPath"></router-view>
				</section>
			</section>
		</template>
	</section>
</template>

<script>
	import './styles/index.scss'
	import sidebar from './modules/sidebar/index'
	import breadcrumb from './modules/breadcrumb/index'
	import userbox from './modules/userbox/index'
	import { initPermissionData } from '@/permission/index'
	export default {
		components: { sidebar, breadcrumb, userbox },
		data() {
			return {
				initDone: false,
			}
		},
		created() {
			this.getMenusAndBtns();
		},
		methods: {
			getMenusAndBtns() {
				this.xaxios({
					url: "/api/getMenusAndBtns.do",
				}).then(res => {
					initPermissionData(res.data);
					// 在菜单和按钮都获取到之后，才能设为initDone。（为什么一定要先获取按钮权限？因为需要用 v-permission 控制按钮权限）
					this.initDone = true;
				});
			},
		}


	}
</script>