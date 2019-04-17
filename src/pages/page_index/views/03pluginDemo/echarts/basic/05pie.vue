<style scoped>
    .chart {
    width: 100%;
    height: 300px;
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
                // 提示框
                tooltip: {
                    trigger: 'item',
                    formatter: params => {
                        return `${params.name}：${params.value}（${params.percent}%）`;
                    }
                },
                series: []
            };
            // 每个series的默认配置
            const default_series_pie = {
                name: "整个饼图的名称",
                type: 'pie',
                // 圆心位置，默认['50%', '50%'] 。可以设置成像素值[400,300]
                center: ['50%', '55%'],
                // 半径，默认 [0, '75%']。可以设置成像素值[60, 80]
                radius: [40, '75%'],
                data: this.data,
                label: {
                    show: true,
                    // 可选 'outside' 'inside' 'center' 。inside和center的区别：对于圆环图，那么inside是在圈环形上，center是在圆心那里。默认outside
                    position: 'outside',
                    // 默认自适应
                    // color:"black",
                    fontSize: 16,
                    formatter: function(params) {
                        console.log(params);
                        return `${params.name}（${params.percent}%）`;
                    },
                },
                // 视觉引导线 (label.position=="outside"时，会出现引导线)
                labelLine: {
                    show: true,
                    // 第一段的长度。
                    length: 30,
                    // 第二段的长度。
                    length2: 30,
                    // 是否平滑视觉引导线，默认不平滑，可以设置成 true 平滑显示，也可以设置为 0 到 1 的值，表示平滑程度。
                    smooth: 0.2,
                    // 线条样式
                    lineStyle: {
                        // 默认自适应
                        // color:"red",
                        width: 3,
                    },
                },
                /*
                // ---------------------------------------------------
                // ------------------- 不常用的 -----------------------
                // 是否启用图例 hover 时的联动高亮。 默认true
                legendHoverLink: true,
                // 是否开启 hover 在扇区上的放大动画效果。默认true
                hoverAnimation: true,
                // 高亮扇区的偏移距离。默认10
                hoverOffset: 10,
                // 饼图的扇区是否是顺时针排布。默认true
                clockwise: true,
                // 起始角度，支持范围[0, 360]。默认90
                startAngle: 90,
                // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互。默认0
                minAngle: 0,
                // 小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）。默认0
                minShowLabelAngle: 0,
                // 是否展示成南丁格尔图，通过半径区分数据大小。可选值'radius' 'area' false。默认false
                // 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
                // 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
                roseType: false,
                */
            };
            option.series.push(default_series_pie);
            // 显示图表
            chart_obj.setOption(option);
            this.loading = false;
        }
    }
};
</script>