<style lang="scss" scoped>
	.xUpload-container {
		margin: 0;

		ul {
			li {
				display: inline-block;
				margin-right: 20px;
				font-size: 12px;

				i.fa.icon {
					font-size: 14px;
					color: #1E88E5;
					margin-right: 5px;
					vertical-align: middle;
				}

				a.fileName {
					text-decoration: underline;
					cursor: pointer;
					color: #1e5494;
				}

				i.fa.deleteBtn {
					color: #f56c6c;
					font-size: 16px;
					margin-left: 5px;
					position: relative;
					top: 2px;
					cursor: pointer;
				}
			}
		}
	}
</style><template>
	<div v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)" class="xUpload-container">
		<!-- 编辑模式 -->
		<template v-if="!readonly">
			<!-- 上传附件 -->
			<el-upload action="用不到，随便填" :http-request="doUploadAttachment" :show-file-list="false" :multiple="true">
				<el-button size="mini" type="primary" slot="trigger">上传附件</el-button>
			</el-upload>
			<ul>
				<li v-for="file in list" :key="file.id">
					<i class="fa fa-paperclip icon"></i>
					<a @click="do_download(file)" title="下载" class="fileName">{{file.name}}</a>
					<i @click="do_delete(index)" class="fa fa-trash deleteBtn" title="删除"></i>
				</li>
			</ul>
		</template>
		<!-- 阅读模式 -->
		<template v-else>
			<ul v-if="list.length>0">
				<li v-for="file in list" :key="file.id">
					<i class="fa fa-paperclip icon"></i>
					<a @click="do_download(file)" title="点击下载" class="fileName">{{file.name}}</a>
				</li>
			</ul>
			<template v-else>无</template>
		</template>
	</div>
</template>
<script>
	export default {
		install(Vue) {
			Vue.component("x-upload", this);
		},
		props: {
			value: {
				type: Array,
				default: () => { return []; }
			},
			readonly: {
				type: Boolean,
				default: false
			},
		},
		watch: {
			value: {
				immediate: true,
				handler(val) {
					// 注意：这里不能深拷贝，因为会触发list变化 -> 触发flist变化 -> 触发list变化。。无限循环。
					// this.list = this._.cloneDeep(val) || [];
					this.list = val || [];
				},
			},
			list(val) {
				this.$emit("input", val);
			},
		},
		components: {},
		data() {
			return {
				loading: false,
				list: []
			};
		},
		methods: {
			// -------------------------------- 上传附件 --------------------------------
			doUploadAttachment(param) {
				const file = param.file;
				if (file.size / 1024 / 1024 > 20) {
					this.$message({
						message: '文件大小不允许超过20MB！',
						type: 'error'
					});
					return;
				}
				this.loading = true;
				var data = new FormData();
				data.append("file", file);
				data.append("fileName", file.name);
				this.xaxios({
					method: 'post',
					url: "/api/upload.do",
					data: data
				}).then(res => {
					this.list.push({ id: res.data, name: file.name })
					this.$message({ type: "success", message: "附件上传成功！" });
					this.loading = false;
				}).catch(error => {
					console.error(error);
					this.loading = false;
				});
			},
			do_download(file) {
				window.location.href = "/api/download.do?id=" + file.id;
			},
			do_delete(index) {
				this.list.splice(index, 1);
			}
		}
	};
</script>