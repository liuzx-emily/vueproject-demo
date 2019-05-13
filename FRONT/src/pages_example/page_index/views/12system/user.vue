<style scoped>
    .userModule_left {
    display: inline-block;
    width: 390px;
    margin-right: 10px;
    vertical-align: top;
}
.userModule_right {
    display: inline-block;
    width: calc(100% - 400px);
}
</style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <section class="userModule_left">
            <el-tree :data="deptTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" @node-click="clickDeptTreeNode" ref="leftTree"></el-tree>
        </section>
        <section class="userModule_right">
            <section class="search-condition">
                <section class="search-btn-box">
                    <el-button type="primary" size="small" @click="openDial(1)" v-if="checkBtn('add')">新增</el-button>
                    <el-button type="danger" size="small" @click="openDialog_delete(2)" v-if="checkBtn('delete')">批量删除</el-button>
                </section>
            </section>
            <section>
                <xTable :refresh="refresh" ref="table">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="username" label="帐号"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="roleName" label="角色"> </el-table-column>
                    <el-table-column label="操作" width="300px">
                        <template slot-scope="scope">
                            <el-button class="size-small" type="warning" v-if="checkBtn('edit')" @click="openDial(2,scope.row.id)">编辑</el-button>
                            <el-button class="size-small" type="success" v-if="checkBtn('look')" @click="openDial(3,scope.row.id)">查看</el-button>
                            <el-button class="size-small" type="primary" v-if="checkBtn('resetpw')" @click="openDial_resetPW(scope.row.id)">重置密码</el-button>
                            <el-button class="size-small" type="danger" v-if="checkBtn('delete')" @click="openDialog_delete(1,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </xTable>
            </section>
        </section>
        <!-- 用户弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="680px" :modal-append-to-body='false' :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form ref="dialogForm1" label-width="100px" style="width:500px;" size="medium" :model="dialogData" :rules="dialogRule1" :disabled="dialogReadonly" status-icon @submit.native.prevent>
                <el-form-item label="帐号" prop="username">
                    <el-input v-model="dialogData.username" :disabled="dialogType!=1"></el-input>
                    <div style="line-height:1;" v-if="dialogType==1">默认密码：{{DEFAULT_PASSWORD}}</div>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="deptId" style="position:relative">
                    <el-input v-model="dialogData.deptName" disabled></el-input>
                    <el-button size="mini" type="primary" @click="openDial_selectParentDept" v-show="dialogType==1||dialogType==2" style="position: absolute;right: -60px;top: 4px;">选择</el-button>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="dialogData.roleId" style="width:100%">
                        <el-option v-for="item in roleData" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="dialogData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="dialogData.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDial" v-show="dialogType!=3">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 选择部门弹窗 -->
        <el-dialog width="500px" title="选择部门" :visible.sync="dialogVisible_selectParentDept" :modal-append-to-body='false' center>
            <el-tree :data="deptTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectDeptTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible_selectParentDept = false">取消</el-button>
                <el-button type="primary" @click="saveDial_selectDept">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
// 本页
const dialogData_default = {
    id: "",
    username: "",
    name: "",
    email: "",
    phone: "",
    deptId: "",
    deptName: "",
    roleId: "",
    roleName: "",
};
export default {
    name: "user",
    components: {},
    data() {
        // 用户重名验证，西文验证
        var nameValidation = (rule, value, callback) => {
            var param = {
                id: this.dialogData.id,
                username: this.dialogData.username
            };
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/user/checkUsername.htmls',
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
            // 左边的树
            deptTreeData: [],
            deptId: "",
            // 用户表格
            // 用户弹窗
            dialogVisible: false,
            // 1新增 2编辑 3查看
            dialogType: 1,
            dialogData: this._.cloneDeep(dialogData_default),
            // 数据校验
            dialogRule1: {
                // 账号
                username: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
                    // 西文验证
                    { validator: this.xElementRules.western, trigger: ['blur', 'change'] },
                    // 重名验证
                    // { validator: nameValidation, trigger: "blur" },
                ],
                // 姓名
                name: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到20 个字符", trigger: ['blur', 'change'] },
                ],
                // 手机
                phone: [
                    // 手机格式验证，使用自己封装的xElementRules
                    { validator: this.xElementRules.cellphone, trigger: ['blur', 'change'] }
                ],
                // 邮箱
                email: [
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                // 部门
                deptId: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                ],
                // 角色
                roleId: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                ]
            },
            roleData: [],
            // ------------------- 选择所属部门弹窗 -------------------
            dialogVisible_selectParentDept: false,
        };
    },
    computed: {
        // -------------------------------- 用户弹窗 --------------------------------
        dialogTitle() {
            return { 1: "新增", 2: "编辑", 3: "查看" } [this.dialogType] || "";
        },
        dialogReadonly() {
            return this.dialogType == 3;
        },
        DEFAULT_PASSWORD() {
            return DEFAULT_PASSWORD;
        }
    },
    watch: {
        deptId: {
            // 该回调将会在侦听开始之后被立即调用。顺序是 watch到了-> created -> mounted。
            // 所以要小心，这里HTML结构还没有渲染出来，所以$refs等是取不到的。
            immediate: true,
            // handler不可以写成箭头函数
            handler: function() {
                this.refreshTable_pageOne();
            },
        },
        // deptId() {
        //     this.refreshTable_pageOne();
        // },
    },
    created() {
        // console.log("created");
    },
    mounted() {
        // console.log("mounted");
        this.getDeptTreeData();
        this.getRoleData();
    },
    methods: {
        // 检查按钮权限
        checkBtn(code) {
            var btnPermmisionCheck = this.xTools.checkBtn(this.$store, 'user:btn:' + code);
            return btnPermmisionCheck;
        },
        // 获取部门树数据
        getDeptTreeData() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/dept/list.do'
            }).then((response) => {
                const res = response.data;
                this.deptTreeData = this.xTools.arrayToTree(res.data, {
                    before_idkey: "id",
                    before_parentkey: "parentId",
                    after_childkey: 'child'
                });
                // 选中第一个节点
                if (this.deptTreeData && this.deptTreeData.length > 0) {
                    this.$nextTick(() => {
                        this.$refs.leftTree.setCurrentNode(this.deptTreeData[0]);
                        this.deptId = this.deptTreeData[0].id;
                    });
                }
                this.loading = false;
            }).catch(error => {});
        },
        // 获取角色数据
        getRoleData() {
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/role/list.do',
            }).then((response) => {
                const res = response.data;
                this.roleData = res.data;
            }).catch(error => {});
        },
        // 点击左侧树的节点
        clickDeptTreeNode() {
            this.deptId = this.$refs.leftTree.getCurrentNode().id;
        },
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
            }).catch(error => {
                self.loading = false;
            });
        },
        // 刷新表格（跳回第一页）
        refreshTable_pageOne() {
            // 因为监听deptId时设置了immediate为true，所以第一次调用时HTML结构还没有渲染出来。
            if (this.$refs.table) {
                this.$refs.table.pageNum = 1;
                this.$refs.table.refreshTable();
            }
        },
        // 搜索
        doSearch() {
            this.searchparam.buildingName = this.fakesearchparam.buildingName;
            // 刷新表格（跳回第一页）
            this.refreshTable_pageOne();
        },
        // 获取表格中勾选的行
        getTableChecked() {
            return this.$refs.table.tableSelection;
        },
        // ----------------------------- 用户表格 -----------------------------
        // 打开"重置密码"询问框，确认后重置
        openDial_resetPW(id) {
            let password = this.DEFAULT_PASSWORD;
            this.$confirm(`您确认要重置密码吗？（初始密码为：${password}）`, '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = {
                    id: id,
                    password: password
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
                }).catch(error => {
                    this.loading = false;
                });
            }).catch(error => {
                this.loading = false;
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
                    ids: this._.map(data, "id").join("-"),
                };
                this.loading = true;
                this.xAxios({
                    method: 'post',
                    url: BASE_PATH + '/user/delete.htmls',
                    params: param
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
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                });
            }).catch(error => {});
        },
        // ----------------------------- 用户弹窗 -----------------------------
        // 用户弹窗：打开
        openDial(type, id) {
            this.dialogType = type;
            if (type == 1) {
                // 新增
                this.dialogData = this._.cloneDeep(dialogData_default);
                // 部门初始化为当前选中部门
                this.dialogData.deptId = this.$refs.leftTree.getCurrentNode().id;
                this.dialogData.deptName = this.$refs.leftTree.getCurrentNode().name;
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs.dialogForm1.clearValidate();
                });
            } else {
                // 编辑、查看
                this.loading = true;
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + "/user/detail.do",
                    params: {
                        id: id,
                    }
                }).then((response) => {
                    const res = response.data;

                    this.dialogData = {
                        id: id,
                        username: res.data.username,
                        name: res.data.name,
                        phone: res.data.phone,
                        email: res.data.email,
                        deptId: res.data.deptId,
                        deptName: res.data.deptName,
                        roleId: res.data.roleId,
                        roleName: res.data.roleName
                    }
                    this.dialogVisible = true;
                    this.$nextTick(() => {
                        this.$refs.dialogForm1.clearValidate();
                    });

                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                });
            }
        },
        // 用户弹窗：保存
        saveDial() {
            this.$refs.dialogForm1.validate(valid => {
                if (valid) {
                    // ajax请求
                    let param = this._.cloneDeep(this.dialogData);
                    // 新增时，赋予默认密码
                    if (this.dialogType == 1) {
                        param.password = this.DEFAULT_PASSWORD;
                    }
                    this.loading = true;
                    let url = { 1: "add", 2: "edit" } [this.dialogType];
                    this.xAxios({
                        xJsonData: true,
                        data: param,
                        url: BASE_PATH + `/user/${url}.do`,
                    }).then((response) => {
                        const res = response.data;
                        if (res.code == 1) {
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });
                            // 关闭弹窗
                            this.dialogVisible = false;
                            // 刷新
                            this.refreshTable_pageOne();
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
        // ----------------------------- 给用户选择部门 -----------------------------
        // 给用户选择部门：打开弹窗
        openDial_selectParentDept() {
            this.dialogVisible_selectParentDept = true;
            var id = this.dialogData.deptId;
            if (id) {
                this.$nextTick(() => {
                    this.$refs.selectDeptTree.setCurrentKey(id);
                });
            }
        },
        // 给用户选择部门：保存弹窗
        saveDial_selectDept() {
            var node = this.$refs.selectDeptTree.getCurrentNode();
            if (node == null) {
                this.$message({
                    type: "error",
                    message: "请选择父级部门！"
                });
                return;
            }
            this.dialogData.deptId = node.id;
            this.dialogData.deptName = node.name;
            this.dialogVisible_selectParentDept = false;
        },
    }
};
</script>