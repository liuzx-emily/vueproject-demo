<template>
	<section v-loading.fullscreen.lock="loading">
		<section class="abovelist-search-and-btns">
			<section class="search-box">
				<span class="search-label">标题</span>
				<span class="search-input">
					<el-input v-model.trim="searchparam.title"></el-input>
				</span>
			</section>
			<section class="search-box">
				<span class="search-label">发布人</span>
				<span class="search-input">
					<el-input v-model.trim="searchparam.publisher"></el-input>
				</span>
			</section>
			<section class="search-box">
				<span class="search-label">年份</span>
				<span class="search-input">
					<gc-form-item-pickyear :fyear.sync="searchparam.year" :cannotBeFuture="true" />
				</span>
			</section>
			<section class="search-box">
				<span class="search-label">日期范围</span>
				<span class="search-input">
					<gc-form-item-pickdaterange :fstartTime.sync="searchparam.startTime" :fendTime.sync="searchparam.endTime" :cannotBeFuture="false" />
				</span>
			</section>
			<section class="search-box">
				<span class="search-label">状态</span>
				<span class="search-input">
					<el-select v-model="searchparam.state">
						<el-option label="全部" value="-1"></el-option>
						<el-option label="未提交" value="1"></el-option>
						<el-option label="待审核" value="2"></el-option>
						<el-option label="审核通过" value="3"></el-option>
						<el-option label="审核不通过" value="4"></el-option>
					</el-select>
				</span>
			</section>
			<section class="btns-box">
				<x-button @click="do_search">搜索</x-button>
				<x-button v-permission:article="1" @click="openDial_main(1)">新增</x-button>
			</section>
		</section>
		<gc-table :refresh="srefresh" ref="table">
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
					<x-button v-permission:article="2" v-if="scope.row.state==1||scope.row.state==4" @click="openDial_main(2,scope.row)">编辑</x-button>
					<x-button v-permission:article="3" @click="openDial_main(3,scope.row)">查看</x-button>
					<x-button v-permission:article="'audit'" v-if="scope.row.state==2" @click="openDial_main(4,scope.row)">审核</x-button>
					<x-button v-permission:article="4" v-if="scope.row.state==1||scope.row.state==4" @click="openConfirm_delete(1,scope.row)" color="red">删除</x-button>
				</template>
			</el-table-column>
		</gc-table>

		<dialogMain :refreshFunc="refreshTable" ref="dialogMain"></dialogMain>
	</section>
</template>
<script>
import dialogMain from './dialogMain'
export default {
	components: { dialogMain },
	data() {
		return {
			loading: false,
			searchparam: {
				title: "",
				publisher: "",
				state: "",
				startTime: "",
				endTime: "",
				year: new Date().getFullYear()
			},
		};
	},
	mounted() {
		this.refreshTable(true);
	},
	methods: {
		// ------------------------------ 表格 ------------------------------
		// 传给子组件用的
		srefresh(param, self) {
			// 获取表格数据
			self.loading = true;
			self.xaxios({
				url: "/api/article/list.do",
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
		// 刷新表格
		refreshTable(refreshSearchParam) {
			if (refreshSearchParam) {
				let new_searchparam = this._.cloneDeep(this.searchparam);
				this.$refs.table.refreshTable(new_searchparam);
			} else {
				this.$refs.table.refreshTable();
			}
		},
		// 搜索
		do_search() {
			this.refreshTable(true);
		},
		// 跳转到详情页
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
				ids = this._.map(this.$refs.table.tableSelection, "id");
				// ids = this.$refs.tree.getCheckedKeys();
				if (ids.length == 0) {
					this.$message({
						type: 'error',
						message: '请先勾选数据！'
					});
					return false;
				}
			}
			this.xtools.openConfirm_delete({
				url: "/api/article/delete.do",
				data: { ids: ids },
				refreshFunc: this.refreshTable,
			});
		},
	}
};
</script>