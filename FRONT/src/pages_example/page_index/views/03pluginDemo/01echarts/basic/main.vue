<template>
    <section>
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="折线图(line area)" name="chart1">
                <chartLine ref="chart1" />
            </el-tab-pane>
            <el-tab-pane label="柱状图(bar stack)" name="chart3">
                <chartBar ref="chart3" />
            </el-tab-pane>
            <el-tab-pane label="饼图" name="chart5">
                <chartPie ref="chart5" />
            </el-tab-pane>
            <el-tab-pane label="仪表盘" name="chart6">
                <chartGauge ref="chart6" />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import chartLine from './01line.vue'
import chartBar from './03bar.vue'
import chartPie from './05pie.vue'
import chartGauge from './06gauge.vue'
export default {
    components: { chartLine, chartBar, chartPie, chartGauge, },
    data() {
        return {
            activeTab: "chart1"
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