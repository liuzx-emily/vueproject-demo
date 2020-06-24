<style lang="scss" scoped>
	section.container {
		width: 150px;
		height: 30px;
		text-align: center;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		border: 2px solid #FFAB91;
		box-sizing: border-box;
		&::before {
			position: absolute;
			z-index: 1;
			content: "";
			background: linear-gradient(30deg, white 0, #f16e45 50%, white 100%);
			width: 100%;
			height: 100%;
			transition: 0.5s;
			top: 0;
			left: -100%;
		}
		&:hover {
			box-shadow: 0 0 5px #FFAB91;
			&::before {
				left: 100%;
			}
		}
		.label {
			height: 100%;
			text-align: center;
			position: relative;
			z-index: 2;
		}
	}
</style>
<template>
	<section class="container">
		<section class="label">炫光按钮</section>
	</section>
</template>
<script>
	export default {}
</script>