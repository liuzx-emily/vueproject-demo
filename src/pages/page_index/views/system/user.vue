<style scoped>
    .userModule_left {
    display: inline-block;
    width: 28%;
    margin-right: 2%;
    vertical-align: top;
    /*border:1px solid #72aaf1;*/
    /*padding: 5px 0;*/
}
.userModule_left .aboverTreeBtns{
    padding:10px 0;
    margin-bottom:10px;
    text-align: center;
    display: block;
    border-bottom: 2px solid #72aaf1;
}
.userModule_right {
    display: inline-block;
    width: 68%;
    /*border:1px solid #72aaf1;*/
    /*padding: 10px;*/
}
</style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <section class="userModule_left">
            <el-radio-group v-model="deptType" class="aboverTreeBtns">
                <el-radio label="1">用能单位</el-radio>
                <el-radio label="23">非用能单位</el-radio>
            </el-radio-group>
            <el-tree :data="deptTreeData" node-key="deptId" :props="{label: 'name'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" @node-click="clickDeptTreeNode" ref="leftTree"></el-tree>
        </section>
        <section class="userModule_right">
            <section class="search-condition-container">
                <section class="box-btns">
                    <el-button type="primary" size="small" @click="openDial(1)" v-if="checkBtn('add')">添加</el-button>
                    <el-button type="danger" size="small" @click="openDialog_delete(2)" v-if="checkBtn('delete')">批量删除</el-button>
                </section>
            </section>
            <section>
                <xTable :refresh="refresh" ref="table">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column prop="username" label="帐号"></el-table-column>
                    <el-table-column prop="realname" label="姓名"> </el-table-column>
                    <el-table-column prop="roleName" label="角色"> </el-table-column>
                    <el-table-column label="操作" width="300px">
                        <template slot-scope="scope">
                            <el-button class="tinyBtn" type="warning" v-if="checkBtn('edit')" @click="openDial(2,scope.row.userId)">编辑</el-button>
                            <el-button class="tinyBtn" type="success" v-if="checkBtn('look')" @click="openDial(3,scope.row.userId)">查看</el-button>
                            <el-button class="tinyBtn" type="primary" v-if="checkBtn('resetpw')" @click="openDial_resetPW(scope.row.userId)">重置密码</el-button>
                            <el-button class="tinyBtn" type="danger" v-if="checkBtn('delete')" @click="openDialog_delete(1,scope.row)">删除</el-button>
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
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="dialogData.realname"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="deptId" style="position:relative">
                    <el-input v-model="dialogData.deptName" disabled></el-input>
                    <el-button size="mini" type="primary" @click="openDial_selectParentDept" v-show="dialogType==1||dialogType==2" style="position: absolute;right: -60px;top: 4px;">选择</el-button>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="dialogData.roleId" style="width:100%">
                        <el-option v-for="item in roleData" :label="item.name" :value="item.roleId"></el-option>
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
            <el-tree :data="deptTreeData" node-key="deptId" :props="{label: 'name'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectDeptTree"></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible_selectParentDept = false">取消</el-button>
                <el-button type="primary" @click="saveDial_selectDept">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
// 全局
import _ from 'lodash'
import xTools from '~/utils/xTools.js'
import { xElementRules } from '~/utils/xValidate.js'
import xTable from '~/components/xTable/index.vue'
// 本页
const dialogData_default = {
    userId: "",
    username: "",
    realname: "",
    email: "",
    phone: "",
    deptId: "",
    deptName: "",
    roleId: "",
    roleName: "",
};
export default {
    name: "user",
    components: { xTable },
    data() {
        // 用户重名验证，西文验证
        var nameValidation = (rule, value, callback) => {
            var param = {
                userId: this.dialogData.userId,
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
            deptType: "1",
            deptTreeData: [],
            deptId: "",
            // 用户表格
            // 用户弹窗
            dialogVisible: false,
            // 1新增 2编辑 3查看
            dialogType: 1,
            dialogData: _.cloneDeep(dialogData_default),
            // 数据校验
            dialogRule1: {
                // 账号
                username: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
                    // 西文验证
                    { validator: xElementRules.western, trigger: ['blur', 'change'] },
                    // 重名验证
                    { validator: nameValidation, trigger: "blur" },
                ],
                // 姓名
                realname: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到20 个字符", trigger: ['blur', 'change'] },
                ],
                // 手机
                phone: [
                    // 手机格式验证，使用自己封装的xElementRules
                    { validator: xElementRules.cellphone, trigger: ['blur', 'change'] }
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
        deptType() {
            this.getDeptTreeData();
        },
        deptId() {
            this.refreshTable_pageOne();
        }
    },
    mounted() {
        this.getDeptTreeData();
        this.getRoleData();
    },
    methods: {
        // 检查按钮权限
        checkBtn(code) {
            var btnPermmisionCheck = xTools.checkBtn(this.$store, 'user:btn:' + code);
            return btnPermmisionCheck;
        },
        // 获取部门树数据
        getDeptTreeData() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/dept/list.htmls',
                params: {
                    type: this.deptType
                }
            }).then((response) => {
                const res = response.data;
                this.deptTreeData = xTools.arrayToTree(res.data, {
                    before_idkey: "deptId",
                    before_parentkey: "parentId",
                    after_childkey: 'children'
                });
                // 选中第一个节点
                if (this.deptTreeData && this.deptTreeData.length > 0) {
                    this.$nextTick(() => {
                        this.$refs.leftTree.setCurrentNode(this.deptTreeData[0]);
                        this.deptId = this.deptTreeData[0].deptId;
                    });
                }
                this.loading = false;
            }).catch(error => {});
        },
        // 获取角色数据
        getRoleData() {
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/role/list.htmls',
                params: {
                    type: this.deptType
                }
            }).then((response) => {
                const res = response.data;
                this.roleData = res.data;
            }).catch(error => {});
        },
        // 点击左侧树的节点
        clickDeptTreeNode() {
            this.deptId = this.$refs.leftTree.getCurrentNode().deptId;
        },
        // ----------------------------- 用户表格（子组件相关） -----------------------------
        // 传给子组件用的
        refresh(param, self) {
            // 获取表格数据
            self.loading = true;
            self.xAxios({
                method: 'get',
                url: BASE_PATH + "/user/list.htmls",
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
        openDial_resetPW(userId) {
            let password = this.DEFAULT_PASSWORD;
            this.$confirm(`您确认要重置密码吗？（初始密码为：${password}）`, '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = {
                    userId: userId,
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
                    ids: _.map(data, "userId").join("-"),
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
        openDial(type, userId) {
            this.dialogType = type;
            if (type == 1) {
                // 新增
                this.dialogData = _.cloneDeep(dialogData_default);
                // 部门初始化为当前选中部门
                this.dialogData.deptId = this.$refs.leftTree.getCurrentNode().deptId;
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
                    url: BASE_PATH + "/user/detail.htmls",
                    params: {
                        userId: userId,
                    }
                }).then((response) => {
                    const res = response.data;

                    this.dialogData = {
                        userId: userId,
                        username: res.data.username,
                        realname: res.data.realname,
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
                    let param = _.cloneDeep(this.dialogData);
                    // 新增时，赋予默认密码
                    if (this.dialogType == 1) {
                        param.password = this.DEFAULT_PASSWORD;
                    }
                    this.loading = true;
                    let url = { 1: "add", 2: "edit" } [this.dialogType];
                    this.xAxios({
                        xJsonData: true,
                        data: param,
                        url: BASE_PATH + `/user/${url}.htmls`,
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
            this.dialogData.deptId = node.deptId;
            this.dialogData.deptName = node.name;
            this.dialogVisible_selectParentDept = false;
        },
    }
};
</script>