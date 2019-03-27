<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <!-- 表格 -->
        <el-table :data="tableData" :searchparam="searchparam" @selection-change="handleSelectionChange" @sort-change="sortChange" :class="[tableClassColor,tableClassSize,tableClassAlign]">
            <!-- 多选列 -->
            <el-table-column type="selection" v-if="enableCheckbox"></el-table-column>
            <slot></slot>
        </el-table>
        <!-- 分页 -->
        <template v-if="enablePaging">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :total="count" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next" style="margin-top:5px;">
            </el-pagination>
        </template>
    </section>
</template>
<script>
export default {
    props: {
        refresh: Function,
        // 是否添加多选列
        enableCheckbox: {
            default: false
        },
        // 是否开启分页功能
        enablePaging: {
            default: true
        },
        // 搜索字段
        searchparam: {
            default: () => { return {}; }
        },
        // 默认排序
        defaultsort: {
            default: () => { return { sort: "", order: "" } }
        },
        // ------------ 样式class -------------------
        tableClassColor: {
            type: String,
            default: "color-common"
        },
        tableClassSize: {
            type: String,
            default: "size-common"
        },
        tableClassAlign: {
            type: String,
            default: "align-common"
        },
    },
    data() {
        return {
            loading: false,
            // -------------------------------- 表格数据 --------------------------------
            // 每页多少条，备选值
            pageSizes: [10, 20, 50, 100, 500],
            // 表格多选的值
            tableSelection: [],
            // -------------------------------- 表格参数 --------------------------------
            // 当前第几页（从1开始计数）
            pageNum: 1,
            // 每页多少条
            pageSize: this.enablePaging ? 10 : 999999999,
            // 排序字段
            sort: this.defaultsort.sort,
            // 排序方式
            order: this.defaultsort.order,
            // ----------------------------- ajax获取的数据 -----------------------------
            // 表格数据
            tableData: [],
            // 总条数
            count: 0
        }
    },
    methods: {
        // ------------------------------ 刷新表格数据 ------------------------------
        refreshTable() {
            // 其他的搜索参数
            let param = _.cloneDeep(this.searchparam);
            // 分页、排序参数
            param.page = this.pageNum;
            param.row = this.pageSize;
            param.sort = this.sort;
            param.order = this.order;
            // 调用父组件传来的 refresh 方法
            this.refresh(param, this);
        },
        // 表格分页：每页的条数变化
        handleSizeChange(val) {
            this.pageSize = val;
            // 跳回第一页
            this.pageNum = 1;
            this.refreshTable();
        },
        // 表格分页：跳页
        handleCurrentChange(val) {
            this.pageNum = val;
            this.refreshTable();
        },
        // -------------------------------- 表格 --------------------------------
        // 点击表头排序
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
            // 跳回第一页
            this.pageNum = 1;
            this.refreshTable();
        },
        // 表格的checkbox，有变化时触发
        handleSelectionChange(selections) {
            this.tableSelection = selections;
        },
        // 获取selection
        getSelection() {
            return this.tableSelection;
        }
    }
};
</script>