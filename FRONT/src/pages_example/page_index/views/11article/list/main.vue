<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
        <section class="search-condition">
            <div class="box">
                <span class="search-label">
                    标题：
                </span>
                <span class="search-input">
                    <el-input v-model.trim="fakesearchparam.title"></el-input>
                </span>
            </div>
            <section class="box">
                <span class="search-label">日期范围：</span>
                <span class="search-input">
                    <pickDateRange :fstartTime.sync="fakesearchparam.startTime" :fendTime.sync="fakesearchparam.endTime" :cannotBeFuture="false" />
                </span>
            </section>
            <section class="search-btn-box">
                <el-button type="warning" @click="doSearch">搜索</el-button>
                <el-button v-permission:article="1" type="primary" @click="toDetailPage(1)">新增</el-button>
            </section>
        </section>
        <xTable :refresh="refresh" :searchparam="searchparam" ref="table">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="publisher" label="发布人" width="120px"></el-table-column>
            <el-table-column prop="publishTime" label="发布时间" width="150px">
                <template slot-scope="scope">
                    {{xTools.formatDate(scope.row.publishTime)}}
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
            fakesearchparam: {
                title: "",
                startTime: "",
                endTime: "",
            },
            searchparam: {
                title: "",
                startTime: "",
                endTime: "",
            },
        };
    },
    mounted() {
        this.refreshTable_pageOne();
    },
    methods: {
        // ------------------------------ 表格 ------------------------------
        // 传给子组件用的
        refresh(param, self) {
            // 获取表格数据
            self.loading = true;
            self.xAxios({
                method: 'get',
                url: BASE_PATH + "/article/list.do",
                params: param
            }).then((response) => {
                const res = response.data;
                // 数据格式化
                self.tableData = this._.map(res.data, (item) => {
                    return item;
                });
                self.count = res.count;
                self.loading = false;
            }).catch(error => {
                self.loading = false;
            });
        },
        // 刷新表格（跳回第一页）
        refreshTable_pageOne() {
            this.$refs.table.pageNum = 1;
            this.$refs.table.refreshTable();
        },
        // 搜索
        doSearch() {
            this.searchparam.title = this.fakesearchparam.title;
            this.searchparam.startTime = this.fakesearchparam.startTime;
            this.searchparam.endTime = this.fakesearchparam.endTime;
            this.refreshTable_pageOne();
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
            this.xTools.openConfirm({
                ids: ids,
                url: '/article/delete.do',
                refreshFunc: this.refreshTable_pageOne,
                context: this,
            });
        },
    }
};
</script>