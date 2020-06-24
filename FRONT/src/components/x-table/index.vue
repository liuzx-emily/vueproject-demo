<template>
	<section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
		<el-table :data="tableData" @selection-change="handleSelectionChange" @sort-change="sortChange" class="xTableStyle" :class="styleClassList" v-bind="$attrs">
			<el-table-column type="selection" v-if="enableCheckbox"></el-table-column>
			<slot></slot>
		</el-table>
		<template v-if="enablePaging">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :total="count" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, slot" style="margin-top:5px;"></el-pagination>
		</template>
	</section>
</template>
<script>
	export default {
		install(Vue) {
			Vue.component("x-table", this);
		},
		props: {
			refresh: Function,
			// 是否开启分页功能
			enablePaging: {
				default: true
			},
			// 是否添加多选列
			enableCheckbox: {
				default: false
			},
			defaultsort: {
				default: () => { return { sort: "", order: "" } }
			},
			color: {
				type: String,
				default: "common"
			},
			size: {
				type: String,
				default: "common"
			},
			align: {
				type: String,
				default: "left"
			},
		},
		watch: {},
		computed: {
			styleClassList() {
				return ["color-" + this.color, "size-" + this.size, "align-" + this.align];
			},
		},
		data() {
			let param = {
				loading: false,
				tableSelection: [],
				sort: this.defaultsort.sort,
				order: this.defaultsort.order,
				searchparam: {},
				tableData: [],
				count: 0
			};
			if (this.enablePaging) {
				param.pageSizes = [10, 20, 50, 100, 500];
				param.pageNum = 1;
				param.pageSize = 10;
			}
			return param;
		},
		methods: {
			refreshTable(searchparam) {
				if (searchparam) {
					this.searchparam = this._.cloneDeep(searchparam);
				}
				let param = this._.cloneDeep(this.searchparam);
				if (this.enablePaging) {
					param.page = this.pageNum;
					param.row = this.pageSize;
				}
				param.sortField = this.sort;
				param.sortOrder = this.order;
				this.refresh(param, this);
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.pageNum = 1;
				this.refreshTable();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.refreshTable();
			},
			sortChange(param) {
				if (param.order == 'ascending') {
					this.sort = param.prop;
					this.order = "asc";
				} else if (param.order == 'descending') {
					this.sort = param.prop;
					this.order = "desc";
				} else if (param.order == null) {
					this.sort = "";
					this.order = "";
				}
				this.pageNum = 1;
				this.refreshTable();
			},
			handleSelectionChange(selections) {
				this.tableSelection = selections;
			},
			getSelection() {
				return this.tableSelection;
			}
		}
	};
</script>