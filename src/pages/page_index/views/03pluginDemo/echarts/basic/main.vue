<template>
    <section>
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
            <el-tab-pane label="仪表盘" name="chart6">
                <chartDashboard ref="chart6" />
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
import chartDashboard from './06dashboard.vue'
export default {
    components: { chartLine, chartBar, chartLineArea, chartBarStack, chartPie, chartDashboard, },
    data() {
        return {
            activeTab: "chart6"
        }
    },
    mounted() {
        this.$refs[this.activeTab].getData();
    },
    methods: {
        tabClick(tab) {
            let name = tab.name;
            let ref = this.$refs[name];
            this.$nextTick(() => {
                ref.getData();
            })
        }
    }
};
</script>