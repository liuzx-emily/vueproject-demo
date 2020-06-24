<style lang="scss" scoped>
	.select-icon-container {
		position: relative;
		z-index: 2;
		$height: 30px;
		.selected-icon {
			height: $height;
			line-height: $height;
			border: 1px solid #ddd;
			cursor: pointer;
			padding-left: 15px;
			border-radius: 4px;
			position: relative;
			.name {
				position: relative;
				.clear {
					opacity: 0;
					position: absolute;
					right: 30px;
					top: 0px;
					color: #777;
					padding: 0 15px;
					transition: opacity 0.2s;
				}
				&:hover .clear {
					opacity: 1;
				}
			}
			.icon-filter-input {
				display: block;
				width: 100%;
				outline: none;
				border: none;
				height: $height;
				line-height: $height;
				box-sizing: border-box;
			}
			.toggle {
				position: absolute;
				right: 0;
				top: 0px;
				font-size: 18px;
				color: #bbb;
				transition: transform 0.2s;
				padding: 0 15px;
				&.rotate {
					transform: rotate(-180deg);
				}
			}
		}
		.dropdown {
			position: absolute;
			background: white;
			line-height: normal;
			border: 1px solid #ddd;
			border-top: none;
			width: 100%;
			height: 300px;
			overflow: auto;
			box-sizing: border-box;
			.icon-container {
				margin: 5px 6px;
				display: inline-block;
				width: 18px;
				height: 18px;
				cursor: pointer;
				i {
					font-size: 16px;
					color: #777;
					transition: color 0.2s;
				}
				&.selected {
					i {
						color: #ff9800;
					}
				}
			}
		}
	}
</style>
<template>
	<section v-loading.fullscreen="loading">
		<el-dialog v-el-drag-dialog :title="title" :visible.sync="dialogVisible" width="800px" :modal-append-to-body='true' :close-on-click-modal="false" top="10vh">
			<el-form ref="form" label-width="120px" :model="formData" :rules="formRules" :disabled="readonly">
				<el-form-item label="名称" prop="name">
					<el-input v-model="formData.name"></el-input>
				</el-form-item>
				<el-form-item label="在导航中显示" prop="showInNavigation">
					<el-radio-group v-model="formData.showInNavigation">
						<el-radio :label="1">是</el-radio>
						<el-radio :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="是外部链接" prop="isExternalLink" v-if="formData.showInNavigation===1">
					<el-radio-group v-model="formData.isExternalLink">
						<el-radio :label="1">是</el-radio>
						<el-radio :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="code" prop="code">
					<el-input v-model="formData.code"></el-input>
				</el-form-item>
				<el-form-item label="icon" prop="icon" v-if="formData.showInNavigation==1">
					<section class="select-icon-container">
						<section class="selected-icon" @click="handleClickSelectedIcon">
							<div v-if="formData.icon" class="name" v-show="!showIconDropdown">
								<i class="fa" :class="formData.icon" style="margin-right:2px;"></i>
								{{formData.icon}}
								<span class="clear" @click.stop="formData.icon=''">
									<i class="fa fa-times"></i>
								</span>
							</div>
							<input type="text" v-model="iconFilterTxt" v-show="showIconDropdown" @click.stop ref="iconFilterInput" class="icon-filter-input" :placeholder="formData.icon">
							<span class="toggle" :class="{rotate:showIconDropdown}">
								<i class="fa fa-angle-down"></i>
							</span>
						</section>
						<section class="dropdown" v-show="showIconDropdown">
							<span v-for="(icon,index) in iconList" :key="index" class="icon-container" :class="{selected:icon==formData.icon}" @click="handleClickIcon(icon)" :title="icon">
								<i class="fa" :class="icon"></i>
							</span>
						</section>
					</section>
				</el-form-item>
				<el-form-item label="父级">
					<template v-if="readonly">{{formData.parentName}}</template>
					<section v-else class="common-limitedHeight-tree">
						<el-tree :data="parentTreeData" node-key="id" :props="{label: 'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" ref="selectParentTree"></el-tree>
					</section>
				</el-form-item>
				<el-form-item label="排序" prop="order">
					<el-input-number v-model="formData.order"></el-input-number>
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
		showInNavigation: 1,
		isExternalLink: 0,
		code: "",
		parentId: "",
		parentName: "",
		icon: "",
		order: "",
	};
	import iconList from './iconList'
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
						{ min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: ['blur', 'change'] },
					],
					code: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] }
					],
					parentId: [
						{ required: true, message: "不能为空", trigger: ['blur', 'change'] }
					],
				},
				showIconDropdown: false,
				iconFilterTxt: "",
			}
		},
		computed: {
			readonly() { return this.type == 3; },
			title() { return { 1: "新增", 2: "编辑", 3: "查看" } [this.type] + '权限' },
			iconList() {
				if (this.iconFilterTxt.length > 0) {
					return iconList.filter(o => {
						return o.includes(this.iconFilterTxt);
					})
				} else {
					return iconList;
				}
			}
		},
		methods: {
			handleClickSelectedIcon() {
				if (this.showIconDropdown) {
					this.showIconDropdown = false;
				} else {
					this.showIconDropdown = true;
					this.$nextTick(() => {
						this.iconFilterTxt = "";
						this.$refs.iconFilterInput.focus();
					})
				}
			},
			handleClickIcon(icon) {
				this.formData.icon = icon;
				this.showIconDropdown = false;
			},
			getParentTreeData(id, cb) {
				this.xaxios({
					url: '/api/permission/getParentTree',
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
						this.showIconDropdown = false;
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
							url: "/api/permission/detail.do",
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
						url: `/api/permission/${url}.do`
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