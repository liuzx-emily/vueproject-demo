<template>
	<section class="login-container">
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
				<img class="captchaImg" :src="captchaImgSrc" @click='do_refreshCaptchaImg'>
			</section>
			<div class="loginForm-box">
				<el-button @click="do_login" id="loginBtn">登录</el-button>
			</div>
		</div>
	</section>
</template>
<script>
	import { xValidate } from '@/utils/x-validate'
	const captchaImgSrc_raw = "/api/captcha.nb";
	export default {
		data() {
			return {
				loading: false,
				captchaImgSrc: captchaImgSrc_raw,
				loginData: {
					username: "shucaixiaoming",
					password: "123456",
					validateCode: "",
				},
				// 自己封装的校验规则
				xRules: [
					{ key: "username", type: ["required", "western"], chs: "用户名", },
					{ key: "password", type: ["required"], chs: "密码", },
					// { key: "validateCode", type: ["required"], chs: "验证码", },
				]
			}
		},
		created() {
			const errorMsg = this.$route.query.errorMsg;
			if (errorMsg == 1) {
				this.$message({ message: "登录超时，请重新登录！", type: 'error' });
				this.$router.push({ path: '/login' })
			}
		},
		methods: {
			do_login() {
				// 使用自己封装的校验函数 xValidate
				if (!xValidate(this.loginData, this.xRules)) {
					return false;
				}
				this.loading = true;
				this.xaxios({
					method: "post",
					url: "/api/login.nb",
					data: this.loginData,
				}).then(res => {
					this.loading = false;
					if (res.code == 1) {
						this.$router.push("/");
					} else {
						this.$message({ message: res.message, type: 'error', showClose: true, });
						// 清空密码和验证码，刷新验证码图片
						this.loginData.password = "";
						this.loginData.validateCode = "";
						this.do_refreshCaptchaImg();
					}
				});
			},
			do_refreshCaptchaImg() {
				this.captchaImgSrc = captchaImgSrc_raw + "?timestamp=" + Math.random();
			}
		}
	};
</script>
<style lang="scss">
	.login-container {
		background: #304156;
		padding-top: calc((100vh - 400px)/2);
		min-height: 100vh;
		box-sizing: border-box;
		#loginForm {
			width: 320px;
			margin: 0 auto;
			border-radius: 5px;
			padding: 50px;
			background: #263445;
			// box
			.loginForm-box {
				margin: 20px 0;
				.el-input {
					.el-input__inner {
						font-size: 18px;
						height: 45px;
						line-height: 45px;
						padding-left: 35px;
					}
					.el-input__prefix {
						// padding: 11px 10px 0;
						i.fa {
							color: #304156;
							font-size: 16px;
							position: relative;
							top: 14px;
							left: 7px;
							// 二维码的图比较宽，需要手动挪一下
							&.fa-barcode {
								font-size: 16px;
								left: 5px;
							}
						}
					}
				}
			}
			// 验证码box
			#captchaBox {
				.el-input {
					width: 160px;
				}
				.captchaImg {
					vertical-align: top;
					width: 150px;
					height: 45px;
					margin-left: 10px;
					cursor: pointer;
				}
			}
			#loginBtn {
				width: 100%;
				background: #ffc107;
				color: white;
				border: none;
				padding: 10px 0;
				font-size: 14px;
			}
		}
	}
</style>