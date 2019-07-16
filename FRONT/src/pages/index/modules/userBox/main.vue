<template>
	<section id="userBox">
		<img v-if="userInfo.profilePhoto" class="profilePhoto" :src="BASE_PATH + userInfo.profilePhoto">
		<span class="username">{{userInfo.name}}</span>
		<i class="fa fa-caret-down"></i>
		<ul>
			<li @click="openDial_changePassword">修改密码</li>
			<li @click="openDial_editInfo">修改个人信息</li>
			<li @click="logout">安全退出</li>
		</ul>
		<!-- 弹窗：修改个人信息 -->
		<dialogEditInfo ref="dialogEditInfo" :refreshFunc="getUserInfo"></dialogEditInfo>
		<!-- 弹窗：修改密码 -->
		<dialogChangePassword ref="dialogChangePassword"></dialogChangePassword>
	</section>
</template>
<script>
import dialogEditInfo from './dialogEditInfo.vue'
import dialogChangePassword from './dialogChangePassword.vue'
export default {
	install(Vue) {
		Vue.component("userBox", this);
	},
	components: { dialogEditInfo, dialogChangePassword, },
	data() {
		return {
			BASE_PATH: BASE_PATH,
			userInfo: {
				id: "",
				username: "",
				name: "",
				profilePhoto: "",
			}
		}
	},
	created() {
		this.getUserInfo();
	},
	methods: {
		// 获取用户信息
		getUserInfo() {
			this.xaxios({
				url: BASE_PATH + "/userInfo.do"
			}).then(res => {
				if (res.code == 1) {
					this.$store.state.userId = res.data.id;
					this.userInfo = {
						id: res.data.id,
						username: res.data.username,
						name: res.data.name,
						profilePhoto: res.data.profilePhoto,
					};
				} else {
					// 未登录
					window.location.href = "./login.html";
				}
			}).catch(error => { });
		},
		// 打开弹窗：修改个人信息
		openDial_editInfo() {
			this.$refs.dialogEditInfo.openDial();
		},
		// 打开弹窗：修改密码
		openDial_changePassword() {
			this.$refs.dialogChangePassword.openDial();
		},
		// 退出
		logout() {
			this.loading = false;
			this.xaxios({
				method: "post",
				url: BASE_PATH + "/logout.do"
			}).then(res => {
				if (res.code == "1") {
					window.location.href = "./login.html";
				}
			})
		}
	}
};
</script>