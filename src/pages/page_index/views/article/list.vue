<template>
    <section>
        <section class="search-condition-container">
            <div class="box-wa">
                <span class="text">
                    标题：
                </span>
                <el-input v-model.trim="fakesearchparam.title"></el-input>
            </div>
            <div class="box-wa">
                <span class="text">
                    发布时间：
                </span>
                <el-date-picker v-model="fakesearchparam.startTime" type="date" value-format="timestamp" style="width:140px;">
                </el-date-picker>
                至
                <el-date-picker v-model="fakesearchparam.endTime_unformatted" type="date" value-format="yyyy-MM-dd" style="width:140px;">
                </el-date-picker>
            </div>
            <section class="box-btns">
                <el-button size="small" type="warning" @click="doSearch">搜索</el-button>
                <el-button size="small" type="primary" @click="do_add" v-if="checkBtn('add')">新增</el-button>
            </section>
        </section>
        <xTable :refresh="refresh" :searchparam="searchparam" ref="table">
            <el-table-column prop="num" label="序号" width="50px"></el-table-column>
            <el-table-column label="标题">
                <template slot-scope="scope">
                    <!-- 是否置顶 -->
                    <template v-if="scope.row.roofPlacement==1">
                        <span style="color:red">[置顶]</span>
                    </template>
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="catalog" label="栏目" width="100px"></el-table-column> -->
            <el-table-column prop="publisher" label="发布人" width="120px"></el-table-column>
            <el-table-column prop="timeText" label="发布时间" width="150px"> </el-table-column>
            <el-table-column prop="auditText" label="状态" width="120px"> </el-table-column>
            <el-table-column label="操作" width="320px">
                <template slot-scope="scope">
                    <el-button class="tinyBtn" v-if="checkBtn('edit')&&scope.row.btnFlag_edit" type="warning" @click="do_edit(scope.row)">编辑</el-button>
                    <el-button class="tinyBtn" v-if="checkBtn('look')&&scope.row.btnFlag_look" type="success" @click="do_look(scope.row)">查看</el-button>
                    <template v-if="checkBtn('topping')&&scope.row.btnFlag_topping">
                        <el-button class="tinyBtn" v-if="scope.row.roofPlacement==1" @click="do_topping(scope.row,0)">取消置顶</el-button>
                        <el-button class="tinyBtn" v-else @click="do_topping(scope.row,1)">置顶</el-button>
                    </template>
                    <el-button class="tinyBtn" v-if="checkBtn('audit')&&scope.row.btnFlag_audit" type="primary" @click="do_audit(scope.row)">审核</el-button>
                    <el-button class="tinyBtn" v-if="checkBtn('delete')&&scope.row.btnFlag_delete" type="danger" @click="do_delete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </xTable>
    </section>
</template>
<script>
import _ from 'lodash'
import xTools from '~/utils/xTools.js'
import xTable from '~/components/xTable/index.vue'
export default {
    components: { xTable },
    props: [],
    data() {
        return {
            // 表格参数
            fakesearchparam: {
                title: null,
                startTime: null,
                endTime_unformatted: null,
            },
            searchparam: {
                title: null,
                startTime: null,
                endTime: null,
            },
        };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.refreshTable_pageOne();
    },
    methods: {
        // 检查按钮权限
        checkBtn(code) {
            // var btnPermmisionCheck = xTools.checkBtn(this.$store, 'servicePolicy:btn:' + code);
            // return btnPermmisionCheck;
            return true;
        },
        // ------------------------------ 表格 ------------------------------
        // 传给子组件用的
        refresh(param, self) {
            // 获取表格数据
            self.loading = true;
            self.xAxios({
                method: 'get',
                url: BASE_PATH + "/article/list.htmls",
                params: param
            }).then((response) => {
                const res = response.data;
                // 数据格式化
                self.tableData = _.map(res.data, (item) => {
                    // 发布时间
                    item.timeText = xTools.formatDate(item.time);
                    // 审核文本
                    item.auditText = {
                        0: "待审核",
                        1: "审核通过",
                        2: "审核不通过",
                        3: "未提交"
                    } [item.audit];
                    // ---------------------------- 操作 ----------------------------
                    item.btnFlag_edit = false;
                    item.btnFlag_look = false;
                    item.btnFlag_topping = false;
                    item.btnFlag_audit = false;
                    item.btnFlag_delete = false;
                    // 编辑
                    if (item.audit == 2 || item.audit == 3) {
                        item.btnFlag_edit = true;
                    }
                    // 查看
                    item.btnFlag_look = true;
                    // 置顶
                    if (item.audit == 1) {
                        item.btnFlag_topping = true;
                    }
                    // 审核
                    if (item.audit == 0) {
                        item.btnFlag_audit = true;
                    }
                    // 删除
                    item.btnFlag_delete = true;
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
            this.$router.push({
                name: 'articleDetail',
                params: {
                    // 1新增 2编辑 3查看 4审核
                    mode: "1",
                    id: "0",
                }
            });
        },
        do_edit(data) {
            this.$router.push({
                name: 'articleDetail',
                params: {
                    // 1新增 2编辑 3查看 4审核
                    mode: "2",
                    id: data.id,
                }
            });
        },
        do_look(data) {
            this.$router.push({
                name: 'articleDetail',
                params: {
                    // 1新增 2编辑 3查看 4审核
                    mode: "3",
                    id: data.id,
                }
            });
        },
        do_audit(data) {
            this.$router.push({
                name: 'articleDetail',
                params: {
                    // 1新增 2编辑 3查看 4审核
                    mode: "4",
                    id: data.id,
                }
            });
        },
        do_topping(data, roof) {
            this.xAxios({
                method: 'post',
                url: BASE_PATH + '/article/top.htmls',
                data: {
                    "id": data.id,
                    "roof": roof
                }
            }).then((response) => {
                const res = response.data;
                if (res.code == 1) {
                    this.$message({
                        type: 'success',
                        message: '操作成功！'
                    });
                    // 刷新
                    this.refreshTable_pageOne();
                }
            }).catch(error => {});
        },
        do_delete(data) {
            this.$confirm('删除后不可恢复，您确认要删除吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.xAxios({
                    method: 'post',
                    url: BASE_PATH + '/article/delete.htmls',
                    params: {
                        id: data.id
                    }
                }).then((response) => {
                    const res = response.data;
                    if (res.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                        // 刷新
                        this.refreshTable_pageOne();
                    }
                }).catch(error => {});
            }).catch(error => {});
        }
    }
};
</script>