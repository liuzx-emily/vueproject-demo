<template>
	<section class="layout">
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
	</section>
</template>

<script>
	import './styles/index.scss'
	import sidebar from './modules/sidebar/index'
	import breadcrumb from './modules/breadcrumb/index'
	import userbox from './modules/userbox/index'
	export default {
		components: { sidebar, breadcrumb, userbox },
		data() {
			return {
				initDone: true,
			}
		}
	}
</script>