<style scoped></style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <section class="search-condition">
            <section class="search-btn-box">
                <el-button v-permission:user="1" type="primary" @click="openDial_main(1)">新增</el-button>
                <el-button v-permission:user="4" type="danger" @click="openConfirm_delete(2)">批量删除</el-button>
            </section>
        </section>
        <section>
            <xTable :refresh="refresh" ref="table">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="username" label="帐号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="roleName" label="角色"> </el-table-column>
                <el-table-column prop="deptName" label="部门"> </el-table-column>
                <el-table-column prop="phone" label="电话"> </el-table-column>
                <el-table-column prop="email" label="邮箱"> </el-table-column>
                <el-table-column label="操作" width="280px">
                    <template slot-scope="scope">
                        <el-button v-permission:user="2" class="size-small" type="warning" @click="openDial_main(2,scope.row)">编辑</el-button>
                        <el-button v-permission:user="3" class="size-small" type="success" @click="openDial_main(3,scope.row)">查看</el-button>
                        <el-button v-permission:user="2" class="size-small" type="primary" @click="openConfirm_resetPW(scope.row)">重置密码</el-button>
                        <el-button v-permission:user="4" class="size-small" type="danger" @click="openConfirm_delete(1,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </xTable>
            <!-- 弹窗：主 -->
            <dialogMain :deptId="deptId" :refreshFunc="refreshTable_pageOne" :deptTreeData="deptTreeData" ref="dialogMain"></dialogMain>
        </section>
    </section>
</template>
<script>
import dialogMain from './dialogMain.vue'
export default {
    props: ["deptId", "deptTreeData", ],
    components: { dialogMain, },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        DEFAULT_PASSWORD(){return window.DEFAULT_PASSWORD},
    },
    watch: {
        deptId: {
            immediate: true,
            handler() {
                // 因为监听deptId时设置了immediate为true，所以第一次调用时HTML结构还没有渲染出来。
                if (this.$refs.table) {
                    this.refreshTable_pageOne();
                }
            }
        }
    },
    created() {},
    mounted() {
        this.refreshTable_pageOne();
    },
    methods: {
        // ----------------------------- 用户表格（子组件相关） -----------------------------
        // 传给子组件用的
        refresh(param, self) {
            param.deptId = this.deptId;
            // 获取表格数据
            self.loading = true;
            self.xAxios({
                method: 'get',
                url: BASE_PATH + "/user/list.do",
                params: param
            }).then((response) => {
                const res = response.data;
                // 数据格式化
                self.tableData = this._.map(res.data, (item) => {
                    return item;
                });
                self.count = res.count;
                self.loading = false;
            })
        },
        // 刷新表格（跳回第一页）
        refreshTable_pageOne() {
            this.$refs.table.pageNum = 1;
            this.$refs.table.refreshTable();
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
                url: '/user/delete.do',
                refreshFunc: this.refreshTable_pageOne,
                context: this,
            });
        },
        // 打开"重置密码"询问框，确认后重置
        openConfirm_resetPW(data) {
            this.$confirm(`您确认要重置密码吗？（初始密码为：${this.DEFAULT_PASSWORD}）`, '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = {
                    id: data.id,
                    password: this.DEFAULT_PASSWORD
                };
                this.loading = true;
                this.xAxios({
                    method: 'post',
                    url: BASE_PATH + '/user/revert.htmls',
                    params: param
                }).then((response) => {
                    const res = response.data;
                    if (res.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '重置密码成功！'
                        });
                    }
                    this.loading = false;
                })
            }).catch();
        },
    }
};
</script>