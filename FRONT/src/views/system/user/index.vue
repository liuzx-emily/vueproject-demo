<style lang="scss" scoped>
	.view-user {
		height: 100%;
		display: flex;
		.view-user-left {
			flex: 0 0 300px;
		}
		.view-user-right {
			flex: 1 1 calc(100% - 300px);
		}
	}
</style>
<template>
	<section v-loading="loading" class="view-user">
		<section class="view-user-left">
			<el-tree :data="leftTreeData" node-key="id" :props="{label:'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" :check-strictly="true" ref="tree" @node-click="nodeClick"></el-tree>
		</section>
		<section class="view-user-right">
			<section class="abovelist-search-and-btns">
				<x-searcharea :searchparam="searchparam" :searchAreaList="searchAreaList"></x-searcharea>
				<section class="btns-box">
					<x-button @click="do_search" icon="search">查询</x-button>
					<x-button v-permission="'user:add'" @click="openDial_main(1)" icon="plus">新增</x-button>
					<x-button v-permission="'user:delete'" @click="openConfirm_delete()" color="red" icon="trash">删除</x-button>
				</section>
			</section>
			<section>
				<x-table :refresh="srefresh" :enableCheckbox="true" ref="table" row-key="id" default-expand-all>
					<el-table-column prop="username" label="帐号"></el-table-column>
					<el-table-column prop="name" label="姓名"></el-table-column>
					<el-table-column prop="roleName" label="角色"></el-table-column>
					<el-table-column prop="deptName" label="部门"></el-table-column>
					<el-table-column prop="phone" label="电话"></el-table-column>
					<el-table-column prop="email" label="邮箱"></el-table-column>
					<el-table-column label="操作" width="280px">
						<template v-slot="scope">
							<x-button v-permission="'user:edit'" @click="openDial_main(2,scope.row)" title="编辑" icon="pencil"></x-button>
							<x-button v-permission="'user:detail'" @click="openDial_main(3,scope.row)" title="查看" icon="eye"></x-button>
							<x-button v-permission="'user:resetpw'" @click="openConfirm_resetPassword(scope.row)">重置密码</x-button>
							<x-button v-permission="'user:delete'" @click="openConfirm_delete(scope.row)" title="删除" icon="trash" color="red"></x-button>
						</template>
					</el-table-column>
				</x-table>
			</section>
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
				orgId: "",
				leftTreeData: [],
				searchparam: {
					username: '',
					name: '',
				},
				searchAreaList: [
					{ label: '帐号', prop: 'username' },
					{ label: '姓名', prop: 'name' },
				],
			};
		},
		watch: {
			orgId() {
				this.refreshTable(true);
			}
		},
		mounted() {
			this.refreshLeftTreeData();
		},
		methods: {
			refreshLeftTreeData() {
				this.loading = true;
				this.xaxios({
					url: "/api/dept/list.do",
				}).then(res => {
					let data = this._.cloneDeep(res.data);
					this.leftTreeData = this.xtools.arrayToTree(data, {
						id: "id",
						parentId: "parentId",
						children: "child"
					});
					// 选中第一个节点
					if (this.leftTreeData && this.leftTreeData.length > 0) {
						this.$nextTick(() => {
							this.orgId = this.leftTreeData[0].id;
							this.$refs.tree.setCurrentKey(this.orgId);
						});
					}
					this.loading = false;
				});
			},
			nodeClick() {
				this.orgId = this.$refs.tree.getCurrentNode().id;
			},
			srefresh(param, self) {
				param.deptId = this.orgId;
				self.loading = true;
				self.xaxios({
					url: '/api/user/list.do',
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
			refreshTable(refreshSearchParam) {
				this.$refs.table.pageNum = 1;
				this.$refs.table.refreshTable(refreshSearchParam ? this.searchparam : undefined);
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
					url: '/api/user/delete.do',
					data: { ids: ids },
					refreshFunc: this.refreshTable,
					comfirmMessage: `您确认要删除用户吗？`
				});
			},
			openConfirm_resetPassword(data) {
				const confirmFunc = () => {
					let param = {
						id: data.id,
						password: this.$store.state.user.DEFAULT_PASSWORD
					};
					this.loading = true;
					this.xaxios({
						method: 'post',
						url: "/api/user/resetPassword.do",
						data: param
					}).then(res => {
						if (res.code == 1) {
							this.$message({
								type: 'success',
								message: '重置密码成功！'
							});
						}
						this.loading = false;
					})
				};
				this.xcommons.openConfirm({ confirmFunc, msg: `您确认要重置密码吗？（初始密码为：${this.$store.state.user.DEFAULT_PASSWORD}）` });
			},
		}
	};
</script>