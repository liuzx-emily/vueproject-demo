<template>
	<section v-loading.fullscreen.lock="loading">
		<section class="abovelist-search-and-btns">
			<section class="btns-box">
				<x-button v-permission:role="1" @click="openDial_main(1)">新增</x-button>
			</section>
		</section>
		<gc-treetable :data="treeTableData" :controlColumn="treeTableProps.controlColumn" :expandAll="treeTableProps.expandAll">
			<el-table-column prop="description" label="备注" width="250px"></el-table-column>
			<el-table-column label="操作" width="250px">
				<template slot-scope="scope">
					<x-button v-permission:role="2" @click="openDial_main(2,scope.row)">编辑</x-button>
					<x-button v-permission:role="3" @click="openDial_main(3,scope.row)">查看</x-button>
					<x-button v-permission:role="4" @click="openConfirm_delete(1,scope.row)" color="red">删除</x-button>
				</template>
			</el-table-column>
		</gc-treetable>
		<!-- 弹窗：主 -->
		<dialogMain :refreshFunc="refreshData" :parentData="treeTableData" ref="dialogMain"></dialogMain>
	</section>
</template>
<script>
import dialogMain from './dialogMain.vue'
export default {
	components: { dialogMain, },
	data() {
		return {
			loading: false,
			treeTableProps: {
				controlColumn: { label: "名称", prop: "name", width: "" },
				expandAll: true,
			},
			treeTableData: [],
		}
	},
	computed: {},
	mounted() {
		this.refreshData();
	},
	methods: {
		refreshData() {
			this.loading = true;
			this.xaxios({
				url: "/api/role/list.do",
			}).then(res => {
				let data = this._.cloneDeep(res.data);
				this.treeTableData = this.xtools.arrayToTree(data, {
					id: "id",
					parentId: "parentId",
					children: "child"
				});
				this.loading = false;
			});
		},
		// 打开弹窗：主弹窗
		openDial_main(type, data) {
			data = data || {};
			this.$refs.dialogMain.openDial(type, data.id);
		},
		// 打开询问框：删除
		openConfirm_delete(type, data) {
			let ids = [];
			if (type == 1) {
				// 单个
				ids = [data.id];
			} else if (type == 2) {
				// 批量
			}
			this.xtools.openConfirm_delete({
				url: "/api/role/delete.do",
				data: { ids },
				refreshFunc: this.refreshData,
			});
		}
	}
};
</script>