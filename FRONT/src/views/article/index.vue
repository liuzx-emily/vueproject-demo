<template>
	<section v-loading="loading">
		<section class="abovelist-search-and-btns">
			<x-searcharea :searchparam="searchparam" :searchAreaList="searchAreaList"></x-searcharea>
			<section class="btns-box">
				<x-button @click="do_search">搜索</x-button>
				<x-button v-permission="'article:add'" @click="openDial_main(1)" icon="plus">新增</x-button>
			</section>
		</section>
		<section>
			<x-table :refresh="srefresh" :enablePaging="true" ref="table" default-expand-all>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column prop="publisher" label="发布人" width="120px"></el-table-column>
				<el-table-column prop="publishTime" label="发布时间" width="150px">
					<template slot-scope="scope">
						{{xtools.formattingDate(scope.row.publishTime)}}
					</template>
				</el-table-column>
				<el-table-column prop="state" label="状态" width="120px">
					<template slot-scope="scope">
						<span v-if="scope.row.state==1">未提交</span>
						<span v-if="scope.row.state==2">待审核</span>
						<span v-if="scope.row.state==3">审核通过</span>
						<span v-if="scope.row.state==4">审核不通过</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="320px">
					<template slot-scope="scope">
						<x-button v-permission="'article:edit'" v-if="scope.row.state==1||scope.row.state==4" @click="openDial_main(2,scope.row)">编辑</x-button>
						<x-button v-permission="'article:detail'" @click="openDial_main(3,scope.row)">查看</x-button>
						<x-button v-permission="'article:audit'" v-if="scope.row.state==2" @click="openDial_main(4,scope.row)">审核</x-button>
						<x-button v-permission="'article:delete'" v-if="scope.row.state==1||scope.row.state==4" @click="openConfirm_delete(1,scope.row)" color="red">删除</x-button>
					</template>
				</el-table-column>
			</x-table>
		</section>
		<dialog-main :refreshFunc="refreshTable" ref="dialogMain"></dialog-main>
	</section>
</template>
<script>
	import dialogMain from './dialogMain.vue'
	export default {
		components: { dialogMain },
		data() {
			return {
				loading: false,
				searchparam: {
					title: "",
					publisher: "",
					state: "-1",
					startTime: "",
					endTime: "",
					year: new Date().getFullYear()
				},
				searchAreaList: [

					{ label: '标题', prop: 'title' },
					{ label: '发布人', prop: 'publisher' },
					{ label: '年份', prop: 'year' },
					{ label: '发布时间', prop: ['startTime', 'endTime'], type: 'pickdaterange' },
					{
						label: '状态',
						prop: 'state',
						type: 'select',
						optionList: [
							{ id: "-1", label: "全部", },
							{ id: "1", label: "未提交", },
							{ id: "2", label: "待审核", },
							{ id: "3", label: "审核通过", },
							{ id: "4", label: "审核不通过", },
						]
					},
				]
			};
		},
		mounted() {
			this.refreshTable(true);
		},
		methods: {
			srefresh(param, self) {
				self.loading = true;
				self.xaxios({
					url: "/api/article/list.do",
					params: param
				}).then(res => {
					if (res.code === 1) {
						self.tableData = res.data;
						self.count = res.count;
					} else {
						this.$message({ message: res.message, type: 'error', });
					}
					self.loading = false;
				});
			},
			refreshTable(flag) {
				if (flag) {
					let new_searchparam = this._.cloneDeep(this.searchparam);
					this.$refs.table.refreshTable(new_searchparam);
				} else {
					this.$refs.table.refreshTable();
				}
			},
			do_search() {
				this.refreshTable(true);
			},
			openDial_main(type, data) {
				data = data || {};
				this.$refs.dialogMain.openDial(type, data.id);
			},
			openConfirm_delete(data) {
				let ids = [];
				if (data) {
					ids = [data.id];
				} else {
					ids = this.$refs.table.tableSelection.map(item => item.id);
					if (ids.length == 0) {
						this.$message({ type: 'error', message: '请先勾选数据！' });
						return false;
					}
				}
				this.xcommons.openConfirm_delete({
					url: "/api/article/delete.do",
					data: { ids: ids },
					refreshFunc: this.refreshTable,
					comfirmMessage: `您确认要删除文章吗？`
				});
			},
		}
	};
</script>