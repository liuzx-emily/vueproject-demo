<style lang="scss" scoped>
	span.theme {
		display: inline-block;
		width: 130px;
		font-size: 12px;
		background: #f5f5f5;
		color: #333;
		padding: 5px 0;
		padding-left: 5px;
		box-sizing: border-box;
		margin-bottom: 4px;
		margin-right: 5px;
		cursor: pointer;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		&.active {
			background: #e91e63;
			color: white;
		}
	}
</style>
<template>
	<section>
		<section>
			<span v-for="o in themes" :key="o" class="theme" :class="{active:o===activeTheme}" @click="activeTheme=o" :title="o">{{o}}</span>
		</section>
		<el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
			<el-tab-pane v-for="o in languages" :key="o.label" :label="o.label" :name="o.label">
				<component :is="o.c" v-model="editorData[o.label]" :theme="activeTheme" ref="editor"></component>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
	/* eslint-disable */
	import cssEditor from './components/cssEditor'
	import jsEditor from './components/jsEditor'
	import JsonEditor from './components/JsonEditor'

	// 主题配色
	const themesContext = require.context('codemirror/theme', true, /\.css$/);
	const themes = [];
	themesContext.keys().forEach(key => {
		// key 是 ./rubyblue.css
		const theme = key.slice(2)
		require('codemirror/theme/' + theme)
		themes.push(theme.replace(/\.css$/, ""));
	})
	export default {
		components: { cssEditor, JsonEditor, jsEditor },
		data() {
			return {
				themes: themes,
				activeTheme: themes[0],
				languages: [
					{ label: 'js', c: jsEditor },
					{ label: 'css', c: cssEditor },
					{ label: 'JSON', c: JsonEditor },
				],
				activeTab: 'js',
				editorData: {
					css: 'body{\n\tbackground:red;\r}',
					js: "var a=1;",
					JSON: {
						name: 'emily',
						age: 12,
						hobby: 'dance',
						list: [1, 2, 3, 4]
					}
				}
			}
		},
		mounted() {
			// setInterval(() => {
			// 	let index = (themes.indexOf(this.activeTheme) + 1) % themes.length;
			//   this.activeTheme=themes[index];
			// }, 2000);
		},
		methods: {
			handleClick(tab) {
				this.$nextTick(() => {
					this.$refs.editor[tab.index].refresh();
				})
			}
		}
	}
</script>