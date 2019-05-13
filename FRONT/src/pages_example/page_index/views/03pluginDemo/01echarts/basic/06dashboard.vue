<style scoped>
    .chart {
    width: 100%;
    height: 500px;
}
</style>
<template>
    <section v-loading.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-button class="size-common" type="primary" @click="getData">重新获取数据</el-button>
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
                        { name: "苹果", value: 75 },
                    ];
                    this.drawChart();
                }
            }).catch(error => {});
        },
        drawChart() {
            // 初始化
            let chart_obj = this.echarts.init(document.getElementById(this.elementId));
            let option = {
                color: this.colorArr,
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
            // 每个series的默认配置
            const default_series_gauge = {
                type: 'gauge',
                // 仪表盘半径，默认 '75%'
                radius: 150,
                // 起始角度 默认 225
                startAngle: 220,
                // 结束角度 默认 -45
                endAngle: -40,
                // 可读是否为顺时针增长，默认 true
                clockwise: true,
                // 最小的数据值 默认 0
                min: 60,
                // 最大的数据值 默认 100
                max: 100,
                // 仪表盘刻度的分割段数 默认 10
                splitNumber: 8,
                // 仪表盘轴线（圆弧）
                axisLine: {
                    lineStyle: {
                        width: 20,
                        // 颜色区间
                        color: [
                            [0.2, '#ff5722'],
                            [0.8, '#03a9f4'],
                            [1, '#8bc34a']
                        ]
                    }
                },
                // 分隔线（根据 splitNumber 划分的分隔线）
                splitLine: {
                    show: true,
                    length: 15,
                    lineStyle: {
                        color: 'white',
                        width: 3,
                    }
                },
                // 刻度（一个个小刻度）
                axisTick: {
                    show: true,
                    // 分隔线之间分割的刻度数。 默认5
                    splitNumber: 5,
                    length: 10,
                    lineStyle: {
                        color: 'white',
                        width: 1,
                    }
                },
                // 刻度标签（注意：普通小刻度不会显示标签，只有分隔线显示）
                axisLabel: {
                    show: true,
                    // 标签与刻度线的距离 默认 5
                    distance: 8,
                    // 格式化
                    formatter: '{value}%',
                    fontSize: 12,
                },
                // 指针
                pointer: {
                    show: true,
                    // 默认 '80%' ，可以为像素number
                    length: '60%',
                    width: 10,
                },
                // 标题
                title: {
                    show: true,
                    // 相对于仪表盘中心的偏移位置，%或number都可以。默认 [0, '-40%'] 
                    offsetCenter: [0, 50],
                    color: "#555",
                    fontSize: 16,
                    fontWeight: 'bold',

                },
                // 数据
                detail: {
                    show: true,
                    offsetCenter: [0,70],
                    formatter: '{value}%',
                    color:'#455',
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                data: [],
            };
            // 设置series
            let series=this._.cloneDeep(default_series_gauge);
            series.data=this.data;
            option.series.push(series);
            // 显示图表
            chart_obj.setOption(option);
            this.loading = false;
        }
    }
};
</script>