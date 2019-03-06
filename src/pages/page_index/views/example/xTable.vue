<style lang="scss" scoped>
.el-card {
    width: 90%;
    margin: 0 auto 10px;
}
</style>
<template>
    <section>
        <el-card>
            <div slot="header" class="clearfix">
                <span>组件使用说明</span>
            </div>
            <div>
                <p>1 内置loading，在<code>refresh</code> 方法中自动切换</p>
                <p>2 内置分页参数：page row</p>
                <p>3 内置后端排序，参数为：sort order，组件内部已经绑定了排序函数，只需要给排序的列添加<code>sortable="custom"</code>。默认排序参数使用<code>defaultsort</code>来传递（这是xTable组件封装的属性，不是el-table提供的）</p>
                <p>4 内置多选功能：传递<code>:enableCheckbox="true"</code>。使用<code>getSelection</code> 方法获取选中行数据</p>
                <p>5 如果需要关闭分页功能，传递<code>:enablePaging="false"</code></p>
            </div>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <span>el-table使用经验</span>
            </div>
            <div>
                <p>1 表头强制换行：使用header插槽，见"面积"这一列</p>
                <p>2 如果排序字段和渲染字段不一致怎么办？见"名字"这一列</p>
            </div>
        </el-card>
        <section class="search-condition-container">
            <section class="box-wa">
                <span class="text">名称：</span>
                <el-input v-model.trim="fakesearchparam.name"></el-input>
            </section>
            <section class="box-wa">
                <span class="text">数字：</span>
                <el-input v-model.trim="fakesearchparam.number"></el-input>
            </section>
            <section class="box-wa">
                <span class="text">日期：</span>
                <el-date-picker v-model="fakesearchparam.startTime" type="date" value-format="timestamp" style="width:140px;">
                </el-date-picker>
                至
                <el-date-picker v-model="fakesearchparam.endTime_unformatted" type="date" value-format="yyyy-MM-dd" style="width:140px;">
                </el-date-picker>
            </section>
            <section class="box-btns">
                <el-button type="primary" @click="do_search">搜索</el-button>
                <el-button type="success" @click="do_add">新增</el-button>
                <el-button type="danger" @click="do_delete_multiple">批量删除</el-button>
            </section>
        </section>
        <xTable :refresh="refresh" :searchparam="searchparam" ref="table" :defaultsort="defaultsort" :enableCheckbox="true" :enablePaging="false">
            <el-table-column prop="name" label="名称" sortable="custom"></el-table-column>
            <el-table-column prop="name2" label="名字2" sortable="custom">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="number" width="130px">
                <template slot-scope="scope" slot="header">
                    数<br>字
                </template>
            </el-table-column>
            <el-table-column prop="time" label="日期" width="130px"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button class="tinyBtn" type="primary" @click="do_look(scope.row)">查看</el-button>
                    <el-button class="tinyBtn" type="success" @click="do_edit(scope.row)">编辑</el-button>
                    <el-button class="tinyBtn" type="warning" @click="do_audit(scope.row)">审核</el-button>
                    <el-button class="tinyBtn" type="danger" @click="do_delete([scope.row.id])">删除</el-button>
                </template>
            </el-table-column>
        </xTable>
    </section>
</template>
<script>
import xTools from '~/utils/xTools.js'
import xTable from '~/components/xTable/index.vue';
export default {
    components: { xTable },
    data() {
        return {
            // 表格参数
            fakesearchparam: {
                name: "",
                number: "",
                startTime: "",
                endTime_unformatted: "",
            },
            searchparam: {
                name: "",
                number: "",
                startTime: "",
                endTime: "",
            },
            // 后端排序，默认参数
            defaultsort: { sort: "name", order: "asc" }
        }
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
                method: 'get',
                url: BASE_PATH + "/example/xTable.htmls",
                params: param
            }).then((response) => {
                const res = response.data;
                // 数据格式化
                self.tableData = _.map(res.data, (item) => {
                    item.time = xTools.formatDate(item.time, 1);
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
            this.searchparam.number = this.fakesearchparam.number;
            this.searchparam.startTime = this.fakesearchparam.startTime;
            // 处理结束时间的时间戳
            if (this.fakesearchparam.endTime_unformatted) {
                this.searchparam.endTime = new Date(this.fakesearchparam.endTime_unformatted + " 23:59:59").getTime();
            } else {
                this.searchparam.endTime = null;
            }
            // 校验
            if (this.searchparam.startTime && this.searchparam.endTime && this.searchparam.startTime >= this.searchparam.endTime) {
                this.$message({
                    message: '起始时间不能晚于结束时间',
                    type: 'warning',
                    showClose: true,
                });
                return;
            }
            // 刷新表格（跳回第一页）
            this.refreshTable_pageOne();
        },
        do_add() {
            console.log("新增");
        },
        do_edit(data) {
            console.log("编辑",data);
        },
        do_look(data) {
            console.log("查看",data);
        },
        do_audit(data) {
            console.log("审核",data);
        },
        do_delete(ids) {
            this.$confirm('删除后不可恢复，您确认要删除吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log("删除",ids);
                // this.xAxios({
                //     method: 'post',
                //     url: BASE_PATH + '/euq/delete.htmls',
                //     params: {
                //         id: data.id
                //     }
                // }).then((response) => {
                //     const res = response.data;
                //     if (res.code == 1) {
                //         this.$message({
                //             type: 'success',
                //             message: '删除成功！'
                //         });
                //         // 刷新
                //         this.refreshTable_pageOne();
                //     }
                // }).catch(error => {});
            }).catch(error => {});
        },
        do_delete_multiple() {
            var ids = _.map(this.$refs.table.getSelection(), "id");
            if (ids.length > 0) {
                this.do_delete(ids);
            } else {
                this.$message({
                    message: '请先勾选数据！',
                    type: 'warning'
                });
            }
        }
    }
};
</script>