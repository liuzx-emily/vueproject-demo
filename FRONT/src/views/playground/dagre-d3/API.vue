<style lang="scss" scoped>
	svg/deep/ {
		width: 50%;
		display: block;
		margin: 0 auto;
		height: 350px;
		background: linear-gradient(15deg, #FFCCBC, #FFECB3);
		g.node {
			cursor: pointer;
		}
		.node rect {
			stroke: #999;
			fill: #fff;
			stroke-width: 1.5px;
		}

		.edgePath path {
			stroke: #333;
			stroke-width: 1.5px;
		}


		.zx-node-start,
		.zx-node-end {
			fill: coral;
			stroke: crimson;
			stroke-width: 3;
		}
	}
</style>
<style>
	.tooltip {
		position: absolute;
		font-size: 12px;
		text-align: center;
		background-color: white;
		border-radius: 3px;
		box-shadow: rgb(174, 174, 174) 0px 0px 10px;
		cursor: pointer;
		display: inline-block;
		padding: 10px;
	}

	.tooltip>div {
		padding: 10px;
	}
</style>
<template>
	<section>
		<svg ref="svg"></svg>
	</section>
</template>

<script>
	import dagreD3 from 'dagre-d3'
	import * as d3 from "d3"
	import { render as renderGraph } from './x-dagre-d3-tools'
	export default {
		mounted() {
			this.init();
		},
		methods: {
			init() {
				// Create the input graph
				var g = new dagreD3.graphlib.Graph({
					directed: true,
					multigraph: true,
					compound: true,
				}).setGraph({
					rankdir: "LR", // 设置 node 节点的延伸排列方向，默认 TB ，可选 TB BT LR RL
					align: "UL", // 设置相同 rank 中 node 节点的对齐方式，默认 undefined，可选 UL UR DL DR
					nodesep: 50, // 相同层级 rank 中 node 的间距。默认 50
					edgesep: 10, // edge 之间的间距。默认 10
					ranksep: 50, // 相邻层级之间的间距，默认 50
					marginx: 0, // 图整体与画布的左右间距。默认 0
					marginy: 0, // 图整体与画布的上下间距。默认 0
				}).setDefaultEdgeLabel(function() {
					return {
						label: '1'
					};
				});

				// Here we"re setting nodeclass, which is used by our custom drawNodes function below.
				g.setNode('0', {
					labelType: "", //节点标签格式，可以设置文本以及html格式，默认为文本格式。
					label: "", //节点标签，即节点上要显示的文本，设置html格式时，label为html标签。
					shape: 'circle', // 节点形状。可以设置 rect circle ellipse diamond 四种形状，还可以使用render.shapes()自定义形状
					// style: 'fill:coral;stroke:crimson;stroke-width:3;', //节点样式, 可设置节点的颜色填充、节点边框
					// labelStyle:"fill:#afa;font-weight:bold", // 节点标签样式, 可设置节点标签的文本样式（颜色、粗细、大小）
					width: 15,
					height: 15,
					rx: 100,
					ry: 100,
					class: "zx-node-start",
					otherInfo: {
						foo: '你好'
					}
				});
				g.setNode('2', {
					labelType: "html", // 设置为 HTML 格式 
					label: `
            <div style='font-size:0;padding:5px;border:2px solid #fff;background:rgba(0,0,0,0.1)'  title='哈哈'>
                <span style='display:inline-block;width:5px;height:10px;background:#ff9;margin-right:5px;position:relative;top:5px;'></span>
                <span style="display:inline-block;vertical-align:top;font-size:14px;colorwhite;">拟稿</span>
                <div style='font-size:2px;color:#b7886e;'>吧吧啦吧啦</div>
            </div>
        `,
					style: 'fill:none;stroke:none;',
					padding: 0,
					rx: 0,
					ry: 0,
				});
				g.setNode('3', {
					label: "审核",
				});
				g.setNode('4', {
					label: "确认",
				});
				g.setNode('5', {
					label: "step1",
				});
				g.setNode('6', {
					label: "step2",
				});
				g.setNode('7', {
					label: "",
					padding: 0,
					style: 'fill:none;stroke:none',
				});
				g.setNode('10', {
					label: "",
					class: "zx-node-end",
					width: 15,
					height: 15,
					shape: 'circle',
				});

				g.setNode('50', {
					label: '非末尾层',
					labelStyle: 'fill: red',
					clusterLabelPos: 'top',
					style: 'fill: rgba(0,0,0,0.1)'
				});

				g.setNode('99', {
					label: '中间层',
					clusterLabelPos: 'top',
					style: 'fill: rgba(0,0,0,0.3)'
				});
				g.setParent('0', '50');
				g.setParent('99', '50');
				g.setParent('2', '99');
				g.setParent('3', '99');
				g.setParent('4', '99');

				g.nodes().forEach(function(v) {
					var node = g.node(v);
					// Round the corners of the nodes
					node.rx = node.ry = 5;
				});

				// Set up edges.
				g.setEdge('0', '2', {
					// labelType:"", // 可以设置文本以及 html 格式，默认为文本格式。
					label: '开始咯', // 要显示的文本，设置 html 格式时，label为 html 标签。
					labelStyle: 'fill:crimson;font-size:20;', // 边标签样式, 可设置边标签的文本样式（颜色、粗细、大小）
					class: 'zx-edge-normal',
					style: 'stroke:crimson;',
					arrowhead: 'vee', // arrowhead 箭头形状，可以设置 normal,vee,undirected 三种样式，默认为 normal
					arrowheadStyle: 'fill:crimson;stroke-width:0;', // arrowheadStyle 箭头样式，可以设置箭头颜色等
					arrowheadClass: 'zx-arrowhead-normal',
					curve: d3.curveBasis,
					width: 30,
				});
				g.setEdge('2', '3', {
					label: '送审批',
					curve: d3.curveBasis,
					labelPos: 'top'
				});
				g.setEdge('3', '4', {
					label: '同意',
				});
				g.setEdge('3', '2', {
					label: '退回',
					class: 'type-LINE-RETURN',
				});
				g.setEdge('4', '2', {
					label: '退回',
					class: 'type-LINE-RETURN',
				});
				g.setEdge('4', '5', {});
				g.setEdge('4', '6', {});
				g.setEdge('5', '7', {
					arrowhead: 'undirected'
				});
				g.setEdge('6', '7', {
					arrowhead: 'undirected'
				});
				g.setEdge('7', '10', {});

				const { svgGroup } = renderGraph({ graph: g, svgDom: this.$refs.svg })

				//鼠标悬停显示隐藏tooltip
				this.addToolTip({ g, svgGroup });

			},
			addToolTip({ g, svgGroup }) {
				const _createTooltip = () => {
					return d3.select('body')
						.append('div')
						.classed('tooltip', true)
						.style('opacity', 0)
						.style('display', 'none');
				}
				const _showTip = textContent => {
					if (!textContent) {
						return;
					}
					tooltip.transition()
						.duration(200)
						.style('opacity', 1)
						.style('display', 'block');
					tooltip.html(textContent)
						.style('left', (d3.event.pageX + 15) + 'px')
						.style('top', (d3.event.pageY + 15) + 'px');
				}
				const _hideTip = () => {
					tooltip.transition()
						.duration(200)
						.style('opacity', 0)
						.style('display', 'none');
				}
				let tooltip = _createTooltip();
				svgGroup.selectAll("g.node")
					.on("mouseover", function(v) {
						_showTip(g.node(v).label);
					})
					.on("mouseout", function() {
						_hideTip();
					})
			},
		}
	}
</script>