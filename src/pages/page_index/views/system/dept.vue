<template>
    <section>
        <section class="search-condition-container">
            <section class="box-btns">
                <el-button size="small" type="primary" @click="openDial(1)" v-if="checkBtn('add')">添加</el-button>
            </section>
        </section>
        <xTreeTable :data="tableData" :columns="columns" border striped :expandAll="true">
            <el-table-column prop="type" label="单位类型" width="200px">
                <template slot-scope="scope">
                    {{(scope.row.type=='2'&&'调查单位')||(scope.row.type=='3'&&'市级单位')||""}}
                </template></el-table-column>
            <el-table-column label="操作" width="250px">
                <template slot-scope="scope">
                    <!-- 如果是"天津市建委"部门，则不允许操作 -->
                    <template v-if="scope.row.name!='天津市建委'">
                        <el-button class="tinyBtn" type="warning" v-if="checkBtn('edit')" @click="openDial(2,scope.row.deptId)">编辑</el-button>
                        <el-button class="tinyBtn" type="success" v-if="checkBtn('look')" @click="openDial(3,scope.row.deptId)">查看</el-button>
                        <el-button class="tinyBtn" type="danger" v-if="checkBtn('delete')" @click="openDialog_delete(1,scope.row)">删除</el-button>
                    </template>
                </template>
            </el-table-column>
        </xTreeTable>
        <!-- 弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :modal-append-to-body='true'>
            <el-form ref="dialogForm1" label-width="80px" size="medium" :model="dialogData" :rules="dialogRule1" :disabled="dialogReadonly" status-icon @submit.native.prevent>
                <el-form-item label="单位名称" prop="name">
                    <el-input v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="单位类型" prop="type">
                    <el-radio-group v-model="dialogData.type">
                        <el-radio :label="2">调查单位</el-radio>
                        <el-radio :label="3">市级单位</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上级单位" prop="parentId">
                    <template v-if="dialogType!=3">
                        <el-tree :data="dialog_parentTree" node-key="deptId" :props="{label: 'name'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectParentTree"></el-tree>
                    </template>
                    <template v-else>
                        {{dialogData.parentName}}
                    </template>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input v-model="dialogData.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDial" v-show="dialogType!=3">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
// 全局
export default {
    components: { },
    data() {
        // 用户重名验证
        var nameValidation = (rule, value, callback) => {
            var param = {
                deptId: this.dialogData.deptId,
                name: this.dialogData.name
            };
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/dept/checkDeptName.htmls',
                params: param
            }).then((response) => {
                const res = response.data;
                if (res.code == 1) {
                    callback();
                } else {
                    callback(new Error('存在重名！'));
                }
            }).catch(error => {});
        };
        return {
            loading: false,
            // treetable 表格数据
            columns: [{
                text: '单位名称',
                value: 'name'
            }],
            tableData: [],
            // 弹窗
            dialogVisible: false,
            dialogType: 1,
            dialogData: {
                deptId: "",
                name: "",
                type: "",
                parentId: "",
                description: ""
            },
            dialogRule1: {
                name: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
                    // 重名验证
                    { validator: nameValidation, trigger: "blur" }
                ],
                type: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] }
                ],
                parentId: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] }
                ],
            }
        }
    },
    computed: {
        dialogTitle() {
            return { 1: "新增", 2: "编辑", 3: "查看" } [this.dialogType] || "";
        },
        dialogReadonly() {
            return this.dialogType == 3;
        },
        dialog_parentTree() {
            return this._.cloneDeep(this.tableData);
        }
    },
    mounted() {
        this.refreshTable();
    },
    methods: {
        // 检查按钮权限
        checkBtn(code) {
            var btnPermmisionCheck = this.xTools.checkBtn(this.$store, 'dept:btn:' + code);
            return btnPermmisionCheck;
        },
        // 表格treetable
        refreshTable() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + "/dept/list.htmls",
                params: { type: 23 }
            }).then((response) => {
                const res = response.data;
                this.tableData = this.xTools.arrayToTree(res.data, {
                    before_idkey: "deptId",
                    before_parentkey: "parentId",
                    after_childkey: "children"
                });
                this.loading = false;
            }).catch(error => {
                this.loading = false;
            });
        },
        // 弹窗
        openDial(type, id) {
            this.loading = true;
            this.dialogType = type;
            if (type == 1) {
                // 新增
                this.dialogData = {
                    deptId: "",
                    name: "",
                    type: "",
                    parentId: "",
                    parentName: "",
                    description: ""
                };
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs.dialogForm1.clearValidate();
                    // 清空父级的选择
                    this.$refs.selectParentTree.setCurrentKey(null);
                    this.loading = false;
                });
            } else {
                // 编辑、查看
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + "/dept/detail.htmls",
                    params: {
                        deptId: id,
                    }
                }).then((response) => {
                    const res = response.data;
                    this.dialogData = {
                        deptId: id,
                        name: res.data.name,
                        type: res.data.type,
                        parentId: res.data.parentId,
                        parentName: res.data.parentName,
                        description: res.data.description
                    };
                    this.dialogVisible = true;
                    this.$nextTick(() => {
                        this.$refs.dialogForm1.clearValidate();
                        // 父级 type为2编辑时，才有树。type为3查看时，没有树
                        if (this.dialogType == 2) {
                            this.$refs.selectParentTree.setCurrentKey(this.dialogData.parentId);
                        }
                        this.loading = false;
                    });
                }).catch(error => {});
            }
        },
        saveDial() {
            this.dialogData.parentId = this.$refs.selectParentTree.getCurrentKey();
            if (this.dialogType == '2' && this.dialogData.parentId === this.dialogData.deptId) {
                this.$message({
                    message: '上级单位不能选择自身！',
                    type: 'warning',
                });
            }
            this.$refs.dialogForm1.validate(valid => {
                if (valid) {
                    // ajax请求
                    let param = this._.cloneDeep(this.dialogData);
                    this.loading = true;
                    let url = { 1: "add", 2: "edit" } [this.dialogType];
                    this.xAxios({
                        xJsonData: true,
                        data: param,
                        url: BASE_PATH + `/dept/${url}.htmls`
                    }).then((response) => {
                        const res = response.data;
                        if (res.code == 1) {
                            this.$message({
                                message: '操作成功！',
                                type: 'success'
                            });
                            // 关闭弹窗
                            this.dialogVisible = false;
                            // 刷新
                            this.refreshTable();
                        }
                        this.loading = false;
                    }).catch(error => {
                        this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        },
        // 打开"删除"询问框，确认后删除（可以批量）
        openDialog_delete(type, data) {
            if (type == 1) {
                // 单个
                data = [data];
            } else if (type == 2) {
                // 批量
                data = this.getTableChecked();
                if (data.length == 0) {
                    this.$message({
                        type: 'error',
                        message: '请先勾选数据！'
                    });
                    return false;
                }
            }
            this.$confirm('您确认要删除数据吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = {
                    ids: this._.map(data, "deptId").join("-"),
                };
                this.loading = true;
                this.xAxios({
                    method: 'post',
                    url: BASE_PATH + '/dept/delete.htmls',
                    params: param
                }).then((response) => {
                    const res = response.data;
                    if (res.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                        // 刷新
                        this.refreshTable();
                    }
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                });
            }).catch(error => {});
        },
    }
};
</script>