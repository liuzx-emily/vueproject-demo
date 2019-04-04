<style scoped>
.timelineChart {
    width: 100%;
    height: 500px;
}
</style>
<template>
    <section class="box-with-shadow">
        <section :id="elementId" class="timelineChart"></section>
    </section>
</template>
<script>
export default {
    data() {
        return {
            initFlag: false,
            randomNum: this.xTools.guid(),
        };
    },
    computed: {
        elementId() {
            return "timelineChart_" + this.randomNum;
        }
    },
    methods: {
        initChart() {
            this.initFlag = true;
            let chart_obj = this.echarts.init(document.getElementById(this.elementId));
            let option = {
                baseOption: {
                    timeline: {
                        // 默认值为time：时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                        axisType: 'time',
                        // timeline上的刻度（如果axisType是time，那么这里必须是时间）
                        data: ["2018-01-01", "2018-05-26", "2018-06-12", "2018-07-07"],
                        // 是否自动播放
                        autoPlay: true,
                        playInterval: 3000,
                        // -------------------- 样式控制 --------------------
                        // 播放、暂停按钮
                        controlStyle: {
                            show: false,
                        },
                        lineStyle: {
                            color: "#8bf",
                        },
                        itemStyle: {
                            normal: {
                                color: "#fff",
                                borderColor: "#8bf",
                            },
                            // 鼠标滑上时的效果
                            emphasis: {
                                color: "#8bf",
                                borderColor: "#8bf",
                            },
                        },
                        label: {
                            normal: {
                                color: "#555"
                            },
                            // 鼠标滑上时的效果
                            emphasis: {
                                color: "#555",
                            },
                        },
                        // 当前项
                        checkpointStyle: {
                            symbol: "diamond",
                            // 默认13 调大一点
                            symbolSize: 15,
                            color: "#fff",
                            borderColor: "#49e",
                        },
                        bottom: "10px",
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: params => {
                            // console.log(params);
                            if (params.componentType == "series") {
                                return `
		                            <div style="font-size:14px;line-height:2;">${params[0].name}</div>
		                            <div style="padding-left:10px;">${params[0].seriesName}：${params[0].data}</div>
		                            <div style="padding-left:10px;">${params[1].seriesName}：${params[1].data}</div>
		                            <div style="padding-left:10px;">${params[2].seriesName}：${params[2].data}</div>
                            `
                            } else {
                                // timeline上也会触发，并且 componentType为timeline。但是我们不需要timeline上显示tooltip，所以返回空字符串。
                                return "";
                            }
                        }
                    },
                    grid: {
                        // grid左上角位置：默认80 60
                        x: 60,
                        y: 60,
                        // grid右下角位置：默认80 60
                        x2: 60,
                        // 因为下面要放timeline，所以把grid往上挪一点
                        y2: 100,
                    },
                    series: [{
                        // 对应每个子option中的series[0]
                        type: 'bar',
                        name: "蛋白质",
                        // 宽度
                        barWidth: 30,
                        // 柱的颜色
                        itemStyle: {
                            normal: {
                                color: "#8bf",
                                borderColor: "#8bf",
                            },
                            // // 鼠标滑上时的效果
                            // emphasis: {
                            //     color: "#fff",
                            //     borderColor: "#8bf",
                            // },
                        },
                    }, {
                        // 对应每个子option中的series[1]
                        type: 'bar',
                        name: "碳水化合物",
                        // 宽度
                        barWidth: 30,
                        // 柱的颜色
                        itemStyle: {
                            normal: {
                                color: "#098",
                                borderColor: "#098",
                            },
                            // 鼠标滑上时的效果
                            emphasis: {
                                color: "#fff",
                                borderColor: "#098",
                            },
                        },
                    }, {
                        // 对应每个子option中的series[2]
                        type: 'line',
                        name: "油脂",
                        // 线的颜色
                        itemStyle: {
                            normal: {
                                color: "#f52"
                            }
                        },
                    }],
                    // x轴写这里
                    xAxis: [{
                        type: 'category',
                        data: ["香蕉", "水煮蛋", "西兰花"],
                    }],
                    // y轴写这里
                    yAxis: [{
                        type: 'value',
                        name: '含量'
                    }],
                },

                options: [
                    // 第1个轮播的内容
                    {
                        title: {
                            text: "标题1-数据是我编的"
                        },
                        series: [
                            // name
                            { data: [13, 5, 6] },
                            { data: [7, 4, 5] },
                            { data: [3, 2, 8] },
                        ]
                    },
                    // 第2个轮播的内容
                    {
                        title: {
                            text: "标题22-就是为了看看格式"
                        },
                        series: [
                            { data: [7, 2, 3] },
                            { data: [5, 4, 9] },
                            { data: [3, 4, 8] },
                        ]
                    },
                    // 第3个轮播的内容
                    {
                        title: {
                            text: "标题333"
                        },
                        series: [
                            { data: [1, 2, 3] },
                            { data: [1, 2, 1] },
                            { data: [7, 3, 6] },
                        ]
                    },
                    // 第4个轮播的内容
                    {
                        title: {
                            text: "标题444"
                        },
                        series: [
                            { data: [1, 2, 3] },
                            { data: [1, 2, 1] },
                            { data: [4, 5, 2] },
                        ]
                    },
                ]
            };
            chart_obj.setOption(option);
        }
    }
};
</script>