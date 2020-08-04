<style lang="scss" scoped>
	.view-container {
		display: flex;
		.view-left {
			.operation-box {
				i {
					margin-right: 15px;
					cursor: pointer;
					font-size: 14px;
					border: 1px solid skyblue;
					padding: 6px 6px;
					border-radius: 50%;
					color: white;
					background: skyblue;
					&:hover {
						background: #2196f3;
					}
				}
			}
			flex: 0 0 350px;
			table {
				width: 100%;
				th {
					font-weight: normal;
				}
				td {
					padding: 5px 0;
					text-align: center;
					input, select {
						font-size: 14px;
						border: none;
						border-bottom: 1px solid #ccc;
						outline: none;
						padding-bottom: 4px;
						color: #396d82;
						letter-spacing: 1px;
					}
					.icon-remove {
						color: skyblue;
						cursor: pointer;
						font-size: 20px;
					}
					input {
						width: 100px;
					}
					select {
						width: 100px;
					}
				}
			}
		}
		.view-right {
			flex: 1 1 70%;
		}
	}
</style>
<template>
	<section class="view-container">
		<section class="view-left">
			<section class="operation-box">
				<input type="number" v-model="length" min="1" max="10">
				<i class="el-icon-plus" @click="addField"></i>
				<i class="el-icon-document-copy" @click="copyToClipboard" :data-clipboard-text="mockData" ref="copyBtn"></i>
			</section>
			<table>
				<thead>
					<tr>
						<th width="40%">key</th>
						<th width="50%">value</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="o in fields" :key="o.id">
						<td>
							<input v-model="o.key">
						</td>
						<td>
							<select v-model="o.type">
								<option v-for="type in types" :key="type.key" :value="type.key">{{type.key}}</option>
							</select>
						</td>
						<td>
							<i class="el-icon-remove-outline icon-remove" @click="removeField(o.id)"></i>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<section class="view-right">
			<JsonEditor v-model="mockData"></JsonEditor>
		</section>
	</section>
</template>

<script>
	import Clipboard from 'clipboard';
	import JsonEditor from './jsonEditor'
	const types = [
		{ key: "str", generator: () => { return "123" } },
		{ key: "radio", generator: (list = [1]) => { return list[0] } },
		{ key: "int", generator: () => { return 47 } },
		{ key: "timestamp", generator: () => { return +new Date("2008-08-08 15:30:27") } },
		{ key: "longStr", generator: () => { return "12哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈312哈哈哈3" } },
		{ key: "html", generator: () => { return '<p style="color:red">你好啊</p>' } },
	]
	export default {
		components: { JsonEditor },
		watch: {
			fields: {
				deep: true,
				handler() {
					this.regenerate();
				}
			},
			length() {
				this.regenerate();
			}
		},
		data() {
			return {
				length: 1,
				types: types,
				fields: [
					{ key: 'name', type: 'str', id: this.xtools.uuid() },
				],
				mockData: {}
			}
		},
		mounted() {
			this.regenerate();
		},
		methods: {
			addField() {
				this.fields.push({ key: "field", type: "str", id: this.xtools.uuid() });
			},
			removeField(id) {
				const index = this.fields.findIndex(o => o.id === id);
				this.fields.splice(index, 1)
			},
			regenerate() {
				const generate = () => {
					const data = {};
					this.fields.forEach(o => {
						if (!data[o.key]) {
							data[o.key] = types.find(type => type.key === o.type).generator();
						}
					});
					return data;
				}
				if (this.length == 1) {
					this.mockData = generate();
				} else {
					const list = [];
					for (let i = 0; i <= this.length - 1; i++) {
						list.push(generate())
					}
					this.mockData = list;
				}

			},
			copyToClipboard() {
				var clipboard = new Clipboard(this.$refs.copyBtn);
				clipboard.on('success', () => {
					this.$message({ type: "success", message: "复制成功" });
					clipboard.destroy();
				})
			},
		}
	}
</script>

<style>

</style>