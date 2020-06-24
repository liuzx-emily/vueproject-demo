<style scoped></style>
<template>
	<section v-loading.fullscreen.lock="loading">
		<el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="500px" :modal-append-to-body='false' :close-on-click-modal="false">
			<el-form ref="form" label-width="70px" :model="dialogData" :rules="rules">
				<el-form-item label="帐号">
					<el-input v-model="dialogData.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="dialogData.name"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="dialogData.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="dialogData.email"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<x-uploadoneimg v-model="dialogData.profilePhoto" :canBeDeleted="false" width="50px" height="50px"></x-uploadoneimg>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<x-button :pretty="false" @click="saveDial">确 定</x-button>
				<x-button @click="dialogVisible = false">取 消</x-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	const original_data = {
		// 账号
		username: "",
		// 昵称
		name: "",
		// 电话
		phone: "",
		// 邮箱
		email: "",
		// 头像
		profilePhoto: "",
	};
	import { xElementRules } from '@/utils/x-validate'
	export default {
		props: {
			refreshFunc: {},
		},
		data() {
			return {
				loading: false,
				dialogVisible: false,
				dialogData: this._.cloneDeep(original_data),
				rules: {
					name: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] },
						{ min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
					],
					phone: [
						{ validator: xElementRules.cellphone, trigger: ['blur', 'change'] }
					],
					email: [
						{ type: "email", message: "请输入正确的邮箱地址", trigger: ['blur', 'change'] }
					],
				}
			}
		},
		methods: {
			openDial() {
				this.loading = true;
				this.xaxios({
					url: "/api/user/detail.do",
					params: { id: this.$store.state.userId, }
				}).then(res => {
					for (let key in original_data) {
						this.dialogData[key] = res.data[key]
					}
					this.dialogVisible = true;
					this.$nextTick(() => {
						this.$refs.form.clearValidate();
						this.loading = false;
					});
				});
			},
			saveDial() {
				this.$refs.form.validate(valid => {
					if (valid) {
						let param = this._.cloneDeep(this.dialogData);
						param.id = this.$store.state.userId;
						this.loading = true;
						this.xaxios({
							method: 'post',
							url: "/api/user/edit.do",
							data: param,
						}).then(res => {
							if (res.code == 1) {
								this.$message({
									message: '操作成功！',
									type: 'success'
								});
								this.dialogVisible = false;
								this.refreshFunc && this.refreshFunc();
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