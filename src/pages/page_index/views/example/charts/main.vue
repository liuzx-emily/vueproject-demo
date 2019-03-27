<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-card>
            <div slot="header" class="clearfix">
                <span>踩坑</span>
            </div>
            <div>
                <p>1 如果同一个图表组件在页面中多个地方都调用了，那么id一定不能重复，解决方法： <code>randomNum</code> （如果只有一处调用，那么就不需要这样处理了。不过在开发中为了避免需求变动带来麻烦，一律处理一下）</p>
                <p>2 tabs中嵌套图表,取不到DOM元素：解决方法见 <code>tabClick</code> 方法</p>
                <p>3 如果chart容器的宽度是百分比而不是固定数值，那么需要进行延迟加载。具体写法与说明见代码</p>
            </div>
        </el-card>
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="圆环" name="chart1">
                <chartRing ref="chart1" />
            </el-tab-pane>
            <el-tab-pane label="仪表盘" name="chart2">
                <chartDashboard ref="chart2" />
            </el-tab-pane>
            <el-tab-pane label="堆积柱状图" name="chart3">
                <chartBar ref="chart3" />
            </el-tab-pane>
            <el-tab-pane label="timeline" name="chart4">
                <timelineChart ref="chart4" />
            </el-tab-pane>
            <el-tab-pane label="多个pie，计算位置" name="chart5">
                <manypie ref="chart5" />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import chartRing from './ring.vue'
import chartDashboard from './dashboard.vue'
import chartBar from './bar.vue'
import timelineChart from './timelineChart.vue'
import manypie from './manypie.vue'
export default {
    components: { chartRing, chartDashboard, chartBar, timelineChart, manypie, },
    data() {
        return {
            loading: false,
            activeTab: "chart5"
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