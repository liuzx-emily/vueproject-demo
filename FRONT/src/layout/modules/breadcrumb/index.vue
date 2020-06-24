<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item v-for="(o,index) in list" :key="o.path">
			<span v-if="index==list.length-1">{{ o.name }}</span>
			<a v-else @click.prevent="handleLink(o)">{{ o.name }}</a>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>
<script>
	import { getBreadcrumb } from '@/permission/index'
	export default {
		data() {
			return {
				list: [],
			}
		},
		watch: {
			'$route'() {
				this.getList();
			}
		},
		created() {
			this.getList();
		},
		methods: {
			getList() {
				this.list = getBreadcrumb()
			},
			handleLink(o) {
				let path;
				if (o.isTransitionView) {
					path = o.realPath
				} else {
					path = o.path
				}
				this.$router.push(path).catch(() => {});
			}
		}
	}
</script>

<style>

</style>