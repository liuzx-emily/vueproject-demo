<template>
	<div class="editor">
		<textarea ref="textarea"></textarea>
	</div>
</template>

<script>
	// yarn add codemirror jshint
	import 'codemirror/lib/codemirror.css'
	import 'codemirror/addon/lint/lint.css'
	import CodeMirror from 'codemirror'
	import 'codemirror/mode/javascript/javascript'
	import 'codemirror/addon/lint/lint'
	import 'codemirror/addon/lint/javascript-lint'
	window.JSHINT = require('jshint').JSHINT;
	export default {
		props: ['value', "theme"],
		data() {
			return {
				editor: false
			}
		},
		watch: {
			value(val) {
				const editorValue = this.editor.getValue()
				if (val !== editorValue) {
					this.editor.setValue(val)
				}
			},
			theme(val) {
				this.editor.setOption("theme", val);
			}
		},
		mounted() {
			this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
				lineNumbers: true,
				mode: 'javascript',
				gutters: ['CodeMirror-lint-markers'],
				theme: this.theme,
				lint: true
			})

			this.editor.setValue(this.value)
			this.editor.on('change', cm => {
				this.$emit('changed', cm.getValue())
				this.$emit('input', cm.getValue())
			})
		},
		methods: {
			getValue() {
				return this.editor.getValue()
			},
			refresh() {
				this.editor && this.editor.refresh();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.editor {
		height: 100%;
		position: relative;

		::v-deep {
			.CodeMirror {
				height: auto;
				min-height: 300px;
			}

			.CodeMirror-scroll {
				min-height: 300px;
			}

			.cm-s-rubyblue span.cm-string {
				color: #F08047;
			}
		}
	}
</style>