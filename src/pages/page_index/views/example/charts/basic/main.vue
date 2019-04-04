<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="折线图" name="chart1">
                <chartLine ref="chart1" />
            </el-tab-pane>
            <el-tab-pane label="折线area图" name="chart2">
                <chartLineArea ref="chart2" />
            </el-tab-pane>
            <el-tab-pane label="柱状图" name="chart3">
                <chartBar ref="chart3" />
            </el-tab-pane>
            <el-tab-pane label="柱状图stack" name="chart4">
                <chartBarStack ref="chart4" />
            </el-tab-pane>
            <el-tab-pane label="饼图" name="chart5">
                <chartPie ref="chart5" />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import chartLine from './01line.vue'
import chartLineArea from './02line_area.vue'
import chartBar from './03bar.vue'
import chartBarStack from './04bar_stack.vue'
import chartPie from './05pie.vue'
export default {
    components: { chartLine, chartBar,chartLineArea,chartBarStack,chartPie, },
    data() {
        return {
            loading: false,
            activeTab: "chart3"
        }
    },
    mounted() {
        // 说明：为什么要加这么一步延迟？因为如果chart容器的宽度是百分比而不是固定数值，那么这个宽度是和 #main_container 的宽度相关的，而 #main_container 的宽度是页面加载后才进行计算的。所以，如果一进来页面就是图表页，那么charts图表初始化时获得的宽度就不对了。
        // 如果不想写这种延迟，那么就需要给 chart容器 定宽
        this.loading = true;
        this._.delay(() => {
            this.loading = false;
            this.$refs[this.activeTab].initChart();
        }, 1000);
        // this.$refs[this.activeTab].initChart();
    },
    methods: {
        tabClick(tab) {
            let name = tab.name;
            let ref = this.$refs[name];
            if (ref.initFlag) {
                // 已经存在啦，不需要重新初始化
                // ref.initChart();
            } else {
                // 需要重新初始化
                this.$nextTick(() => {
                    ref.initChart();
                })
            }
        }
    }
};
</script>