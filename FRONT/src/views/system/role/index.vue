<template>
	<section v-loading="loading">
		<section class="abovelist-search-and-btns">
			<section class="btns-box">
				<x-button v-permission="'role:add'" @click="openDial_main(1)" icon="plus">新增</x-button>
			</section>
		</section>
		<section>
			<x-table :refresh="srefresh" :enablePaging="true" ref="table"  default-expand-all>
				<el-table-column prop="name" label="角色名称"></el-table-column>
				<el-table-column prop="description" label="备注" width="250px"></el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<x-button v-permission="'role:edit'" @click="openDial_main(2,scope.row)" title="编辑" icon="pencil"></x-button>
						<x-button v-permission="'role:detail'" @click="openDial_main(3,scope.row)" title="查看" icon="eye"></x-button>
						<x-button v-permission="'role:delete'" @click="openConfirm_delete(scope.row)" title="删除" icon="trash" color="red"></x-button>
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
					url: '/api/role/list.do',
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
				url: "/api/role/delete.do",
					data: { ids: ids },
					refreshFunc: this.refreshTable,
					comfirmMessage: `您确认要删除角色吗？`
				});
			},
		}
	};
</script>