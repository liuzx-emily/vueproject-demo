<style lang="scss">
	.x-button {
		cursor: pointer;
		border-radius: 4px;
		position: relative;
		outline: none;
	}
	.x-button+.x-button {
		margin-left: 10px;
	}
	// dropdown
	.x-button:hover {
		.x-button-dropdown {
			display: block;
		}
	}
	.x-button-dropdown {
		display: none;
		position: absolute;
		left: -1px;
		min-width: 100%;
		z-index: 99;
		padding-top: 15px;
	}
	// 尺寸
	.x-button.size-common {
		font-size: 12px;
		padding: 0 12px;
		height: 30px;
		line-height: 30px;
		&>i.fa {
			font-size: 12px;
			width: 12px;
		}
		i.fa+.x-button-content {
			margin-left: 6px;
		}
	}
	// 颜色
	.x-button.color-pretty-primary {
		color: rgb(30, 136, 229);
		background: rgb(250, 250, 255);
		border: 1px solid rgb(215, 230, 255);
		&:hover {
			background: rgb(240, 248, 255);
		}
	}
	.x-button.color-primary {
		color: white;
		background: #2196f3;
		border: 1px solid #03a9f4;
		&:hover {
			background: rgb(30, 136, 229);
		}
	}

	.x-button.color-pretty-green {
		color: #46af46;
		background: #fefefe;
		border: 1px solid #b2dfdb;

		&:hover {
			background: #f4fdfc;
		}
	}
	.x-button.color-green {
		color: white;
		background: #46af46;
		border: 1px solid #3b9e3b;
		&:hover {
			background: #3b9e3b;
		}
	}

	.x-button.color-pretty-red {
		color: #F44336;
		background: rgb(255, 252, 248);
		border: 1px solid rgb(255, 200, 200);

		&:hover {
			background: rgb(255, 235, 235);
		}
	}
</style>

<template>
	<button type="button" class="x-button" :class="styleClass" @click="handleClick">
		<i class="fa" :class="'fa-'+icon" v-if="icon"></i>
		<span class="x-button-content" v-if="$slots.default">
			<slot></slot>
		</span>
		<section class="x-button-dropdown" v-if="$slots.dropdown" @click.stop>
			<slot name="dropdown"></slot>
		</section>
	</button>
</template>
<script>
	export default {
		install(Vue) {
			Vue.component("x-button", this);
		},
		props: {
			icon: {
				default: undefined,
			},
			color: {
				default: "primary"
			},
			size: {
				default: "common"
			},
			pretty: {
				type: Boolean,
				default: true,
			}
		},
		computed: {
			styleClass() {
				return ["color-" + (this.pretty ? "pretty-" : "") + this.color, "size-" + this.size];
			}
		},
		created() {},
		methods: {

			handleClick(evt) {
				this.$emit('click', evt);
			}
		}
	};
</script>