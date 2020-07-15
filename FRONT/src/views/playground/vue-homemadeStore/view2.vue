<template>
	<section>
		<header>view2</header>
    {{store.name}}
	</section>
</template>

<script>
	import store from './store'
	export default {
		computed: {
			store() { return store }
		}
	}
</script>

<style>

</style>