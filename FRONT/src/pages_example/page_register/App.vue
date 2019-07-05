<template>
    <section id="loginForm" v-loading="loading">
        <el-form ref="form" :model="registerData" :rules="rules" label-width="60px">
            <el-form-item prop="username" label="账号">
                <el-input v-model="registerData.username"></el-input>
                <!-- <div style="position: absolute;top: 28px;font-size: 12px;color: #555;">
                    默认密码：{{DEFAULT_PASSWORD}}
                </div> -->
            </el-form-item>
            <el-form-item label="密码">
                {{registerData.password}}
            </el-form-item>
            <el-form-item prop="realname" label="姓名">
                <el-input v-model="registerData.realname"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="电话">
                <el-input v-model="registerData.phone"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="registerData.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="do_register" id="loginBtn">注册</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
export default {
    data() {
        // 用户重名验证，西文验证
        var nameValidation = (rule, value, callback) => {
            var param = {
                username: value
            };
            this.xAxios({
                xDonotNeedLoginCheck: true,
                method: 'get',
                url: BASE_PATH + '/user/verification.htmls',
                params: param
            }).then(res => {
                if (res.code == 1) {
                    callback();
                } else {
                    callback(new Error('存在重名！'));
                }
            }).catch(error => {});
        };

        return {
            loading: false,
            registerData: {
                username: "123",
                password: DEFAULT_PASSWORD,
                realname: "123",
                phone: "",
                email: ""
            },
            rules: {
                // 账号
                username: [
                    { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
                    // 西文验证，使用自己封装的xElementRules
                    { validator: this.xElementRules.western, trigger: ['blur', 'change'] },
                    // 重名验证
                    // { validator: nameValidation, trigger: "blur" }
                ],
                // 姓名
                realname: [
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
                ]
            }
        }
    },
    computed: {},
    created() {},
    mounted() {
        // this.$refs.form.clearValidate();
    },
    methods: {
        do_register() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    let param = this._.cloneDeep(this.registerData);
                    this.xAxios({
                        // 自定义配置项：xJsonData 发送json格式的数据【修改method、headers、JSON化数据】
                        xJsonData: true,
                        // 自定义配置项：xDonotNeedLoginCheck 该请求不需要登录
                        xDonotNeedLoginCheck: true,
                        url: BASE_PATH + '/user/add.htmls',
                        data: param,
                    }).then(res => {
                        this.loading = false;
                        if (res.code == 1) {
                            this.$msgbox({
                                title: '',
                                message: "注册成功！（请耐心等待管理员审核，审核通过后方可登录！）",
                                type: 'success',
                                showCancelButton: false,
                                showConfirmButton: true,
                                confirmButtonText: "知道了",
                                showClose: false,
                                closeOnClickModal: false,
                                closeOnPressEscape: false
                            }).then(() => {
                                // 点击确认，会进then

                            }).catch(() => {
                                // 点击取消、点击x、点击遮罩层、按esc，都会进catch
                            });
                        } else {
                            this.$message({
                                message: '注册失败！',
                                type: 'error'
                            });
                        }
                    }).catch(() => {});
                } else {
                    return false;
                }
            });
        }
    }
};
</script>