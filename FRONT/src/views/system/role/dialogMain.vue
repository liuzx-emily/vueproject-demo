<style lang="scss" scoped></style>
<template>
	<section v-loading.fullscreen="loading">
		<el-dialog v-el-drag-dialog :title="title" :visible.sync="dialogVisible" width="700px" :modal-append-to-body='true' :close-on-click-modal="false" top="10vh">
			<el-form ref="form" label-width="100px" :model="formData" :rules="formRules" :disabled="readonly">
				<el-form-item label="名称" prop="name">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<section class="common-limitedHeight-tree">
						<el-tree :data="permissionTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :show-checkbox="true" :check-strictly="true" ref="selectPermissionTree" @check-change="checkChange"></el-tree>
					</section>
				</el-form-item>
				<el-form-item label="备注" prop="description">
					<el-input type="textarea" v-model="formData.description"></el-input>
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
		id: "",
		name: "",
		description: "",
		permissionIds: [],
	};
	export default {
		props: ["refreshFunc"],
		data() {
			return {
				loading: false,
				type: 1,
				dialogVisible: false,
				permissionTreeData: [],
				formData: this._.cloneDeep(original_data),
				formRules: {
					name: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] },
						{ min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
						// 重名验证
						// { validator: this.nameValidation, trigger: "blur" }
					],
					type: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] }
					],
				},
			}
		},
		computed: {
			readonly() { return this.type == 3; },
			title() { return { 1: "新增", 2: "编辑", 3: "查看" } [this.type] + '角色' },
		},
		created() {
			this.getAllPermissionData();
		},
		methods: {
			checkChange(data, beingChecked) {
				const checkNode = (id, checked) => {
					return this.$refs.selectPermissionTree.setChecked(id, checked, false);
				};
				if (beingChecked) {
					// 选中我的父级
					checkNode(data.parentId, true)
				} else {
					// 取消我的子级
					const children = data.child;
					children && children.forEach(child => {
						checkNode(child.id, false);
					});
				}
			},
			getAllPermissionData() {
				this.xaxios({
					url: "/api/permission/list.do",
				}).then(res => {
					this.permissionTreeData = this.xtools.arrayToTree(res.data, {
						id: "id",
						parentId: "parentId",
						children: 'child'
					});
				});
			},
			openDial(type, id) {
				const _afterGettingData = () => {
					this.dialogVisible = true;
					this.$nextTick(() => {
						this.$refs.form.clearValidate();

						this.$refs.selectPermissionTree.setCheckedKeys(this.formData.permissionIds);

						this.loading = false;
					});
				};

				this.loading = true;
				this.type = type;
				if (this.type === 1) {
					// 新增
					this.formData = this._.cloneDeep(original_data);
					this.formData.permissionIds = [];
					_afterGettingData();
				} else if (this.type === 2 || this.type === 3) {
					// 编辑、查看
					this.xaxios({
						url: "/api/role/detail.do",
						params: { id: id, }
					}).then(res => {
						for (let key in original_data) {
							this.formData[key] = res.data[key]
						}
						this.formData.id = id;
						_afterGettingData();
					});
				}
			},
			saveDial() {
				this.$refs.form.validate().then(() => {
					let param = this._.cloneDeep(this.formData);
					let permissionIds = this.$refs.selectPermissionTree.getCheckedKeys();
					param.permissionIds = permissionIds;
					this.loading = true;
					let url = { 1: "add", 2: "edit" } [this.type];
					this.xaxios({
						method: 'post',
						data: param,
						url: `/api/role/${url}.do`
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