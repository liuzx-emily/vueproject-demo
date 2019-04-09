<template>
    <section>
        <!-- 
        勾选权限的思路是：
            页面初始化时，加载所有的权限，给弹窗里的el-tree赋值。
            新增时，清空el-tree的选中值。 this.$refs.selectPermissionTree.setCheckedKeys([]);
            编辑或查看时，重新设置el-tree的选中值 this.$refs.selectPermissionTree.setCheckedKeys(选中角色所拥有的所有权限的id数组);
         -->

        <section class="search-condition-container">
            <section class="box-btns">
                <el-button size="small" type="primary" @click="openDial(1)" v-if="checkBtn('add')">添加</el-button>
            </section>
        </section>
        <el-table :data="tableData" ref="table" border stripe>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- <el-button  class="size-small"  type="warning" @click="openDial(2,scope.row.roleId)">不受权限控制的编辑</el-button> -->
                    <el-button class="size-small" type="warning" v-if="checkBtn('edit')&&scope.row.btnFlag_edit" @click="openDial(2,scope.row.roleId)">编辑</el-button>
                    <el-button class="size-small" type="success" v-if="checkBtn('look')&&scope.row.btnFlag_look" @click="openDial(3,scope.row.roleId)">查看</el-button>
                    <el-button class="size-small" type="danger" v-if="checkBtn('delete')&&scope.row.btnFlag_delete" @click="openDialog_delete(1,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="680px" :modal-append-to-body='false'>
            <el-form ref="dialogForm1" label-width="100px" style="width:500px;" size="medium" :model="dialogData" :rules="dialogRule1" :disabled="dialogReadonly" status-icon @submit.native.prevent>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-tree :data="permissionData" node-key="permissionId" :props="{label: 'name'}" :default-expand-all="true" :show-checkbox="true" :check-strictly="true" @check-change="checkChange" ref="selectPermissionTree"></el-tree>
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
export default {
    components: {  },
    data() {
        // 用户重名验证
        var nameValidation = (rule, value, callback) => {
            var param = {
                roleId: this.dialogData.roleId,
                name: this.dialogData.name
            };
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/role/checkName.htmls',
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
            // 表格数据
            tableData: [],
            // 权限数据
            permissionData: [],
            // 弹窗
            dialogVisible: false,
            dialogType: 1,
            dialogData: {
                roleId: "",
                name: "",
                description: ""
            },
            dialogRule1: {
                // 账号
                name: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
                    // 重名验证
                    { validator: nameValidation, trigger: "blur" }
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
    },
    mounted() {
        this.refreshTable();
        this.getPermissionData();
    },
    methods: {
        // 检查按钮权限
        checkBtn(code) {
            var btnPermmisionCheck = this.xTools.checkBtn(this.$store, 'role:btn:' + code);
            return btnPermmisionCheck;
        },
        // 获取权限数据
        getPermissionData() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/permission/all.htmls',
                // url: BASE_PATH + '/permission/list.htmls',
            }).then((response) => {
                const res = response.data;
                this.permissionData = this.xTools.arrayToTree(res.data, {
                    before_idkey: "permissionId",
                    before_parentkey: "parentId",
                    after_childkey: 'children'
                });
                this.loading = false;
            }).catch(error => {});
        },
        checkChange(a, b, c) {
            // console.log("在这里加：选中子节点后，把父级、爷爷级节点也选中。")
            // console.log(a, b, c);
        },
        // 表格
        refreshTable() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + "/role/list.htmls",
            }).then((response) => {
                const res = response.data;
                this.tableData = this._.map(res.data, (item) => {
                    if (item.temp1 == 1) {
                        // 内置角色：只能查看
                        item.btnFlag_look = true;
                        item.btnFlag_edit = false;
                        item.btnFlag_delete = false;
                    } else {
                        item.btnFlag_look = true;
                        item.btnFlag_edit = true;
                        item.btnFlag_delete = true;
                    }
                    return item;
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
                    roleId: "",
                    name: "",
                    description: ""
                };
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs.dialogForm1.clearValidate();
                    // 清空权限树的已选择
                    this.$refs.selectPermissionTree.setCheckedKeys([]);
                    this.loading = false;
                });
            } else {
                // 编辑、查看
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + "/role/detail.htmls",
                    params: {
                        roleId: id,
                    }
                }).then((response) => {
                    const res = response.data;
                    this.dialogData = {
                        roleId: id,
                        name: res.data.name,
                        description: res.data.description
                    };
                    this.dialogVisible = true;
                    this.$nextTick(() => {
                        this.$refs.dialogForm1.clearValidate();
                        // 重新设置权限树的已选择
                        this.$refs.selectPermissionTree.setCheckedKeys(_(res.data.permissionList).filter((item) => { return item.checked }).map("permissionId").value());
                        this.loading = false;
                    });
                }).catch(error => {});
            }
        },
        saveDial() {
            this.$refs.dialogForm1.validate(valid => {
                if (valid) {
                    // ajax请求
                    let param = this._.cloneDeep(this.dialogData);
                    param.permissionIds = this.$refs.selectPermissionTree.getCheckedKeys().join("-");
                    this.loading = true;
                    let url = { 1: "add", 2: "edit" } [this.dialogType];
                    this.xAxios({
                        xJsonData: true,
                        data: param,
                        url: BASE_PATH + `/role/${url}.htmls`
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
                    ids: this._.map(data, "roleId").join("-"),
                };
                this.loading = true;
                this.xAxios({
                    method: 'post',
                    url: BASE_PATH + '/role/delete.htmls',
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