<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)" id="userBox">
        <section class="userinfo">
            <span class="userinfo_username">{{$store.state.userInfo.name}}</span>
            <i class="fa fa-caret-down"></i>
            <ul>
                <li @click="changePW_openDial">修改密码</li>
                <li @click="openDial">修改个人信息</li>
                <li @click="logout">安全退出</li>
            </ul>
        </section>
        <!-- 用户弹窗 -->
        <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="500px" :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form ref="dialogForm1" label-width="75px" style="width:450px;" :model="dialogData" :rules="dialogRule1" status-icon>
                <el-form-item label="帐号">
                    <el-input v-model="dialogData.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="dialogData.realname"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="dialogData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="dialogData.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDial">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改密码弹窗 -->
        <el-dialog title="修改密码" :visible.sync="changePW_dialogVisible" width="500px" :modal-append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form ref="changePW_dialogForm" label-width="85px" style="width:450px;" :model="changePW_dialogData" :rules="changePW_dialogRule" status-icon>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="changePW_dialogData.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password_repeat">
                    <el-input v-model="changePW_dialogData.password_repeat" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changePW_dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePW_saveDial">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
export default {
    name: "UserInfo",
    props: {},
    computed: {},
    data: function() {
        var phoneValidation = (rule, value, callback) => {
            if (value && value.length > 0) {
                if (/^1\d{10}$/.test(value)) {
                    return callback();
                } else {
                    // 输错了
                    callback(new Error("请输入正确的手机号码！"));
                }
            } else {
                // 无输入
                return callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (this.changePW_dialogData.password_repeat !== "") {
                this.$refs.changePW_dialogForm.validateField("password_repeat");
            }
            callback();
        };
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.changePW_dialogData.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            // -------------------------------- 用户弹窗相关数据 --------------------------------
            dialogVisible: false,
            // 弹窗中的数据
            dialogData: {
                username: "",
                realname: "",
                phone: "",
                email: ""
            },
            // 数据校验
            dialogRule1: {
                // 姓名
                realname: [
                    { required: true, message: "不能为空", trigger: ["blur", "change"] },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在 2 到20 个字符",
                        trigger: ["blur", "change"]
                    }
                ],
                // 手机
                phone: [{ validator: phoneValidation, trigger: ["blur", "change"] }],
                // 邮箱
                email: [{
                    type: "email",
                    message: "请输入正确的邮箱地址",
                    trigger: ["blur", "change"]
                }]
            },
            changePW_dialogVisible: false,
            changePW_dialogData: {
                password: "",
                password_repeat: ""
            },
            changePW_dialogRule: {
                password: [
                    { required: true, message: "不能为空", trigger: ["blur", "change"] },
                    {
                        min: 4,
                        max: 12,
                        message: "长度在 4 到 12 个字符",
                        trigger: ["blur", "change"]
                    },
                    { validator: validatePass, trigger: ["blur", "change"] }
                ],
                password_repeat: [
                    { required: true, message: "不能为空", trigger: ["blur", "change"] },
                    {
                        min: 4,
                        max: 12,
                        message: "长度在 4 到 12 个字符",
                        trigger: ["blur", "change"]
                    },
                    { validator: validatePass2, trigger: ["blur", "change"] }
                ]
            }
        };
    },
    mounted() {},
    watch: {},
    methods: {
        // -------------------- 修改用户信息 --------------------
        // 打开弹窗
        openDial() {
            this.loading = true;
            this.xAxios({
                    method: "get",
                    url: BASE_PATH + "/user/detail.htmls",
                    params: {
                        userId: this.$store.state.userInfo.id
                    }
                })
                .then(response => {
                    const res = response.data;
                    this.dialogData = {
                        username: res.username,
                        realname: res.realname,
                        phone: res.phone,
                        email: res.email
                    };
                    this.dialogVisible = true;
                    this.loading = false;
                })
                .catch(error => {});
        },
        // 弹窗保存
        saveDial() {
            this.$refs.dialogForm1.validate(valid => {
                if (valid) {
                    // ajax请求
                    let param = {
                        userId: this.$store.state.userInfo.id,
                        realname: this.dialogData.realname,
                        phone: this.dialogData.phone,
                        email: this.dialogData.email
                    };
                    this.loading = true;
                    this.xAxios({
                            method: "post",
                            url: BASE_PATH + "/user/edit.htmls",
                            data: JSON.stringify(param),
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            }
                        })
                        .then(response => {
                            const res = response.data;
                            if (res.code == 1) {
                                // 关闭弹窗
                                this.$message({
                                    message: "修改成功！",
                                    type: "success"
                                });
                                this.dialogVisible = false;
                                this.$store.state.userInfo.name = this.dialogData.realname;
                            }
                            this.loading = false;
                        })
                        .catch(error => {});
                } else {
                    return false;
                }
            });
        },

        // -------------------- 修改密码 --------------------
        // 打开弹窗
        changePW_openDial() {
            // 清空数据
            this.changePW_dialogData = {
                password: "",
                password_repeat: ""
            };
            this.changePW_dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.changePW_dialogForm.clearValidate();
            });
        },
        // 弹窗保存
        changePW_saveDial() {
            this.$refs.changePW_dialogForm.validate(valid => {
                if (valid) {
                    // ajax请求
                    let param = {
                        userId: this.$store.state.userInfo.id,
                        password: this.changePW_dialogData.password
                    };
                    this.loading = true;
                    this.xAxios({
                            method: "post",
                            url: BASE_PATH + "/user/revert.htmls",
                            params: param
                        })
                        .then(response => {
                            const res = response.data;
                            if (res.code == 1) {
                                // 提示成功
                                this.$message({
                                    type: "success",
                                    message: "修改密码成功！"
                                });
                                // 关闭弹窗
                                this.changePW_dialogVisible = false;
                            }
                            this.loading = false;
                        })
                        .catch(error => {});
                } else {
                    return false;
                }
            });
        },
        // 退出
        logout() {
            this.loading = false;
            this.xAxios({
                    method: "post",
                    url: BASE_PATH + "/index/logout.htmls"
                })
                .then(response => {
                    const res = response.data;
                    if (res.code == "1") {
                        window.location.href = "./login.html";
                    }
                })
                .catch(error => {});
        }
    }
};
</script>