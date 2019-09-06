<template>
	<div id="app">
		<template v-if="initDone">
			<section id="topbar">
				<!-- logo -->
				<section class="logo">Fullmetal Alchemist</section>
				<!-- 包在 .rightAlignContainer 中的内容会靠右对齐 -->
				<div class="rightAlignContainer">
					<!-- 导航 -->
					<nav>
						<router-link v-for="(item) in navList" :key="item.code" :to="item.code">
							<i class="fa" :class="'fa-'+item.icon"></i>
							<span class="name">{{item.name}}</span>
						</router-link>
					</nav>
					<!-- 用户信息 -->
					<userbox></userbox>
				</div>
			</section>
			<section id="columnContainer" :class="{cuttedSideBar:$store.state.cuttedSideBar}">
				<!-- 侧边栏 -->
				<aside id="sidebarWrap" v-if="sidebarNavList.length>0">
					<section id="sidebarController" @click="$store.state.cuttedSideBar=!$store.state.cuttedSideBar">
						<i class="fa fa-arrow-circle-left" v-if="!$store.state.cuttedSideBar"></i>
						<i class="fa fa-arrow-circle-right" v-else></i>
					</section>
					<sidebar-menu id="sidebarNav" :data="sidebarNavList"></sidebar-menu>
				</aside>
				<!-- 主要内容 -->
				<article id="mainContentWrap" :style="ContentWrapStyle">
					<section id="mainContent">
						<router-view :key="$route.fullPath"></router-view>
					</section>
					<address>Author : liuzx-emily</address>
				</article>
			</section>
		</template>
	</div>
</template>
<script>
import mixins_management_system from '~/mixins/management-system/main.js'
export default {
	mixins: [mixins_management_system],
	created() {
		this.getMenusAndBtns();
	},
	mounted() { },
	data() {
		return {};
	},
	methods: {
		getMenusAndBtns() {
			this.xaxios({
				url: "/api/getMenusAndBtns.do",
				params: { page: 1 },
			}).then(res => {
				this.refreshPermissionBtns(res.data.btns);
				this.refreshNavList(res.data.menus);
			}).catch(error => { });
		},
	}
};
</script>