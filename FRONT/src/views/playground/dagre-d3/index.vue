<template>
	<section>
		<label v-for="(o,index) in tabs" :key="index">
			<input type="radio" :value="index" v-model="activeTab">{{o.label}}
		</label>
		<component v-bind:is="currentTab.component"></component>
	</section>
</template>
<script>
	import API from './API'
	import demo from './demo'
	export default {
		data() {
			return {
				activeTab: 0,
				tabs: [
					{ component: demo, label: "demo" },
					{ component: API, label: "API" },
				]
			}
		},
		computed: {
			currentTab() {
				return this.tabs[this.activeTab];
			}
		}
	};
</script>