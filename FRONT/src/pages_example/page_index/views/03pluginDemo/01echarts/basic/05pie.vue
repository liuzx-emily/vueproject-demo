<style scoped>
    .chart {
    width: 100%;
    height: 300px;
}
</style>
<template>
    <section v-loading.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-card>
            <el-button class="size-common" type="primary" @click="getData">重新获取数据</el-button>
        </el-card>
        <section :id="elementId" class="chart"></section>
    </section>
</template>
<script>
export default {
    props: {},
    data() {
        return {
            // 局部loading
            loading: true,
            // 生成随机id
            randomNum: this.xtools.randomId(),
            // 数据
            data: [],
        }
    },
    computed: {
        elementId() {
            return "chart_" + this.randomNum;
        },
    },
    mounted() {
        // 当容器的宽度变化时，重新画画
        this.chartResizeWhenWidthChange(this.elementId);
        // this.getData();
    },
    methods: {
        getData() {
            this.loading = true;
            // 先销毁之前的图
            this.echarts.dispose(document.getElementById(this.elementId));
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/dept/list.htmls',
                params: {
                    type: 1
                }
            }).then((response) => {
                const res = response.data;
                if (res.code == 1) {
                    this.data = [
                        { name: "苹果", value: 34 },
                        { name: "橘子", value: 24 },
                        { name: "菠萝", value: 15 },
                        { name: "西瓜", value: 21 },
                    ];
                    this.drawChart();
                }
            }).catch(error => {});
        },
        drawChart() {
            // 初始化
            let chart_obj = this.echarts.init(document.getElementById(this.elementId), "chic");
            let option = {
                title: {
                    text: "~主标题~",
                },
                legend: {},
                tooltip: {
                    trigger: 'item',
                },
            };
            // 每个series
            const series = {
                name: "整个饼图的名称",
                type: 'pie',
                center: ['50%', '65%'],
                radius: [40, '55%'],
                data: this.data,
            };
            option.series = [series];
            // 显示图表
            chart_obj.setOption(option);
            this.loading = false;
        }
    }
};
</script>