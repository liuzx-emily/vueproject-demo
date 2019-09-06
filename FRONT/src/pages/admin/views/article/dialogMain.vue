<style scoped></style>
<template>
	<section v-loading.fullscreen.lock="loading">
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="1000px" :modal-append-to-body='true' :close-on-click-modal="false">
			<div style="text-align:center">
				<template v-if="dialogType==1||dialogType==2">
					<x-button @click="saveDial(false)">保存</x-button>
					<x-button @click="saveDial(true)" color="green">提交</x-button>
					<x-button @click="dialogVisible = false">取 消</x-button>
				</template>
				<template v-if="dialogType==4">
					<x-button @click="do_audit_yes">审核通过</x-button>
					<x-button @click="do_audit_no">审核不通过</x-button>
					<x-button @click="dialogVisible = false">取 消</x-button>
				</template>
			</div>
			<el-form ref="form" label-width="70px" :model="dialogData" :rules="rules" @submit.native.prevent :disabled="readonly" style="margin-top:10px">
				<el-form-item label="" v-if="dialogData.state==4">
					<span style="font-size:14px;font-weight:bold;color:crimson">审核未通过，原因：{{dialogData.reason}}</span>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input v-model="dialogData.title"></el-input>
				</el-form-item>
				<el-form-item label="发布人" prop="publisher" style="display:inline-block;width:50%;">
					<el-input v-model="dialogData.publisher"></el-input>
				</el-form-item>
				<el-form-item label="发布时间" prop="publishTime" style="display:inline-block;">
					<el-date-picker v-model="dialogData.publishTime" type="date" value-format="timestamp" style="width:140px;"></el-date-picker>
				</el-form-item>
				<el-form-item label="附件">
					<gm-upload :flist.sync="dialogData.fileList" :readonly="readonly" />
				</el-form-item>
				<el-form-item label="内容">
					<gc-editor :fcontent.sync="dialogData.content" :readonly="readonly"></gc-editor>
				</el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>
<script>
import original_data from './data/dialogMainData.js';
export default {
	props: {
		refreshFunc: {
			type: Function,
			default: () => { },
		},
	},
	data() {
		return {
			loading: false,
			dialogVisible: false,
			dialogType: 1,
			dialogData: this._.cloneDeep(original_data),
			rules: {
				title: [
					{ required: true, message: "不能为空", trigger: ["blur", "change"] },
					{ min: 1, max: 100, message: "长度在 1 到 100 个字符", trigger: ["blur", "change"] }
				],
				publisher: [
					{ required: true, message: "不能为空", trigger: ["blur", "change"] },
					{ min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: ["blur", "change"] }
				],
				publishTime: [
					{ required: true, message: "不能为空", trigger: ["blur", "change"] }
				],
			}
		}
	},
	computed: {
		readonly() { return this.dialogType == 3 || this.dialogType == 4; },
		dialogTitle() { return { 1: "新增", 2: "编辑", 3: "查看" }[this.dialogType] || ""; },
	},
	methods: {
		openDial(type, id) {
			const afterGettingData = () => {
				this.dialogVisible = true;
				this.$nextTick(() => {
					this.$refs.form.clearValidate();
					this.loading = false;
				});
			};
			this.loading = true;
			this.dialogType = type;
			if (type == 1) {
				// 新增
				this.dialogData = this._.cloneDeep(original_data);
				afterGettingData();
			} else if (type == 2 || type == 3 || type == 4) {
				// 编辑、查看
				this.xaxios({
					url: "/api/article/detail.do",
					params: { id: id, }
				}).then(res => {
					for (let key in original_data) {
						this.dialogData[key] = res.data[key]
					}
					this.dialogData.id = id;
					afterGettingData();
				});
			}
		},
		saveDial(submitFlag) {
			// submitFlag true提交 false保存
			if (submitFlag) {
				const confirmFunc = () => { this.save(submitFlag); };
				this.xtools.openConfirm({ msg: "提交后信息无法再次更改，确定提交吗？", confirmFunc });
			} else {
				this.save(submitFlag);
			}
		},
		save(submitFlag) {
			// 附件和内容至少填一个
			if (this.dialogData.content.length == 0 && this.dialogData.fileList.length == 0) {
				this.$message({ message: "内容和附件不能同时为空！", type: "warning", showClose: true });
				return;
			}
			this.$refs.form.validate().then(() => {
				let param = this._.cloneDeep(this.dialogData);
				// 附件
				param.fileList = this._.map(this.dialogData.fileList, "id");
				// state 1未提交 2待审核 3审核通过 4审核不通过
				// 审核状态：状态为审核不通过，点击保存，审核状态不变
				if (param.state == 4 && !submitFlag) {
					param.state = 4;
				} else {
					param.state = submitFlag ? 2 : 1;
				}
				this.loading = true;
				this.xaxios({
					method: 'post',
					url: `/api/article/${this.dialogType == 1 ? "add" : "edit"}.do`,
					data: param,
				}).then(res => {
					if (res.code == 1) {
						this.$message({ message: '操作成功！', type: 'success' });
						this.dialogVisible = false;
						this.refreshFunc();
					}
					this.loading = false;
				});
			}).catch();
		},
		// 审核通过
		do_audit_yes() {
			const confirmFunc = () => {
				this.loading = true;
				let param = { id: this.dialogData.id, audit: true };
				this.xaxios({
					method: "post",
					url: "/api/article/audit.do",
					data: param
				}).then(res => {
					if (res.code == 1) {
						this.$message({ type: "success", message: "操作成功！" });
						this.dialogVisible = false;
						this.refreshFunc();
					}
					this.loading = false;
				});
			}
			this.xtools.openConfirm({ msg: "您确认审核通过吗？", confirmFunc });
		},
		// 审核不通过
		do_audit_no() {
			this.$prompt("请输入审核不通过的原因", "", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				inputType: "textarea",
				customClass: 'general-confirm-box'
			}).then(({ value }) => {
				this.loading = true;
				let param = { id: this.dialogData.id, audit: false, reason: value };
				this.xaxios({
					method: "post",
					url: "/api/article/audit.do",
					data: param
				}).then(res => {
					if (res.code == 1) {
						this.$message({ type: "success", message: "操作成功！" });
						this.dialogVisible = false;
						this.refreshFunc();
					}
					this.loading = false;
				});
			}).catch(() => { });
		}
	}
};
</script>