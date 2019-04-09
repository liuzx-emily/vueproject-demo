<template>
    <div id="loginForm" v-loading="loading">
        <section class="loginForm-box">
            <el-input v-model="loginData.username">
                <i class="fa fa-user" slot="prefix"></i>
            </el-input>
        </section>
        <section class="loginForm-box">
            <el-input type="password" v-model="loginData.password">
                <i class="fa fa-unlock-alt" slot="prefix"></i>
            </el-input>
        </section>
        <section class="loginForm-box" id="captchaBox">
            <el-input id="captcha" v-model="loginData.validateCode" @keyup.enter.native="do_login">
                <i class="fa fa-barcode" slot="prefix"></i>
            </el-input>
            <img :src="captchaImgSrc" @click='do_refreshCaptchaImg'>
        </section>
        <div class="loginForm-box">
            <el-button @click="do_login" id="loginBtn">登录</el-button>
        </div>
        <p class="message-tip" id="login_gotoregister">暂无帐号？<a href="register.html">点此注册</a></p>
        <!-- <p id="login_gotoindex"><a href="./qt/index.html">以游客身份访问首页</a></p> -->
    </div>
</template>
<script>
// 全局
import '~/styles/main.scss'
import xTools from '~/utils/xTools.js'
import { xValidate } from '~/utils/xValidate.js'
// 本页
import './main.scss'
export default {
    data() {
        return {
            loading: false,
            captchaImgSrc: BASE_PATH + "/index/captcha.htmls",
            loginData: {
                username: "",
                password: "",
                validateCode: "",
            },
            // 自己封装的校验规则
            xRules: [
                { key: "username", type: ["required", "western"], chs: "用户名", },
                { key: "password", type: ["required"], chs: "密码", },
                { key: "validateCode", type: ["required"], chs: "验证码", },
            ]
        }
    },
    mounted() {},
    methods: {
        do_login() {
            // 使用自己封装的校验函数 xValidate
            if (!xValidate(this.loginData, this.xRules)) {
                return false;
            }
            // loading遮罩层：开
            this.loading = true;
            this.xAxios({
                // 自定义配置项：xJsonData 发送json格式的数据【修改method、headers、JSON化数据】
                xJsonData: true,
                // 自定义配置项：xDonotNeedLoginCheck 该请求不需要登录
                xDonotNeedLoginCheck: true,
                url: BASE_PATH + '/index/login.htmls',
                data: this.loginData,
            }).then((response) => {
                // loading遮罩层：关
                this.loading = false;
                const res = response.data;
                if (res.code == 1) {
                    window.location.href = "./index.html";
                } else {
                    this.$message({
                        message: res.data,
                        type: 'error',
                        showClose: true,
                    });
                    // 清空密码和验证码，刷新验证码图片
                    this.loginData.password = "";
                    this.loginData.validateCode = "";
                    this.do_refreshCaptchaImg();
                }
            }).catch(error => {});
        },
        do_refreshCaptchaImg() {
            this.captchaImgSrc = BASE_PATH + "/index/captcha.htmls?timestamp=" + Math.random();
        }
    }
};
</script>