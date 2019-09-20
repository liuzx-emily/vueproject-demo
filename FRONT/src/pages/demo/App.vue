<template>
	<div id="app">
		<nav class="demo-left">
			<router-link v-for="item in navList" :key="item.code" :to="item.code">{{item.name}}</router-link>
		</nav>
		<router-view :key="$route.fullPath" class="demo-right"></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {
			navList: [
				{ name: "画板", code: "/painting" },
				{ name: "图片处理", code: "/photoEditing" },
				{ name: "dragAndResize", code: "/dragAndResize" },
				{ name: "拖拽刪除", code: "/dragToDelete" },
				{ name: "波浪~", code: "/wave" },
				{ name: "日历组件", code: "/calendar" },
				{ name: "计算文件md5", code: "/computeFileMd5" },
			],
		};
	},
	methods: {

	}
};
</script>