<template>
    <section>
        <el-card>
            <div slot="header" class="clearfix">
                <span>踩坑</span>
            </div>
            <div>
                <p>1 如果同一个图表组件在页面中多个地方都调用了，那么id一定不能重复，解决方法： <code>randomNum</code> （如果只有一处调用，那么就不需要这样处理了。不过在开发中为了避免需求变动带来麻烦，一律处理一下）</p>
                <p>2 tabs中嵌套图表,取不到DOM元素：解决方法见 <code>tabClick</code> 方法</p>
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
        </el-tabs>
    </section>
</template>
<script>
import chartRing from './ring.vue'
import chartDashboard from './dashboard.vue'
import chartBar from './bar.vue'
export default {
    components: { chartRing, chartDashboard,chartBar },
    data() {
        return {
            activeTab: "chart3"
        }
    },
    mounted() {
        this.$refs[this.activeTab].initChart();
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