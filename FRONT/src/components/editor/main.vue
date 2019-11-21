<style lang="less">
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
	// 阅读模式
	.editor-readonly-container {
		box-sizing: border-box;
		border: 1px solid #ccc;
		height: 350px;
		padding: 0 10px;
		// 样式重置
		font-size: 14px;
		line-height: normal;
		color: black;
	}
</style>
<template>
	<div v-loading="loading" class="editor-container" :class="{readonly:this.readonly}">
		<section class="editor-readonly-container" v-show="readonly">
			<section v-html="content"></section>
		</section>
		<section v-show="!readonly">
			<textarea :id="tinymceId" class="tinymce-textarea"></textarea>
			<input :id="fileBtnId" type="file" @change="uploadImg" style="display:none;">
		</section>
	</div>
</template>
<script>
	import { menubar } from './config/menubar.js'
	import { toolbar } from './config/toolbar.js'
	import { plugins } from './config/plugins.js'
	export default {
		install(Vue) {
			Vue.component("gc-editor", this);
		},
		props: {
			readonly: {
				default: false
			},
			fcontent: String,
			// 文本框的高度
			height: {
				default: 400
			},
		},
		data() {
			return {
				loading: false,
				tinymceId: "editor-" + this.xtools.randomId(),
				fileBtnId: "fileBtn-" + this.xtools.randomId(),
				tinymceInstance: null,
				content: "",
			}
		},
		watch: {
			fcontent: {
				immediate: true,
				handler(val) {
					this.content = val;
				},
			},
			content(val) {
				// 因为 setContent 会导致光标丢失。所以要先判断一下，内容是否有变化。
				if (val != this.tinymceInstance.getContent()) {
					this.tinymceInstance.setContent(val);
				}
				this.$emit("update:fcontent", val);
			},
			readonly: {
				immediate: true,
				handler(val) {
					// 有可能第一次 initTinymce 已经触发，但还没完成，此时 tinymceInstance 还是 null 。第二次 initTinymce 就来了。
					// 这种情况【记为情况a】就不管了，因为：
					// 1 测试了一下，tinymce 初始化完成大概需要 300ms+ ，很短。在这么短的时间里，readonly 的值要经历 true -> false -> true的变化，几乎是不可能的。
					// 2 即使发生了，也无所谓。对同一个DOM元素第二次初始化不会成功，会进入catch。没影响
					if (!this.tinymceInstance && !val) {
						this.$nextTick(() => {
							this.initTinymce();
						})
					}
				}
			}
		},
		methods: {
			initTinymce() {
				window.tinymce.init({
					selector: "#" + this.tinymceId,
					language: 'zh_CN',
					height: +this.height,
					menubar: menubar,
					toolbar: toolbar,
					fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
					font_formats: "宋体=宋体;仿宋=仿宋;微软雅黑=微软雅黑;楷体=楷体;隶书=隶书;黑体=黑体;幼圆=幼圆;Arial=arial,helvetica,sans-serif;",
					plugins: plugins,
					setup: editor => {
						// 定义按钮，
						editor.addButton('myBtn-imageUpload', {
							text: '',
							tooltip: '上传图片',
							icon: "image",
							onclick: () => {
								const btn = document.querySelector("#" + this.fileBtnId);
								btn.click();
							}
						})
					},
				}).then(([editor]) => {
					editor.on('keyup', e => { this.content = editor.getContent(); });
					editor.on('change', e => { this.content = editor.getContent(); });
					// 第一次 "fcontent 变化 -> content 变化 -> 触发 setContent" 的时候，editor的初始化不一定已经完成了。 所以要在初始化完成之后，手动set一下。
					editor.setContent(this.content);
					this.tinymceInstance = editor;
				}).catch(e => {
					// 如果【情况a】真的发生了，那么第二次初始化不会成功，会进入这里。
				})
			},
			destroyTinymce() {

			},
			uploadImg() {
				const btn = document.querySelector("#" + this.fileBtnId);
				const files = btn.files;
				if (files.length === 0) {
					return;
				}
				const file = files[0];
				const maxSize = 20;
				// 类型验证
				if (file.type.indexOf("image") == -1) {
					this.$message({ message: `请上传图片！`, type: 'error' });
					return;
				}
				// 大小验证
				if (file.size > maxSize * 1024 * 1024) {
					this.$message({ message: `图片大小不允许超过${maxSize}MB！`, type: 'error' });
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
					this.$message({ type: "success", message: "图片上传成功！" });
					const path = "/api/download.do?id=" + res.data;
					this.tinymceInstance.insertContent(`<img src="${path}">`);
					this.loading = false;
				});
			},
		}
	};
</script>