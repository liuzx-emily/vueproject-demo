<style scoped>
    .chart{
    display: block;
    width: 100%;
    height: 400px;
}
</style>
<template>
    <section v-loading.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-alert type="info" title="柱状图必须设置 xAxis.boundaryGap = true;"></el-alert>
        <el-alert type="info" title="堆叠效果 设置stack"></el-alert>
        <el-button class="size-common" type="primary" @click="getData">重新获取数据</el-button>
        <section :id="elementId" class="chart"></section>
    </section>
</template>
<script>
export default {
    data() {
        return {
            // 局部loading
            loading: true,
            // 生成随机id
            randomNum: this.xTools.guid(),
            // 调色盘
            colorArr: ["#ff7576", "#ffba75", "#75bbff", "#4ce297", ],
            // 数据
            data: [],
        }
    },
    computed: {
        elementId() {
            return "chart_" + this.randomNum;
        }
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
                        { name: "西瓜", data: [85, 129, 23, 7], type: "fruit", },
                        { name: "苹果", data: [169, 17, 93, 76], type: "fruit", },
                        { name: "菠萝", data: [34, 135, 15, 46], type: "fruit", },
                        { name: "白菜", data: [76, 54, 29, 84], type: "vegetable", },
                    ];
                    this.drawChart();
                }
            }).catch(error => {});
        },
        drawChart() {
            // 初始化
            let chart_obj = this.echarts.init(document.getElementById(this.elementId));
            // 每个series的默认配置
            const default_series_bar_stack = {
                name: '类别名称',
                type: 'bar',
                // 数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。
                stack: "stack1",
                // 柱条的最大宽度，默认 auto 。可以设置成 number 和 %
                barMaxWidth: 50,
                // 不同系列的柱间距离，默认 30% 。只能设置为 %（如 '30%'，表示每个柱子宽度的 30%）。
                barGap: "10%",
                data: [],
            };
            // 坐标轴的默认配置
            let default_axis = {
                name: "坐标轴名称",
                // 坐标轴名称的文字样式
                nameTextStyle: {
                    // 默认取 axisLine.lineStyle.color。
                    color: "#385b83",
                    fontSize: 20,
                    fontWeight: "bold",
                },
                // 坐标轴类型 category value time log 
                type: 'category',
                // 坐标轴两边留白策略。类目轴设置为true、false，和非类目轴的设置为[a,b]
                boundaryGap: false,
                // 坐标轴轴线
                axisLine: {
                    lineStyle: {
                        color: "#ddd",
                        width: 3,
                        type: "solid",
                    },
                },
                // 坐标轴的刻度标签
                axisLabel: {
                    // 显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』。默认auto
                    interval: 0,
                    // 默认取 axisLine.lineStyle.color
                    color: "#777"
                },
                // 坐标轴的刻度
                axisTick: {
                    show: false,
                },
                // 分割线
                splitLine: {
                    // 是否显示分隔线。默认数值轴显示，类目轴不显示。
                    show: true,
                    lineStyle: {
                        color: '#eee',
                        width: 1,
                    }
                },
                data: []
            };
            // 配置项
            let option = {
                color: this.colorArr,
                grid: {
                    // grid左上角位置：默认80 60
                    x: 130,
                    y: 70,
                    // grid右下角位置：默认80 60
                    x2: 80,
                    y2: 80,
                },
                // x轴
                xAxis: [],
                // y轴
                yAxis: [],
                // 提示框
                tooltip: {
                    trigger: 'axis',
                    formatter: params => {
                        console.log(params);
                        let str = params[0].name + '<br/>';
                        this._.forEach(params, item => {
                            str += `${item.seriesName} :${item.value}<br/>`;
                        });
                        return str;
                    }
                },
                // 图例
                legend: {
                    show: true,
                    // 位置靠左，距离顶部30px，垂直排列，每项之间间距20px
                    left: "left",
                    top: "30",
                    orient: "vertical",
                    itemGap: 20,
                },
                series: []
            };
            // -------------- 设置x轴 --------------
            let xAxis = this._.cloneDeep(default_axis);
            xAxis.name = "月份";
            xAxis.type = "category";
            // 两边留白
            xAxis.boundaryGap = true;
            xAxis.data = ['一月', '二月', '三月', '四月'];
            // xAxis.axisPointer=true;
            option.xAxis = [xAxis];
            // -------------- 设置y轴 --------------
            let yAxis = this._.cloneDeep(default_axis);
            yAxis.name = "价格";
            yAxis.type = "value";
            yAxis.boundaryGap = [0, 0];
            option.yAxis = [yAxis];
            // -------------- 设置series --------------
            option.series = this._.map(this.data, item => {
                let series = this._.cloneDeep(default_series_bar_stack);
                series.name = item.name;
                series.data = item.data;
                series.stack = item.type;
                return series;
            });
            // 显示图表
            chart_obj.setOption(option);
            this.loading = false;
        }
    }
};
</script>