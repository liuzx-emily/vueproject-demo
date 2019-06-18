<style scoped>
    .el-card{
        margin-top: 10px;
        padding-top: 20px;
        padding-right:50px;
    }
</style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
        <section class="search-condition">
            <section class="search-btn-box">
                <!-- 返回 -->
                <el-button type="text" icon="el-icon-arrow-left" @click="goBack" style="margin-right:20px;">返回</el-button>
                <!-- mode 新增、编辑： 保存、提交-->
                <template v-if="mode==1||mode==2">
                    <el-button type="primary" @click="do_save(false)">保存</el-button>
                    <el-button type="success" @click="do_save(true)">提交</el-button>
                </template>
                <!-- mode 查看：无操作按钮 -->
                <!-- mode 审核：审核通过、审核不通过 -->
                <template v-if="mode==4">
                    <el-button type="primary" @click="do_audit_yes">审核通过</el-button>
                    <el-button type="danger" @click="do_audit_no">审核不通过</el-button>
                </template>
            </section>
        </section>
        <el-card>
            <el-form ref="form" label-width="100px" :model="dialogData" :rules="rules" @submit.native.prevent :disabled="readonly">
                <el-form-item label="" v-if="dialogData.state==4">
                    <span style="font-size:14px;font-weight:bold;color:crimson">审核未通过，原因：{{dialogData.reason}}</span>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="dialogData.title"></el-input>
                </el-form-item>
                <el-form-item label="发布人" prop="publisher" style="display:inline-block;width:50%;">
                    <el-input v-model="dialogData.publisher"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="publishTime" style="display:inline-block;width:50%;">
                    <el-date-picker v-model="dialogData.publishTime" type="date" value-format="timestamp" style="width:140px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="附件">
                    <xUpload :flist.sync="dialogData.fileList" ref="xUpload" :readonly="readonly" />
                </el-form-item>
                <el-form-item label="内容">
                    <xEditor :fcontent.sync="dialogData.content" :readonly="readonly" ref="xEditor" />
                </el-form-item>
            </el-form>
        </el-card>
    </section>
</template>
<script>
import original_data from './data/mainData.js';
export default {
    components: {},
    data() {
        return {
            loading: false,
            dialogData: this._.cloneDeep(original_data),
            rules: {
                title: [
                    { required: true, message: "不能为空", trigger: ["blur", "change"] },
                    { min: 1, max: 100, message: "长度在 1 到 100 个字符", trigger: ["blur", "change"] }
                ],
                publisher: [
                    { required: true, message: "不能为空", trigger: ["blur", "change"] },
                    { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: ["blur", "change"] }
                ],
                publishTime: [
                    { required: true, message: "不能为空", trigger: ["blur", "change"] }
                ],
            }
        };
    },
    computed: {
        mode() { return this.$route.params.mode; },
        articleId() { return this.$route.params.id; },
        readonly() { return this.mode == 3 || this.mode == 4; },
    },
    mounted() {
        this.getData();
    },
    methods: {
        goBack() { this.$router.push("/article"); },
        getData() {
            const afterGettingData = () => {
                this.$nextTick(() => {
                    this.$refs.form.clearValidate();
                    this.$refs.xEditor.setContent(this.dialogData.content);
                    this.loading = false;
                });
            };
            this.loading = true;
            if (this.mode == 1) {
                // 新增
                this.dialogData = this._.cloneDeep(original_data);
                this.dialogData.contet = "";
                this.dialogData.publishTime = +new Date();
                afterGettingData();
            } else {
                this.xAxios({
                    method: "get",
                    url: BASE_PATH + "/article/detail.do",
                    params: { id: this.articleId }
                }).then(res => {
                    for (let key in original_data) {
                        this.dialogData[key] = res.data[key]
                    }
                    this.dialogData.id = this.articleId;
                    afterGettingData();
                });
            }
        },
        // 1提交、0保存
        do_save(submitFlag) {
            // submitFlag true提交 false保存
            if (submitFlag) {
                const confirmFunc = () => {
                    this.save(submitFlag);
                };
                this.xtools.openConfirm({
                    msg: "提交后信息无法再次更改，确定提交吗？",
                    confirmFunc
                });
            } else {
                this.save(submitFlag);
            }
        },
        // 保存
        save(submitFlag) {
            // 附件和内容至少填一个
            if (this.dialogData.content.length == 0 && this.dialogData.fileList.length == 0) {
                this.$message({
                    message: "内容和附件不能同时为空！",
                    type: "warning",
                    showClose: true
                });
                return;
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    let param = this._.cloneDeep(this.dialogData);
                    // 附件
                    param.fileList = this._.map(this.dialogData.fileList, "id");
                    // state 1未提交 2待审核 3审核通过 4审核不通过
                    // 审核状态：状态为审核不通过，点击保存，审核状态不变
                    if (param.state == 4 && !submitFlag) {
                        param.state = 4;
                    } else {
                        param.state = submitFlag ? 2 : 1;
                    }
                    this.loading = true;
                    this.xAxios({
                        xJsonData: true,
                        url: BASE_PATH + `/article/${this.mode == 1 ? "add" : "edit"}.do`,
                        data: param
                    }).then(res => {
                        // 数据格式化
                        if (res.code == 1) {
                            this.$message({
                                type: "success",
                                message: "操作成功！"
                            });
                            this.goBack();
                        }
                    }).catch(error => {
                        this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        },
        // 审核通过
        do_audit_yes() {
            const confirmFunc = () => {
                this.loading = true;
                let param = { id: this.articleId, audit: true };
                this.xAxios({
                    method: "post",
                    url: BASE_PATH + "/article/audit.do",
                    data: param
                }).then(res => {
                    if (res.code == 1) {
                        this.$message({
                            type: "success",
                            message: "操作成功！"
                        });
                        this.goBack();
                    }
                    this.loading = false;
                });
            }
            this.xtools.openConfirm({
                msg: "您确认审核通过吗？",
                confirmFunc
            });
        },
        // 审核不通过
        do_audit_no() {
            this.$prompt("请输入审核不通过的原因", "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputType: "textarea"
            }).then(({ value }) => {
                this.loading = true;
                let param = { id: this.articleId, audit: false, reason: value };
                this.xAxios({
                    method: "post",
                    url: BASE_PATH + "/article/audit.do",
                    data: param
                }).then(res => {
                    if (res.code == 1) {
                        this.$message({
                            type: "success",
                            message: "操作成功！"
                        });
                        this.goBack();
                    }
                    this.loading = false;
                });
            }).catch(() => {});
        }
    }
};
</script>*/