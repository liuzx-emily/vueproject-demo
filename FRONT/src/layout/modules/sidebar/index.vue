<style lang="scss" scoped>

</style>
<template>
	<!-- 说明：
        在 a.limitless-menu-li-name 上通过style加padding，是为了背景颜色覆盖一整行。
        如果在 li 上加padding，那么它的子级的背景颜色就不是一整行了。 
    -->
	<ul class="limitless-menu-ul collapse-transition" :class="{'sub-menu':!top}" ref="container">
		<li v-for="(item,index) in data" class="limitless-menu-li" :key="index">
			<section class="name_and_controlBtn">
				<!-- 外部链接 -->
				<template v-if="item.isExternalLink">
					<a class="limitless-menu-li-name" :style="paddingStyle" :title="item.name" :href="item.path" target="_blank">
						<i class="fa icon" :class="item.icon"></i>
						{{item.name}}
					</a>
				</template>
				<!-- 过渡路由页面 -->
				<template v-else-if="item.isTransitionView">
					<a class="limitless-menu-li-name" @click="item.showChildren = !item.showChildren" :style="paddingStyle" :title="item.name">
						<i class="fa icon" :class="item.icon"></i>
						{{item.name}}
					</a>
				</template>
				<!-- 真实页面 -->
				<template v-else>
					<router-link class="limitless-menu-li-name isRealView" :to="item.path" :style="paddingStyle" :title="item.name">
						<i class="fa icon" :class="item.icon"></i>
						{{item.name}}
					</router-link>
				</template>
				<span class="controlBtn" v-if="item.hasChildren" @click="item.showChildren = !item.showChildren">
					<i class="fa fa-angle-up" :class="{rotate:!item.showChildren}"></i>
				</span>
			</section>
			<el-collapse-transition v-if="item.hasChildren">
				<submenu v-if="item.showChildren" :data="item.children" :level="level+1" :top="false"></submenu>
			</el-collapse-transition>
		</li>
	</ul>
</template>
<script>
	import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
	export default {
		// 自己调用自己，所以必须得写name！！！！
		name: 'submenu',
		components: ElCollapseTransition,
		props: {
			data: Array,
			level: {
				type: Number,
				default: 0
			},
			top: {
				type: Boolean,
				default: true,
			}
		},
		computed: {
			paddingStyle() {
				let left = 0;
				if (this.level > 0) {
					left = 20 + this.level * 20;
				}
				return {
					'paddingLeft': left + 'px'
				};
			},
		},
	};
</script>