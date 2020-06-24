<style lang="scss" scoped></style>
<template>
	<section v-loading.fullscreen="loading">
		<el-dialog v-el-drag-dialog :title="title" :visible.sync="dialogVisible" width="700px" :modal-append-to-body='true' :close-on-click-modal="false" top="10vh">
			<el-form ref="form" label-width="100px" :model="formData" :rules="formRules" :disabled="readonly">
				<el-form-item label="帐号" prop="username">
					<el-input v-model="formData.username" :disabled="type!=1"></el-input>
				</el-form-item>
				<el-form-item label="密码" v-if="type==1">
					{{$store.state.user.DEFAULT_PASSWORD}}
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="roleId">
					<el-select v-model="formData.roleId" style="width:100%">
						<el-option v-for="item in roleListData" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" prop="deptId">
					<template v-if="readonly">{{formData.deptName}}</template>
					<template v-else>
						<el-tree :data="deptTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectDeptTree"></el-tree>
					</template>
				</el-form-item>
				<el-form-item label="手机" prop="phone">
					<el-input v-model="formData.phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="formData.email"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" v-if="!readonly">
				<x-button :pretty="false" @click="saveDial">确 定</x-button>
				<x-button @click="dialogVisible = false">取 消</x-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	const original_data = {
		id: null,
		// 账号
		username: "",
		// 昵称
		name: "",
		// 电话
		phone: "",
		// 邮箱
		email: "",
		// 排序
		order: "",
		// 部门id
		deptId: null,
		// 部门名称
		deptName: "",
		// 角色id
		roleId: null,
		// 角色名称
		roleName: ""
	};
	export default {
		props: ["refreshFunc"],
		data() {
			return {
				loading: false,
				type: 1,
				dialogVisible: false,
				deptTreeData: [],
				formData: this._.cloneDeep(original_data),
				formRules: {
					// 账号
					username: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] },
						{ min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
						// 西文验证
						// { validator: this.xElementRules.western, trigger: ['blur', 'change'] },
						// 重名验证
						// { validator: nameValidation, trigger: "blur" },
					],
					// 姓名
					name: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] },
						{ min: 2, max: 20, message: "长度在 2 到20 个字符", trigger: ['blur', 'change'] },
					],
					// 手机
					// phone: [{ validator: this.xElementRules.cellphone, trigger: ['blur', 'change'] }],
					// 邮箱
					email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
					// 部门
					deptId: [{ required: true, message: "不能为空", trigger: ['blur', 'change'] }, ],
					// 角色
					roleId: [{ required: true, message: "不能为空", trigger: ['blur', 'change'] }, ]
				},
				roleListData: []
			}
		},
		computed: {
			readonly() { return this.type == 3; },
			title() { return { 1: "新增", 2: "编辑", 3: "查看" } [this.type] + '人员' },
		},
		created() {
			this.getRoleList();
		},
		methods: {
			nameValidation(rule, value, callback) {
				var param = {
					id: this.formData.id,
					name: this.formData.name
				};
				this.xaxios({
					url: "/api/user/nameValidation.do",
					params: param
				}).then(res => {
					if (res.data) {
						callback();
					} else {
						callback(new Error('存在重名！'));
					}
				});
			},
			getRoleList() {
				this.xaxios({
					url: "/api/role/list.do",
				}).then(res => {
					this.roleListData = res.data;
				});
			},
			getParentTreeData(cb) {
				this.xaxios({
					url: '/api/dept/list.do',
					params: { id: this.formData.id }
				}).then(res => {
					let data = res.data.map(item => {
						return {
							id: item.id,
							parentId: item.parentId,
							name: item.name,
						};
					});
					this.deptTreeData = [{ id: "0", parentId: "-1", name: "顶级", child: this.xtools.arrayToTree(data) }];
					cb && cb();
				});
			},
			openDial(type, id) {
				const _afterGettingData = () => {
					this.dialogVisible = true;
					this.$nextTick(() => {
						this.$refs.form.clearValidate();
						if (this.type == 1 || this.type == 2) {
							this.$refs.selectDeptTree && this.$refs.selectDeptTree.setCurrentKey(this.formData.deptId);
						}
						this.loading = false;
					});
				};
				this.loading = true;
				this.type = type;
				this.getParentTreeData(() => {
					if (this.type === 1) {
						// 新增
						this.formData = this._.cloneDeep(original_data);
						_afterGettingData();
					} else if (this.type === 2 || this.type === 3) {
						// 编辑、查看
						this.xaxios({
							url: "/api/user/detail.do",
							params: { id: id, }
						}).then(res => {
							for (let key in original_data) {
								this.formData[key] = res.data[key]
							}
							this.formData.id = id;
							_afterGettingData();
						});
					}
				});
			},
			saveDial() {
				this.formData.deptId = this.$refs.selectDeptTree.getCurrentKey();
				if (!this.formData.deptId) {
					this.$message({ message: "请选择部门！", type: 'error', });
					return;
				}

				this.$refs.form.validate().then(() => {
					let param = this._.cloneDeep(this.formData);
					if (this.type == 1) {
						param.password = this.$store.state.user.DEFAULT_PASSWORD;
					}
					this.loading = true;
					let url = { 1: "add", 2: "edit" } [this.type];
					this.xaxios({
						method: 'post',
						data: param,
						url: `/api/user/${url}.do`
					}).then(res => {
						if (res.code == 1) {
							this.$message({ message: '操作成功！', type: 'success' });
							this.dialogVisible = false;
							this.refreshFunc();
						} else {
							this.$message({ message: res.message, type: 'error', });
						}
						this.loading = false;
					});
				}).catch(() => {});
			},
		}
	};
</script>