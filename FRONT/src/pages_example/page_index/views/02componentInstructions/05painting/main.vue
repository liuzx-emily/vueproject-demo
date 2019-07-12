<style lang="less" scoped>
canvas {
	outline: 1px solid #000;
}
ul li {
	display: inline-block;
	width: 50px;
	height: 50px;
	vertical-align: top;
	img {
		width: 100%;
		border: 2px solid #aaa;
		&[data-is-now] {
			border-color: pink;
		}
	}
}
.linshihuabu {
	display: none;
}
</style>

<template>
	<section>
		<section>
			<button type="button" @click="goBack" :disabled="historyIndex==0"><i class="fa fa-undo"></i></button>
			<button type="button" @click="goNext" :disabled="!inHistory"><i class="fa fa-repeat"></i></button>
			<br>
			画笔颜色<input type="color" v-model="lineColor">
			画笔粗细<input type="number" v-model="lineWidth">
			<br>
			<button></button>
		</section>
		<section>

		</section>
		<canvas :id="elementId" width="500" height="500"></canvas>
		<div class="linshihuabu"></div>
	</section>
</template>
<script>
export default {
	data() {
		return {
			elementId: "canvas" + this.xtools.randomId(),
			canvas: null,
			ctx: null,
			historyList: [],
			historyIndex: 0,
			manyanList: [],
			lineColor: "#FF5722",
			lineWidth: 2,
		}
	},
	computed: {
		inHistory() { return this.historyIndex < this.historyList.length - 1; }
	},
	watch: {
		lineColor(val) { this.ctx.strokeStyle = val; },
		lineWidth(val) { this.ctx.lineWidth = val; },
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.canvas = document.getElementById(this.elementId);
			this.canvas.addEventListener("mousedown", this.drawLine);
			this.ctx = this.canvas.getContext('2d');
			// 初始化设置样式
			this.ctx.strokeStyle = this.lineColor;
			this.ctx.lineWidth = this.lineWidth;
		},
		drawLine(e) {
			const getOffset = e => {
				return [e.clientX - this.canvas.getBoundingClientRect().left, e.clientY - this.canvas.getBoundingClientRect().top]
			};
			const ctx = this.ctx;
			ctx.beginPath();
			ctx.moveTo(...getOffset(e));
			document.onmousemove = e => {
				ctx.lineTo(...getOffset(e));
				ctx.stroke();
				return false;
			};
			document.onmouseup = e => {
				if (this.inHistory) {
					this.historyList.length = this.historyIndex + 1;
				}
				const url = this.canvas.toDataURL();
				this.historyList.push(url);
				this.historyIndex = this.historyList.length - 1;

				document.onmousemove = null;
				document.onmouseup = null;
			};
		},
		goBack() {
			this.historyIndex = this.historyIndex - 1;
			this.goToHistory();
		},
		goNext() {
			this.historyIndex = this.historyIndex + 1;
			this.goToHistory();
		},
		goToHistory() {
			const url = this.historyList[this.historyIndex];
			const oImage = new Image();
			oImage.onload = e => {
				this.ctx.clearRect(0, 0, 500, 500);
				this.ctx.drawImage(oImage, 0, 0, 500, 500);
			};
			oImage.src = url;
		},
	},
}
</script>

