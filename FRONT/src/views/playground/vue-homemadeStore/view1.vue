<template>
	<section>
		<header>view1</header>
    <input type="text" v-model="store.name">
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