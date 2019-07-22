<template>
	<div id="app" v-loading.fullscreen.lock="!initDone" element-loading-background="rgba(0,0,0,0.2)">
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
					<a href="./portal.html">
						<i class="fa fa-umbrella"></i>
						<span class="name">portal</span>
					</a>
					<a href="./demo.html">
						<i class="fa fa-umbrella"></i>
						<span class="name">demo</span>
					</a>
				</nav>
				<!-- 用户信息 -->
				<userBox></userBox>
			</div>
		</section>
		<section id="columnContainer" :class="{cuttedSideBar:$store.state.cuttedSideBar}" v-if="initDone">
			<!-- 侧边栏 -->
			<aside id="sidebarWrap" v-if="sidebarNavList.length>0">
				<section id="sidebarController" @click="$store.state.cuttedSideBar=!$store.state.cuttedSideBar">
					<i class="fa fa-arrow-circle-left" v-if="!$store.state.cuttedSideBar"></i>
					<i class="fa fa-arrow-circle-right" v-else></i>
				</section>
				<xLimitlessSidebarMenu id="sidebarNav" :data="sidebarNavList" :props="sidebarMenuProps"></xLimitlessSidebarMenu>
			</aside>
			<!-- 主要内容 -->
			<article id="mainContentWrap" :style="ContentWrapStyle">
				<section id="mainContent">
					<router-view :key="$route.fullPath"></router-view>
				</section>
				<address>Author : liuzx-emily</address>
			</article>
		</section>
	</div>
</template>
<script>
export default {
	components: {},
	watch: {
		sidebarNavList() {
			this.jumpToFirstNav();
		},
		initDone(value) {
			if (value) {
				this.$nextTick(() => { });
			}
		}
	},
	computed: {
		ContentWrapStyle() {
			if (this.sidebarNavList.length > 0) {
				return {};
			} else {
				return {
					marginLeft: 0
				};
			}
		},
		currentTopNavPath() {
			let res = /^\/[^/]{1,}/.exec(this.$route.path);
			if (res && res.length > 0) {
				return res[0];
			} else {
				return "";
			}
		},
		// 侧边导航
		sidebarNavList() {
			let currentTopNav_and_children = this._.filter(this.navList, item => item.code == this.currentTopNavPath);
			// url在navList中没有匹配上
			if (currentTopNav_and_children.length === 0) {
				// this.$router.push({ name: '404' });
				return [];
			}
			let child = currentTopNav_and_children[0].child;
			if (child && child.length > 0) {
				return currentTopNav_and_children[0].child;
			} else {
				return [];
			}
		},
		initDone() {
			return this.initDone_menu && this.initDone_btn;
		}
	},
	created() {
		// 获取菜单数据，并且自动跳转到第一个菜单
		this.getMenuData();
		this.getPermissionBtnData();
		// websocket
		var ws = new WebSocket("ws://localhost:8888");
		ws.onopen = function () {
			ws.send(1);
		};

		ws.onmessage = function (evt) {
			var received_msg = evt.data;
			console.log("服务器发来了：", received_msg);
		};

		ws.onclose = function () {
			// 关闭 websocket
			console.log("连接已关闭...");
		};
	},
	data() {

		return {
			initDone_menu: false,
			// 因为用v-permission控制按钮权限，所以一定要先获取到所有按钮的权限
			initDone_btn: false,
			// 总导航
			navList: [],
			sidebarMenuProps: {
				before_idkey: "id",
				before_parentkey: "parentId",
				urlKey: "code"
			},
		};
	},
	methods: {
		// 如果访问本组件的根地址，自动跳转到第一个菜单
		jumpToFirstNav() {
			const findRealPage = list => {
				if (list && list.length > 0) {
					// list不是空的
					let firstChild = list[0];
					if (firstChild.type == 1) {
						// type==1，是导航，需要接着往下找
						return findRealPage(firstChild.child);
					} else if (firstChild.type == 2) {
						// type==2，是页面
						return firstChild.code;
					} else {
						// type为其他，权限肯定是配错了！
					}
				} else {
					// 是空的
				}
			};
			if (this.$route.path == this.currentTopNavPath) {
				let realPageCode = findRealPage(this.sidebarNavList);
				realPageCode && this.$router.push(realPageCode);
			}
		},
		// 获取菜单数据。如果现在没有进入任何一个页面，则手动跳转到第一个菜单
		getMenuData() {
			this.xaxios({
				url: "/api/getMenus.do"
			}).then(res => {
				const navList = this.xtools.arrayToTree(res.data, {
					id: "id",
					parentId: "parentId",
					children: "child"
				});
				// 路由跳转
				if (navList && navList.length > 0) {
					this.navList = navList;
					this.initDone_menu = true;
					// 页面刷新后，需要等待一段时间才能取到正确的 $route。在这之前，this.$route.path 都是 /
					setTimeout(() => {
						// 如果现在没有进入任何一个页面，则手动跳转到第一个菜单
						if (this.$route.path == "/") {
							this.$router.push(navList[0].code);
						}
					}, 500);
				} else {
					this.initDone_menu = true;
				}
			}).catch(error => { });
		},
		// 获取按钮权限数据
		getPermissionBtnData() {
			this.xaxios({
				url: "/api/getBtns.do",
			}).then(res => {
				this.$store.state.permissionBtns = this._.map(res.data, "code");
				this.initDone_btn = true;
			}).catch(error => { });
		}
	}
};
</script>