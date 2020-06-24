<style lang="scss" scoped>
	/deep/ .xTableStyle.size-common {
		td {
			color: #444;
			padding: 4px 0;
			.x-button.size-common {
				border: 1px solid transparent;
				background: none;
				padding: 0 6px;
				height: 22px;
				line-height: 22px;
				i.fa {
					transform: scale(0.9);
				}
				.x-button-content {
					margin-left: 4px;
				}
			}
		}
		.showInNavigation {
			border: 1px solid #67ace0;
			padding: 2px 5px;
			color: #3c92d4;
			border-radius: 2px;
		}
		.isExternalLink {
			text-decoration: underline;
			color: #3F51B5;
		}
	}
</style>
<template>
	<section v-loading="loading">
		<section class="abovelist-search-and-btns">
			<section class="btns-box">
				<x-button v-permission="'permission:add'" @click="openDial_main(1)" icon="plus">新增</x-button>
			</section>
		</section>
		<section>
			<x-table :refresh="srefresh" :enablePaging="false" ref="table" row-key="id" default-expand-all>
				<el-table-column prop="name" label="名称"></el-table-column>
				<el-table-column label="类型" width="200px">
					<template slot-scope="scope">
						<template v-if="scope.row.showInNavigation==1">
							<span class="showInNavigation"><i v-if="scope.row.icon" class="fa" :class="scope.row.icon" style="margin-right:6px;"></i>导航</span>
							<span v-if="scope.row.isExternalLink==1">（<span class="isExternalLink">外部链接</span>）</span>
						</template>
					</template>
				</el-table-column>
				<el-table-column prop="code" label="code" width="300px"></el-table-column>
				<el-table-column prop="order" label="排序" width="100px"></el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<x-button v-permission="'permission:edit'" @click="openDial_main(2,scope.row)" title="编辑" icon="pencil">编辑</x-button>
						<x-button v-permission="'permission:delete'" @click="openConfirm_delete(scope.row)" title="删除" icon="trash" color="red">删除</x-button>
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
			};
		},
		mounted() {
			this.refreshTable(true);
		},
		methods: {
			srefresh(param, self) {
				self.loading = true;
				self.xaxios({
					url: '/api/permission/list.do',
					params: param
				}).then(res => {
					if (res.code === 1) {
						self.tableData = this.xtools.arrayToTree(res.data, {
							id: 'id',
							parentId: 'parentId',
							children: 'children'
						})
					} else {
						this.$message({ message: res.message, type: 'error', });
					}
					self.loading = false;
				});
			},
			refreshTable() {
				this.$refs.table.refreshTable();
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
					url: '/api/permission/delete.do',
					data: { ids: ids },
					refreshFunc: this.refreshTable,
					comfirmMessage: `您确认要删除权限吗？`
				});
			},
		}
	};
</script>