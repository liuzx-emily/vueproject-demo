<style lang="scss">
	.editor-container {
		.mce-top-part::before,
		.mce-top-part::after {
			box-shadow: none;
		}
		.mce-tinymce {
			width: auto !important;
			box-shadow: none;
		}
		.mce-statusbar {
			display: none;
		}
	}
	.editor-container.readonly {
		.mce-top-part {
			display: none;
		}
		.mce-edit-area {
			border-top: 0;
		}
	}
	.editor-readonly-container {
		box-sizing: border-box;
		border: 1px solid #ccc;
		height: 350px;
		padding: 0 10px;
		font-size: 14px;
		line-height: normal;
		color: black;
		overflow: auto;
	}
</style>
<template>
	<div v-loading="loading" class="editor-container" :class="{readonly:this.readonly}">
		<section class="editor-readonly-container" v-show="readonly">
			<section v-html="content"></section>
		</section>
		<section v-show="!readonly">
			<textarea :id="tinymceId" class="tinymce-textarea"></textarea>
			<input type="file" @change="uploadImg" accept="image/*" style="display:none;" ref="uploadImageBtn"><!-- magic-remove-comments-ignore-line -->
		</section>
	</div>
</template>
<script>
	import { menubar } from './config/menubar.js'
	import { toolbar } from './config/toolbar.js'
	import { plugins } from './config/plugins.js'
	export default {
		install(Vue) {
			Vue.component("x-editor", this);
		},
		props: {
			readonly: {
				default: false
			},
			fcontent: String,
			height: {
				default: 400
			},
			uploadImgUsingBase64: {
				type: Boolean,
				default: false
			}
		},
		components: {},
		data() {
			return {
				loading: false,
				tinymceId: "editor-" + this.xtools.uuid(6),
				content: "",
				has_not_been_initialized: true,
			}
		},
		watch: {
			content() {
				this.$emit("update:fcontent", this.content);
			},
			readonly: {
				immediate: true,
				handler(val) {
					if (this.has_not_been_initialized && !val) {
						this.$nextTick(() => {
							this.initTinymce();
						})
					}
				}
			}
		},
		methods: {
			initTinymce() {
				this.has_not_been_initialized = false;
				window.tinymce.init({
					selector: "#" + this.tinymceId,
					language: 'zh_CN',
					height: +this.height,
					menubar: menubar,
					toolbar: toolbar,
					fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
					font_formats: "宋体=宋体;" +
						"仿宋=仿宋;" +
						"微软雅黑=微软雅黑;" +
						"楷体=楷体;" +
						"隶书=隶书;" +
						"黑体=黑体;" +
						"幼圆=幼圆;" +
						"Arial=arial,helvetica,sans-serif;",
					plugins: plugins,
					setup: editor => {
						// 定义按钮，
						editor.addButton('myBtn-imageUpload', {
							text: '',
							tooltip: '上传图片',
							icon: "image",
							onclick: () => {
								const btn = this.$refs.uploadImageBtn;
								btn.click();
							}
						})
					},
					init_instance_callback: editor => {
						editor.on('keyup', () => {
							this.content = this.getContent();
						});
						editor.on('change', () => {
							this.content = this.getContent();
						});
					}
				}).then(() => {
					// 如果编辑器放在弹窗中，那么第一次 setContent 的时候，可能编辑器还没初始化完。
					// 所以在初始化完成时，要赋值
					this.content && this.setContent(this.content);
				})
			},
			uploadImg() {
				const btn = this.$refs.uploadImageBtn;
				const files = btn.files;
				if (files.length === 0) {
					return;
				}
				const file = files[0];
				const maxSize = 20;
				if (file.type.indexOf("image") == -1) {
					this.$message({ message: `请上传图片！`, type: 'error' });
					return;
				}
				if (file.size > maxSize * 1024 * 1024) {
					this.$message({ message: `图片大小不允许超过${maxSize}MB！`, type: 'error' });
					return;
				}
				if (this.uploadImgUsingBase64) {
					var reader = new FileReader();
					reader.onload = () => {
						window.tinymce.get(this.tinymceId).insertContent(`<img src="${reader.result}">`);
					};
					reader.readAsDataURL(file);
				} else {
					this.loading = true;
					var data = new FormData();
					data.append("file", file);
					this.xaxios({
						method: 'post',
						url: "/api/enclosure/upload",
						data: data,
					}).then(res => {
						if (res.code == 1) {
							this.$message({ type: "success", message: "图片上传成功！" });
							let url = `/api/enclosure/view?id=${res.data.id}`;
							this.insertImg(url);
						} else {
							this.$message({ message: res.message, type: 'error', });
						}
						this.loading = false;
					});
				}
			},
			setContent(value) {
				if (!this.readonly) {
					this.$nextTick(() => {
						window.tinymce.get(this.tinymceId).setContent(value);
					})
				}
				this.content = value;
			},
			getContent() {
				return window.tinymce.get(this.tinymceId).getContent();
			},
			insertImg(imgSrc) {
				window.tinymce.get(this.tinymceId).insertContent(`<img src="${imgSrc}">`);
			}
		}
	};
</script>