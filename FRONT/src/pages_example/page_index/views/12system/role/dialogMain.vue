<style scoped></style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :modal-append-to-body='true' :close-on-click-modal="false">
            <el-form ref="form" label-width="70px" :model="dialogData" :rules="rules" :disabled="readonly">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="上级" prop="parentId">
                    <template v-if="readonly">{{dialogData.parentName}}</template>
                    <template v-else>
                        <el-tree :data="parentTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectParentTree"></el-tree>
                    </template>
                </el-form-item>
                <el-form-item label="权限">
                    <el-tree :data="permissionTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :show-checkbox="true" :check-strictly="true" ref="selectPermissionTree" @check-change="checkChange"></el-tree>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input type="textarea" v-model="dialogData.description"></el-input>
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
    props: {
        refreshFunc: {
            type: Function,
            default: () => {},
        },
        parentData: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    components: {},
    data() {
        return {
            loading: false,
            permissionTreeData: [],
            dialogVisible: false,
            dialogType: 1,
            dialogData: this._.cloneDeep(original_data),
            rules: {
                name: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
                    // 重名验证
                    // { validator: this.nameValidation, trigger: "blur" }
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
        readonly() { return this.dialogType == 3; },
        dialogTitle() { return { 1: "新增", 2: "编辑", 3: "查看" } [this.dialogType] || ""; },
        parentTreeData() { return [{ id: "0", parentId: "-1", name: "顶级", child: this.parentData }]; },
    },
    watch: {},
    created() {
        this.getAllPermissionData();
    },
    mounted() {},
    methods: {
        checkChange(data, beingChecked) {
            const checkNode = (id, checked) => {
                return this.$refs.selectPermissionTree.setChecked(id, checked, false);
            };
            if (beingChecked) {
                // 选中我的父级
                checkNode(data.parentId, true)
            } else {
                // 取消我的子级
                const children = data.child;
                children && children.forEach(child => {
                    checkNode(child.id, false);
                });
            }
        },
        // 重名验证
        nameValidation(rule, value, callback) {
            var param = {
                id: this.dialogData.id,
                name: this.dialogData.name
            };
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/role/nameValidation.do',
                params: param
            }).then(res => {
                if (res.data) {
                    callback();
                } else {
                    callback(new Error('存在重名！'));
                }
            });
        },
        getAllPermissionData() {
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/permission/list.do',
            }).then(res => {
                this.permissionTreeData = this.xtools.arrayToTree(res.data, {
                    before_idkey: "id",
                    before_parentkey: "parentId",
                    after_childkey: 'child'
                });
            });
        },
        openDial(type, id) {
            const afterGettingData = () => {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs.form.clearValidate();
                    if (this.dialogType == 1 || this.dialogType == 2) {
                        this.$refs.selectParentTree.setCurrentKey(this.dialogData.parentId);
                        this.$refs.selectPermissionTree.setCheckedKeys(this.dialogData.permissionIds);
                    }
                    this.loading = false;
                });
            };
            this.loading = true;
            this.dialogType = type;
            if (type == 1) {
                // 新增
                this.dialogData = this._.cloneDeep(original_data);
                this.dialogData.parentId = null;
                this.dialogData.permissionIds = [];
                afterGettingData();
            } else if (type == 2 || type == 3) {
                // 编辑、查看
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + "/role/detail.do",
                    params: {
                        id: id,
                    }
                }).then(res => {
                    for (let key in original_data) {
                        this.dialogData[key] = res.data[key]
                    }
                    this.dialogData.id = id;
                    afterGettingData();
                });
            }
        },
        saveDial() {
            this.dialogData.parentId = this.$refs.selectParentTree.getCurrentKey();
            if (this.dialogType == '2' && this.dialogData.parentId === this.dialogData.id) {
                this.$message({
                    message: '上级单位不能选择自身！',
                    type: 'warning',
                });
                return;
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    let param = this._.cloneDeep(this.dialogData);
                    let permissionIds = this.$refs.selectPermissionTree.getCheckedKeys();
                    param.permissionIds = permissionIds;
                    this.loading = true;
                    let url = { 1: "add", 2: "edit" } [this.dialogType];
                    this.xAxios({
                        xJsonData: true,
                        data: param,
                        url: BASE_PATH + `/role/${url}.do`
                    }).then(res => {
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