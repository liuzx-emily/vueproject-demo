<template>
	<section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
		<section class="search-condition">
			<section class="box">
				<span class="search-label">标题</span>
				<span class="search-input">
					<el-input v-model.trim="searchparam.title"></el-input>
				</span>
			</section>
			<section class="box">
				<span class="search-label">发布人</span>
				<span class="search-input">
					<el-input v-model.trim="searchparam.publisher"></el-input>
				</span>
			</section>
			<section class="box">
				<span class="search-label">年份</span>
				<span class="search-input">
					<pickYear :fyear.sync="searchparam.year" :cannotBeFuture="true" />
				</span>
			</section>
			<section class="box">
				<span class="search-label">日期范围</span>
				<span class="search-input">
					<pickDateRange :fstartTime.sync="searchparam.startTime" :fendTime.sync="searchparam.endTime" :cannotBeFuture="false" />
				</span>
			</section>
			<section class="box">
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
			<section class="search-btn-box">
				<el-button type="warning" @click="do_search">搜索</el-button>
				<el-button v-permission:article="1" type="primary" @click="toDetailPage(1)">新增</el-button>
			</section>
		</section>
		<xTable :refresh="srefresh" ref="table">
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
					<el-button v-permission:article="2" v-if="scope.row.state==1||scope.row.state==4" class="size-small" type="warning" @click="toDetailPage(2,scope.row)">编辑</el-button>
					<el-button v-permission:article="3" class="size-small" type="success" @click="toDetailPage(3,scope.row)">查看</el-button>
					<el-button v-permission:article="'audit'" v-if="scope.row.state==2" class="size-small" type="primary" @click="toDetailPage(4,scope.row)">审核</el-button>
					<el-button v-permission:article="4" v-if="scope.row.state==1||scope.row.state==4" class="size-small" type="danger" @click="openConfirm_delete(1,scope.row)">删除</el-button>
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
		this.refreshTable({
			refreshSearchParam: true,
			// goToPageN: true,
			// pageN: 2
		});
	},
	methods: {
		// ------------------------------ 表格 ------------------------------
		// 传给子组件用的
		srefresh(param, self) {
			// 获取表格数据
			self.loading = true;
			self.xAxios({
				method: 'get',
				url: BASE_PATH + "/article/list.do",
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
		// 刷新表格（默认是沿用之前的搜索参数，跳转回第一页刷新）
		refreshTable(param) {
			let new_searchparam = undefined;
			// refreshSearchParam 有新的搜索参数
			if (param && param.refreshSearchParam) {
				new_searchparam = this._.cloneDeep(this.searchparam);
			}
			// goToPageN 前往指定页
			if (param && param.goToPageN && param.pageN) {
				this.$refs.table.pageNum = param.pageN;
			} else {
				// 不然的话返回第一页
				this.$refs.table.pageNum = 1;
			}
			this.$refs.table.refreshTable(new_searchparam);
		},
		// 搜索
		do_search(param) {
			this.refreshTable({ refreshSearchParam: true });
		},
		// 跳转到详情页
		toDetailPage(mode, data) {
			// mode  1新增 2编辑 3查看 4审核
			let id = (mode == 1) ? 0 : data.id;
			this.$router.push({
				name: 'articleDetail',
				params: { mode: mode, id: id, },
			});
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
				url: '/article/delete.do',
				data: { ids: ids },
				refreshFunc: this.refreshTable,
			});
		},
	}
};
</script>