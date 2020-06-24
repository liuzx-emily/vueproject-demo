<template>
	<span style="margin-right:15px">
		<section class="search-box" v-for="(o,index) in searchAreaList" :key="index">
			<span class="search-label">{{o.label}}：</span>
			<span class="search-input">
				<template v-if="o.type==='customized'">
					<slot :name="o.slot"></slot>
				</template>
				<template v-else-if="o.type==='select'">
					<el-select v-model="searchparam[o.prop]" filterable>
						<el-option v-for="o in o.optionList" :key="o.id" :label="o.label" :value="o.id"></el-option>
					</el-select>
				</template>
				<template v-else-if="o.type==='pickdaterange'">
					<x-pickdaterange :fstartTime.sync="searchparam[o.prop[0]]" :fendTime.sync="searchparam[o.prop[1]]"></x-pickdaterange>
				</template>
				<template v-else-if="o.type==='datetime'">
					<el-date-picker v-model="searchparam[o.prop]" :type="o.type" :format="o.format" value-format="timestamp"></el-date-picker>
				</template>
				<template v-else>
					<el-input v-model="searchparam[o.prop]"></el-input>
				</template>
			</span>
		</section>
	</span>
</template>
<script>
	export default {
		install(Vue) {
			Vue.component("x-searcharea", this);
		},
		props: {
			searchAreaList: {
				default: () => []
			},
			searchparam: {
				default: () => { return {} }
			}
		}
	}
</script>

<style>

</style>