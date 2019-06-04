<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-card>
            <div>
                <p>1 内置loading，在 <code>refresh</code> 方法中自动切换 </p>
                <p>2 分页功能默认开启：<code>enablePaging</code>，内置分页参数：page row （page从1开始）</p>
                <p>3 多选功能默认关闭：<code>enableCheckbox</code>。使用<code>getSelection</code> 方法获取选中行数据。 </p>
                <p>4 内置后端排序，参数为：sort order，组件内部已经绑定了排序函数，只需要给排序的列添加
                    <code>sortable="custom"</code>。
                    <br>
                    使用<code>defaultsort</code>来传递初始排序参数
                </p>
                <p>5 如果搜索参数有初始值，一定要在 fakesearchparam 和 searchparam 中都赋值。</p>
            </div>
        </el-card>
        <section class="search-condition">
            <section class="box">
                <span class="search-label">名称：</span>
                <span class="search-input">
                    <el-input v-model.trim="fakesearchparam.name"></el-input>
                </span>
            </section>
            <section class="box">
                <span class="search-label">下拉框：</span>
                <span class="search-input">
                    <el-select v-model="fakesearchparam.select1">
                        <el-option label="全部" :value="-1"></el-option>
                        <el-option label="值1" :value="1"></el-option>
                        <el-option label="值2" :value="2"></el-option>
                    </el-select>
                </span>
            </section>
            <section class="box">
                <span class="search-label">日期：</span>
                <span class="search-input">
                    <pickDateRange :fstartTime.sync="fakesearchparam.startTime" :fendTime.sync="fakesearchparam.endTime" :cannotBeFuture="true" />
                </span>
            </section>
            <section class="box">
                <span class="search-label">年份：</span>
                <span class="search-input">
                    <pickYear :fyear.sync="fakesearchparam.year" :cannotBeFuture="true" />
                </span>
            </section>
            <section class="search-btn-box">
                <el-button type="primary" @click="do_search">搜索</el-button>
            </section>
        </section>
        <xTable :refresh="refresh" :searchparam="searchparam" ref="table" :defaultsort="xTableProps.defaultsort" :enableCheckbox="xTableProps.enableCheckbox" :enablePaging="xTableProps.enablePaging">
            <el-table-column prop="name" sortable="custom">
                <template slot="header">
                    <span style="display:block;color:#00bcd4;">自定义表头喔~</span>
                    <span>这一列的label就用不到了</span>
                </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" sortable="custom">
                <template slot-scope="scope">
                    <span v-if="scope.row.gender==1">男</span>
                    <span v-if="scope.row.gender==2">女</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="日期" width="120px">
                <template slot-scope="scope">
                    {{xTools.formatDate(scope.row.time)}}
                </template>
            </el-table-column>
        </xTable>
    </section>
</template>
<script>
export default {
    components: {},
    data() {
        let year = new Date().getFullYear();
        return {
            loading: false,
            // 表格参数
            // 如果搜索参数有初始值，一定要在 fakesearchparam 和 searchparam 中都赋值
            fakesearchparam: {
                name: "",
                select1: -1,
                startTime: "",
                endTime: "",
                year: year,
            },
            searchparam: {
                name: "",
                select1: -1,
                startTime: "",
                endTime: "",
                year: year,
            },
            xTableProps: {
                // 后端排序，默认参数
                defaultsort: { sort: "name", order: "asc" },
                // 是否开启多选
                enableCheckbox: true,
                // 是否有分页
                enablePaging: true,
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
            console.log(param);
            // 获取表格数据
            self.loading = true;
            self.xAxios({
                method: "get",
                url: BASE_PATH + "/example/xTable.htmls",
                params: param
            }).then(response => {
                const res = response.data;
                // 数据格式化
                self.tableData = this._.map(res.data, item => {
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
        do_search() {
            this.searchparam.name = this.fakesearchparam.name;
            this.searchparam.select1 = this.fakesearchparam.select1;
            // 日期范围选择
            this.searchparam.startTime = this.fakesearchparam.startTime;
            this.searchparam.endTime = this.fakesearchparam.endTime;
            // 年份
            this.searchparam.year = this.fakesearchparam.year;
            // 刷新表格（跳回第一页）
            this.refreshTable_pageOne();
        },
    }
};
</script>