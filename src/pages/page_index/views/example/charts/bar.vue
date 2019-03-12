<style>
    .barchart {
        display: block;
        width: 100%;
        height: 400px;
}
</style>
<template>
    <section id="barchart_container" class="box-with-shadow">
        <el-alert title="堆积：stack" type="info" :closable="false"></el-alert>
        <el-alert title="问题待解决：图例是白色的，看不见怎么办？？" type="warning" :closable="false"></el-alert>
        <section v-for="n in 1" :id="'barchart_'+n+'_'+randomNum" class="barchart"></section>
    </section>
</template>
<script>
export default {
    data() {
        return {
            randomNum: this.xTools.guid(),
            initFlag: false,
            data: [
                { name: "和平区", value1: 54, value2: 15 },
                { name: "河西区", value1: 44, value2: 19 },
                { name: "南开区", value1: 35, value2: 15 },
                { name: "河东区", value1: 30, value2: 12 },
                { name: "红桥区", value1: 17, value2: 15 },
                { name: "东丽区", value1: 11, value2: 22 },
                { name: "西青区", value1: 20, value2: 15 },
                { name: "津南区", value1: 65, value2: 15 },
                { name: "北辰区", value1: 10, value2: 0 },
                { name: "武清区", value1: 20, value2: 15 },
                { name: "宝坻区", value1: 54, value2: 10 },
                { name: "滨海新区", value1: 54, value2: 15 },
                { name: "宁河区", value1: 54, value2: 39 },
                { name: "静海区", value1: 54, value2: 7 },
                { name: "河北区", value1: 59, value2: 15 },
                { name: "蓟州区", value1: 100, value2: 15 },
            ]
        }
    },
    methods: {
        initChart() {
            this.initFlag = true;
            // 初始化
            let chart_obj = [];
            for (let i = 0; i < 1; i++) {
                let id = `barchart_${i + 1}_${this.randomNum}`;
                let obj = this.echarts.init(document.getElementById(id));
                chart_obj.push(obj);
            }
            // 配置项
            var option = {
                grid: {
                    // grid左上角位置：默认80 60
                    x: 60,
                    y: 50,
                    // grid右下角位置：默认80 60
                    x2: 60,
                    y2: 50,
                },
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        // 强制显示x轴的所有标签（不然x轴项太多，会被自动隐藏）
                        interval: 0,
                    },
                    data: ['Cosco', 'CMA', 'APL', 'OOCL', 'Wanhai', 'Zim']
                }],
                yAxis: [{
                    type: 'value',
                    boundaryGap: [0, 0.1]
                }],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(params) {
                        return params[0].name + '<br/>' +
                            params[0].seriesName + ' : ' + params[0].value + '<br/>' +
                            params[1].seriesName + ' : ' + (params[1].value + params[0].value);
                    }
                },
                legend: {
                    selectedMode: false,
                    data: ['value1', 'value2'],
                    backgroundColor: "#fafafa",
                    top: "2%",
                    // borderColor: "#333",
                    // borderWidth: 2
                },
                series: [{
                        name: 'value1',
                        type: 'bar',
                        stack: 'group1',
                        barCategoryGap: '50%',
                        itemStyle: {
                            normal: {
                                color: 'tomato',
                                barBorderColor: 'tomato',
                                barBorderWidth: 6,
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: 'insideTop'
                                }
                            }
                        },
                        data: [260, 200, 220, 120, 100, 80]
                    },
                    {
                        name: 'value2',
                        type: 'bar',
                        stack: 'group1',
                        itemStyle: {
                            normal: {
                                color: '#eca',
                                barBorderColor: 'tomato',
                                barBorderWidth: 6,
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: 'tomato'
                                    }
                                }
                            }
                        },
                        data: [40, 80, 50, 80, 80, 70]
                    }
                ]
            };

            let this_option = _.cloneDeep(option);
            // 改数据
            this_option.xAxis[0].data = this._.map(this.data, "name");
            this_option.series[0].data = this._.map(this.data, "value1");
            this_option.series[1].data = this._.map(this.data, "value2");
            // 显示图表
            chart_obj[0].setOption(this_option);
        }
    }
};
</script>