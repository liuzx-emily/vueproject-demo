<template>
	<section id="userBox">
		<el-dropdown>
			<section class="avatar-wrapper">
				<img v-if="userInfo.profilePhoto" class="profilePhoto" :src="userInfo.profilePhoto">
				<i class="fa fa-caret-down dropdown-icon"></i>
			</section>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="openDial_changePassword">修改密码</el-dropdown-item>
				<el-dropdown-item @click.native="openDial_editInfo">个人信息</el-dropdown-item>
				<el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
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
		components: { dialogEditInfo, dialogChangePassword, },
		data() {
			return {
				userInfo: {
					id: "",
					username: "",
					name: "",
					profilePhoto: "",
				},
			}
		},
		created() {
			this.getUserInfo();
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				this.xaxios({
					url: "/api/userInfo.do"
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
						this.$router.push("/login")
					}
				});
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
					url: "/api/logout.do"
				}).then(res => {
					if (res.code == 1) {
						this.$store.state.permission.permissionDataLoaded = false;
						this.$router.push("/login")
					}
				})
			}
		}
	};
</script>