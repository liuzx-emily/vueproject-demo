<style lang="scss">
	.common-upload-one-img-container {
		img {
			display: block;
			max-width: 300px;
			max-height: 200px;
		}
	}
</style>
<template>
	<div v-loading="loading" class="common-upload-one-img-container">
		<el-upload action="用不到，随便填" :http-request="doUploadAttachment" :show-file-list="false" :multiple="false" v-if="!readonly" style="display:inline-block;margin-right:10px" accept="image/*"><!-- magic-remove-comments-ignore-line -->
			<template slot="trigger">
				<x-button v-if="imgUrl" icon="refresh">更换</x-button>
				<x-button v-else icon="upload">上传</x-button>
			</template>
		</el-upload>
		<template v-if="imgUrl">
			<x-button @click="do_download">下载</x-button>
			<x-button color="red" v-if="!readonly" @click="do_delete">删除</x-button>
			<img :src="imgUrl" :style="imgStyle">
		</template>
	</div>
</template>
<script>
	export default {
		install(Vue) {
			Vue.component("x-uploadoneimg", this);
		},
		props: {
			value: {},
			readonly: {
				type: Boolean,
				default: false
			},
			// 最大体积（MB） 
			maxSize: {
				default: 20
			},
			width: {
				default: "150px"
			},
			height: {
				default: "auto"
			},
		},
		computed: {
			imgStyle() {
				return {
					width: this.width,
					height: this.height,
				}
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(val) {
					this.imgUrl = val;
				},
			},
			imgUrl(val) {
				this.$emit("input", val);
			},
		},
		data() {
			return {
				loading: false,
				imgUrl: "",
			}
		},
		methods: {
			// -------------------------------- 上传图片 --------------------------------
			doUploadAttachment(param) {
				const file = param.file;
				// 类型验证
				if (file.type.indexOf("image") == -1) {
					this.$message({
						message: `请上传图片！`,
						type: 'error'
					});
					return;
				}
				// 大小验证
				if (file.size > this.maxSize * 1024 * 1024) {
					this.$message({
						message: `图片大小不允许超过${this.maxSize}MB！`,
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
					this.imgUrl = "/api/download.do?id=" + res.data;
					this.$message({ type: "success", message: "图片上传成功！" });
					this.loading = false;
				});
			},
			do_download() {
				window.location.href = this.imgUrl;
			},
			do_delete() {
				this.imgUrl = "";
			}
		}
	};
</script>