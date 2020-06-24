<style lang="scss" scoped></style>
<template>
	<section v-loading.fullscreen="loading">
		<el-dialog v-el-drag-dialog :title="title" :visible.sync="dialogVisible" width="600px" :modal-append-to-body='true' :close-on-click-modal="false" top="10vh">
			<el-form ref="form" label-width="70px" :model="formData" :rules="formRules" :disabled="readonly">
				<el-form-item label="名称" prop="name">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
				<el-form-item label="父级" class="is-required">
					<template v-if="readonly">{{formData.parentName}}</template>
					<section v-else style="max-height:300px;overflow:auto;">
						<el-tree :data="parentTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectParentTree"></el-tree>
					</section>
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
		parentId: "",
		parentName: "",
	};
	export default {
		props: ["refreshFunc"],
		data() {
			return {
				loading: false,
				type: 1,
				dialogVisible: false,
				parentTreeData: [],
				formData: this._.cloneDeep(original_data),
				formRules: {
					name: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] },
						{ min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: ['blur', 'change'] },
					],
					parentId: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] }
					],
				},
			}
		},
		computed: {
			readonly() { return this.type == 3; },
			title() { return { 1: "新增", 2: "编辑", 3: "查看" } [this.type] + '部门' },
		},
		methods: {
			getParentTreeData(id, cb) {
				this.xaxios({
					url: '/api/dept/getParentTree',
					params: { id }
				}).then(res => {
					let data = res.data.map(item => {
						return {
							id: item.id,
							parentId: item.parentId,
							name: item.name,
						};
					});
					this.parentTreeData = [{ id: "0", parentId: "-1", name: "顶级", child: this.xtools.arrayToTree(data) }];
					cb && cb();
				});
			},
			openDial(type, id) {
				const _afterGettingData = () => {
					this.dialogVisible = true;
					this.$nextTick(() => {
						this.$refs.form.clearValidate();
						if (this.type == 1 || this.type == 2) {
							this.$refs.selectParentTree && this.$refs.selectParentTree.setCurrentKey(this.formData.parentId);
						}
						this.loading = false;
					});
				};
				this.loading = true;
				this.type = type;
				this.getParentTreeData(id, () => {
					if (this.type === 1) {
						// 新增
						this.formData = this._.cloneDeep(original_data);
						_afterGettingData();
					} else if (this.type === 2 || this.type === 3) {
						// 编辑、查看
						this.xaxios({
							url: "/api/dept/detail.do",
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
				this.formData.parentId = this.$refs.selectParentTree.getCurrentKey();
				if (!this.formData.parentId) {
					this.$message({ message: "请选择父级！", type: 'error', });
					return;
				}
				this.$refs.form.validate().then(() => {
					let param = this._.cloneDeep(this.formData);
					this.loading = true;
					let url = { 1: "add", 2: "edit" } [this.type];
					this.xaxios({
						method: 'post',
						data: param,
						url: `/api/dept/${url}.do`
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