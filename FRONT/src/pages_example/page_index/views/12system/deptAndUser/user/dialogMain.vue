<style scoped></style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px" :modal-append-to-body='true' :close-on-click-modal="false">
            <el-form ref="form" label-width="70px" :model="dialogData" :rules="rules" :disabled="readonly">
                <el-form-item label="帐号" prop="username">
                    <el-input v-model="dialogData.username" :disabled="dialogType!=1"></el-input>
                </el-form-item>
                <el-form-item label="密码" v-if="dialogType==1">
                    {{DEFAULT_PASSWORD}}
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="dialogData.roleId" style="width:100%">
                        <el-option v-for="item in roleListData" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="deptId">
                    <template v-if="readonly">{{dialogData.deptName}}</template>
                    <template v-else>
                        <el-tree :data="deptTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectDeptTree"></el-tree>
                    </template>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="dialogData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="dialogData.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" v-if="dialogType!=3">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDial">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import original_data from './data/dialogMainData.js';
export default {
    props: ["deptId", "deptTreeData", "refreshFunc"],
    components: {},
    data() {
        return {
            loading: false,
            roleListData: [],
            dialogVisible: false,
            dialogType: 1,
            dialogData: this._.cloneDeep(original_data),
            rules: {
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
                phone: [{ validator: this.xElementRules.cellphone, trigger: ['blur', 'change'] }],
                // 邮箱
                email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
                // 部门
                deptId: [{ required: true, message: "不能为空", trigger: ['blur', 'change'] }, ],
                // 角色
                roleId: [{ required: true, message: "不能为空", trigger: ['blur', 'change'] }, ]
            }
        }
    },
    computed: {
        DEFAULT_PASSWORD() { return window.DEFAULT_PASSWORD; },
        readonly() { return this.dialogType == 3; },
        dialogTitle() { return { 1: "新增", 2: "编辑", 3: "查看" } [this.dialogType] || ""; },
    },
    watch: {},
    created() {
        this.getRoleList();
    },
    mounted() {},
    methods: {
        // 重名验证
        nameValidation(rule, value, callback) {
            var param = {
                id: this.dialogData.id,
                name: this.dialogData.name
            };
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/user/nameValidation.do',
                params: param
            }).then((response) => {
                const res = response.data;
                if (res.data) {
                    callback();
                } else {
                    callback(new Error('存在重名！'));
                }
            });
        },
        // 获取角色数据
        getRoleList() {
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/role/list.do',
            }).then((response) => {
                const res = response.data;
                this.roleListData = res.data;
            }).catch(error => {});
        },
        openDial(type, id) {
            const afterGettingData = () => {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs.form.clearValidate();
                    if (this.dialogType == 1 || this.dialogType == 2) {
                        this.$refs.selectDeptTree.setCurrentKey(this.dialogData.deptId);
                    }
                    this.loading = false;
                });
            };
            this.loading = true;
            this.dialogType = type;
            if (type == 1) {
                // 新增
                this.dialogData = this._.cloneDeep(original_data);
                this.dialogData.deptId = this.deptId;
                afterGettingData();
            } else if (type == 2 || type == 3) {
                // 编辑、查看
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + "/user/detail.do",
                    params: { id: id, }
                }).then((response) => {
                    const res = response.data;
                    for (let key in original_data) {
                        this.dialogData[key] = res.data[key]
                    }
                    this.dialogData.id = id;
                    afterGettingData();
                });
            }
        },
        saveDial() {
            this.dialogData.deptId = this.$refs.selectDeptTree.getCurrentKey();
            this.$refs.form.validate(valid => {
                if (valid) {
                    let param = this._.cloneDeep(this.dialogData);
                    // 新增时，赋予默认密码
                    (this.dialogType == 1) && (param.password = this.DEFAULT_PASSWORD);
                    this.loading = true;
                    let url = { 1: "add", 2: "edit" } [this.dialogType];
                    this.xAxios({
                        xJsonData: true,
                        data: param,
                        url: BASE_PATH + `/user/${url}.do`
                    }).then((response) => {
                        const res = response.data;
                        if (res.code == 1) {
                            this.$message({
                                message: '操作成功！',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.refreshFunc();
                        }
                        this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        },
    }
};
</script>