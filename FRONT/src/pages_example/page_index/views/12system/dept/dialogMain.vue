<style scoped></style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
        <!-- 弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :modal-append-to-body='true'>
            <!-- <el-form ref="dialogForm1" label-width="80px" size="medium" :model="dialogData" :rules="dialogRule1" :disabled="dialogReadonly" status-icon @submit.native.prevent> -->
            <el-form ref="dialogForm1" label-width="80px" size="mini" :model="dialogData" :rules="dialogRule1" :disabled="dialogReadonly">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dialogData.name"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="dialogData.type">
                        <el-radio :label="1">好吃</el-radio>
                        <el-radio :label="2">不好吃</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上级" prop="parentId">
                    <template v-if="dialogType!=3">
                        <el-tree :data="parentTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectParentTree">
                        </el-tree>
                    </template>
                    <template v-else>
                        {{dialogData.parentName}}
                    </template>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input type="textarea" v-model="dialogData.description"></el-input>
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
import original_data from './dialogMainData.js';
export default {
    props: {
        refreshFunc: {
            type: Function,
            default: () => {},
        },
        mainData: {
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
            // 弹窗
            dialogVisible: false,
            dialogType: 1,
            dialogData: this._.cloneDeep(original_data),
            dialogRule1: {
                name: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
                    // 重名验证
                    { validator: this.nameValidation, trigger: "blur" }
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
        parentTreeData() {
            return [{
                id: "0",
                parentId: "-1",
                name: "顶级",
                child: this.mainData
            }];
        },
    },
    watch: {},
    created() {},
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
                url: BASE_PATH + '/dept/nameValidation.do',
                params: param
            }).then((response) => {
                const res = response.data;
                if (res.data) {
                    callback();
                } else {
                    callback(new Error('存在重名！'));
                }
            }).catch(error => {});
        },
        // 弹窗
        openDial(type, id) {
            this.loading = true;
            this.dialogType = type;
            if (type == 1) {
                // 新增
                this.dialogData = this._.cloneDeep(original_data);
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.$refs.dialogForm1.clearValidate();
                    // 清空父级的选择
                    this.$refs.selectParentTree.setCurrentKey(null);
                    this.loading = false;
                });
            } else if (type == 2 || type == 3) {
                // 编辑、查看
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + "/dept/detail.do",
                    params: {
                        id: id,
                    }
                }).then((response) => {
                    const res = response.data;
                    for (let key in original_data) {
                        this.dialogData[key] = res.data[key]
                    }
                    this.dialogData.id = id;
                    console.log(this.dialogData);
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
            if (this.dialogType == '2' && this.dialogData.parentId === this.dialogData.id) {
                this.$message({
                    message: '上级单位不能选择自身！',
                    type: 'warning',
                });
                return;
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
                        url: BASE_PATH + `/dept/${url}.do`
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
                            this.refreshFunc();
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
    }
};
</script>