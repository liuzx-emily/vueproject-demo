<style scoped>
    @media screen and (min-width: 1400px) {
    .ringchart {
        margin: 0 4px;
    }
}
@media screen and (min-width: 1500px) {
    .ringchart {
        margin: 0 8px;
    }
}
@media screen and (min-width: 1600px) {
    .ringchart {
        margin: 0 10px;
    }
}
@media screen and (min-width: 1700px) {
    .ringchart {
        margin: 0 20px;
    }
}
@media screen and (min-width: 1800px) {
    .ringchart {
        margin: 0 30px;
    }
}
.ringchart {
    display: inline-block;
    width: 130px;
    height: 130px;
}
</style>
<template>
    <section class="box-with-shadow">
        <el-alert title="分成两行，每行放8个。间距用 @media 做成响应式" type="info" :closable="false"></el-alert>
        <div>
            <section v-for="n in [1,2,3,4,5,6,7,8]" :id="'ringchart_'+n+'_'+randomNum" class="ringchart"></section>
        </div>
        <div>
            <section v-for="n in [9,10,11,12,13,14,15,16]" :id="'ringchart_'+n+'_'+randomNum" class="ringchart"></section>
        </div>
    </section>
</template>
<script>
export default {
    props: {},
    data() {
        return {
            randomNum: this.xTools.guid(),
            initFlag: false,
            data: [
                { name: "和平区", value: 54 },
                { name: "河西区", value: 44 },
                { name: "南开区", value: 35 },
                { name: "河东区", value: 30 },
                { name: "红桥区", value: 17 },
                { name: "东丽区", value: 11 },
                { name: "西青区", value: 20 },
                { name: "津南区", value: 65 },
                { name: "北辰区", value: 10 },
                { name: "武清区", value: 20 },
                { name: "宝坻区", value: 54 },
                { name: "滨海新区", value: 54 },
                { name: "宁河区", value: 54 },
                { name: "静海区", value: 54 },
                { name: "河北区", value: 59 },
                { name: "蓟州区", value: 100 },
            ]
        }
    },
    mounted() {
        // this.initChart();
    },
    methods: {
        initChart() {
            this.initFlag = true;
            let colorArr = ["#01a6a6", "#fbc533", "#aad571", "#f89046", "#33cca1", "#fc7e4b", "#3585f6", "#9575cd", "#FB8C00", "#D84315", "#607d8b", "#e6a23c", "#f56c6c", "#795548", "#9d8eb7", "#F9A825"];
            // 初始化
            let chart_obj = [];
            for (let i = 0; i < 16; i++) {
                let id = `ringchart_${i + 1}_${this.randomNum}`;
                let obj = this.echarts.init(document.getElementById(id));
                chart_obj.push(obj);
            }
            // 配置项
            var option = {
                title: {
                    text: "123",
                    textStyle: {
                        color: "red",
                        fontSize: "14",
                    },
                    subtextStyle: {
                        color: "red",
                        fontSize: "13",
                    },
                    subtext: "54%",
                    left: "center",
                    top: "38%",
                    // 主副标题之间的间距。 默认10
                    itemGap: 2
                },
                color: ['#333', "red"],
                tooltip: {
                    show: false
                },
                legend: {
                    show: false
                },
                series: [{
                    type: 'pie',
                    radius: ['60%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 46, name: '未审计' },
                        { value: 54, name: '已审计' },
                    ]
                }]
            };
            _.forEach(this.data, (item, index) => {
                let this_option = _.cloneDeep(option);
                // 改数据
                this_option.series[0].data = [
                    { value: 100 - item.value },
                    { value: item.value },
                ];
                this_option.title.text = item.name;
                this_option.title.subtext = item.value + "%";
                // 改颜色
                let this_color = colorArr[index]
                this_option.color = ['#ddd', this_color];
                this_option.title.textStyle.color = this_color;
                this_option.title.subtextStyle.color = this_color;
                // 显示图表
                chart_obj[index].setOption(this_option);
            });
        }
    }
};
</script>