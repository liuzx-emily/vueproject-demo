<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <xTable :refresh="refresh" ref="table">
            <el-table-column prop="username" label="帐号"></el-table-column>
            <el-table-column prop="realname" label="姓名"> </el-table-column>
            <el-table-column prop="deptName" label="单位"> </el-table-column>
            <el-table-column prop="phone" label="电话"> </el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button class="tinyBtn" type="primary" @click="openDial(scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </xTable>
        <!-- 审核弹窗 -->
        <el-dialog title="审核" :visible.sync="dialogVisible" width="400px" :modal-append-to-body='false' :close-on-click-modal="false" :close-on-press-escape="false">
            <el-select v-model="dialogData.roleId" style="width:100%">
                <el-option v-for="item in roleData" :label="item.name" :value="item.roleId"></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDial">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
export default {
    name: "user_review",
    components: {},
    data() {
        return {
            dialogVisible: false,
            loading: false,
            roleData: [],
            dialogData: {
                userId: "",
                roleId: "",

            }
        }
    },
    mounted() {
        this.refreshTable_pageOne();
    },
    methods: {
        // 传给子组件用的
        refresh(param, self) {
            // 获取表格数据
            self.loading = true;
            self.xAxios({
                method: 'get',
                url: BASE_PATH + "/user/needReview.htmls",
                params: { deptId: this.deptId }
            }).then((response) => {
                const res = response.data;
                // 数据格式化
                self.tableData = _.map(res.data, (item) => {
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
        // 审核
        openDial(data) {
            this.dialogData.userId = data.userId;
            this.dialogData.roleId = "";
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/role/list.htmls',
                params: { type: data.others }
            }).then((response) => {
                const res = response.data;
                this.roleData = res.data;
                this.dialogVisible = true;
                this.loading = false;
            }).catch(error => {
                this.loading = false;
            });
        },
        saveDial() {
            if (this.dialogData.roleId == "") {
                this.$message({
                    message: '请选择角色！',
                    type: 'error'
                });
                return;
            }
            let param = {
                roleId: this.dialogData.roleId,
                userId: this.dialogData.userId,
                isLocked: 0,
            };
            this.loading = true;
            this.xAxios({
                xJsonData: true,
                data: param,
                url: BASE_PATH + '/user/edit.htmls'
            }).then((response) => {
                const res = response.data;
                if (res.code == 1) {
                    this.$message({
                        message: '审核用户成功！',
                        type: 'success'
                    });
                    // 关闭弹窗
                    this.dialogVisible = false;
                    // 刷新
                    this.refreshTable_pageOne();
                }
                this.loading = false;
            }).catch(error => {});
        }
    }
};
</script>