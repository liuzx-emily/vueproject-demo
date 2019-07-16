<template>
	<section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
		<el-card>
			<div slot="header" class="clearfix">
				<span>修改表格样式</span>
			</div>
			<div>
				<p>1 color 可选 neat common ，默认 common
					<el-input v-model="tableClass.color"></el-input>
				</p>
				<p>2 size 可选 small common big ，默认 common
					<el-input v-model="tableClass.size"></el-input>
				</p>
				<p>3 align 可选 left center，默认center
					<el-input v-model="tableClass.align"></el-input>
				</p>
				<p>（预设的样式在 src/styles 中）</p>
			</div>
		</el-card>
		<xTable :refresh="srefresh" ref="table" :color="tableClass.color" :size="tableClass.size" :align="tableClass.align">
			<el-table-column prop="name" label="名称" sortable="custom"></el-table-column>
			<el-table-column label="操作" width="250px">
				<template slot-scope="scope">
					<el-button class="size-small" type="primary">查看</el-button>
					<el-button class="size-small" type="success">编辑</el-button>
					<el-button class="size-small" type="warning">审核</el-button>
					<el-button class="size-small" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</xTable>
	</section>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			loading: false,
			tableClass: {
				color: "common",
				size: "common",
				align: "left",
			}
		};
	},
	mounted() {
		this.refreshTable(true);
	},
	methods: {
		// ------------------------------ 表格 ------------------------------
		// 传给子组件用的
		srefresh(param, self) {
			console.log(param);
			// 获取表格数据
			self.loading = true;
			self.xaxios({
				url: BASE_PATH + "/example/xTable.htmls",
				params: param
			}).then(res => {
				// 数据格式化
				self.tableData = res.data.map(item => {
					return item;
				});
				self.count = res.count;
				self.loading = false;
			}).catch(error => {
				self.loading = false;
			});
		},
		refreshTable(refreshSearchParam) {
			if (refreshSearchParam) {
				let new_searchparam = this._.cloneDeep(this.searchparam);
				this.$refs.table.refreshTable(new_searchparam);
			} else {
				this.$refs.table.refreshTable();
			}
		},
	}
};
</script>