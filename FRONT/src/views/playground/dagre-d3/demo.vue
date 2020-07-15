<style lang="scss" scoped>
	svg/deep/ {
		width: 100%;
		height: 200px;
		.nodes {
			.node.zx-node {
				fill: none;
				stroke: hotpink;
				stroke-width: 1px;
				.label {
					fill: black;
					stroke-width: 0;
				}

			}
			.node.highlight {
				fill: #FBE9E7;
				stroke: none;
				.label {
					fill: crimson;
				}
			}
		}
		.edgePaths {
			.edgePath.zx-edge {
				path {
					stroke: orange;
				}
			}
			.edgePath.weaken {
				path {
					stroke: #ddd;
				}
			}
		}
	}
</style>
<template>
	<section>
		<svg ref="svg"></svg>
	</section>
</template>

<script>
	import dagreD3 from 'dagre-d3'
	import { render as renderGraph } from './x-dagre-d3-tools'
	export default {
		data() {
			return {
				nodes: [
					{ id: '100', label: '瓜子' },
					{ id: '1', label: '仓鼠' },
					{ id: '2', label: '小猫', class: 'highlight' },
					{ id: '3', label: '小狗' },
					{ id: '4', label: '狮子' },
					{ id: '5', label: '狼' },
				],
				edges: [
					{ startId: '100', endId: '1', label: '吱吱' },
					{ startId: '1', endId: '2', label: '喵喵' },
					{ startId: '1', endId: '3', label: '汪' },
					{ startId: '2', endId: '4', label: 'ヾ(≧O≦)〃嗷~' },
					{ startId: '3', endId: '5', label: '嗷呜' },
					{ startId: '5', endId: '3', label: 'oops', class: 'weaken', labelStyle: 'fill:#ccc', arrowheadStyle: 'fill:#ccc' },
				]
			}
		},
		mounted() {
			// Create the input graph
			var g = new dagreD3.graphlib.Graph().setGraph({
				rankdir: "LR",
			});
			this.nodes.forEach(o => {
				g.setNode(o.id, {
					label: o.label,
					class: o.class || 'zx-node'
				});
			})
			this.edges.forEach(o => {
				g.setEdge(o.startId, o.endId, {
					label: o.label,
					class: o.class || 'zx-edge',
					labelStyle: o.labelStyle || 'fill:hotpink;font-size:12;',
					arrowheadStyle: o.arrowheadStyle || 'fill:red;stroke-width:0;',
				});
			})
			const { svgGroup } = renderGraph({ graph: g, svgDom: this.$refs.svg })
			svgGroup.selectAll("g.node").each(function(v) {
				this.addEventListener('click', () => {
					const node = g.node(v);
					alert(node.label)
				})
			});
		}
	}
</script>