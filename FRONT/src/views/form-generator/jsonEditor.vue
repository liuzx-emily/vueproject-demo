<template>
	<div class="editor">
		<textarea ref="textarea"></textarea>
	</div>
</template>

<script>
	// yarn add codemirror jsonlint script-loader
	import 'codemirror/lib/codemirror.css'
	import 'codemirror/addon/lint/lint.css'
	import CodeMirror from 'codemirror'
	import 'codemirror/mode/javascript/javascript'
	import 'codemirror/addon/lint/lint'
	import 'codemirror/addon/lint/json-lint'
	require('script-loader!jsonlint')

	export default {
		props: ['value'],
		data() {
			return {
				editor: false
			}
		},
		watch: {
			value(value) {
				const editorValue = this.editor.getValue()
				if (value !== editorValue) {
					this.editor.setValue(JSON.stringify(this.value, null, 2))
				}
			},
		},
		mounted() {
			this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
				lineNumbers: true,
				mode: 'application/json',
				gutters: ['CodeMirror-lint-markers'],
				// theme: "aaaa",
				lint: true
			})

			this.editor.setValue(JSON.stringify(this.value, null, 2))
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