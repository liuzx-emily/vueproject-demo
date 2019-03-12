<style>
.dashboardchart {
    width: 250px;
    height: 260px;
    display: inline-block;
    vertical-align: bottom;
    margin: 0 20px;
}
</style>
<template>
    <section id="dashboardchart_container" class="box-with-shadow">
        <el-alert title="因为标题放在图表下方，所以为了给标题留出位置，容器的高度要大于宽度" type="info" :closable="false"></el-alert>
        <section v-for="n in 3" :key="n" :id="'dashboardchart_'+n+'_'+randomNum" class="dashboardchart"></section>
    </section>
</template>
<script>
export default {
    data() {
        return {
            randomNum: this.xTools.guid(),
            initFlag: false,
            data: [{ value: 15, name: '成交率' }, { value: 84, name: '交付率' }, { value: 53, name: '完成率' }]
        }
    },
    methods: {
        initChart() {
            this.initFlag = true;
            // 初始化
            let chart_obj = [];
            for (let i = 0; i < 3; i++) {
                let id = `dashboardchart_${i + 1}_${this.randomNum}`;
                console.log(id);
                let obj = this.echarts.init(document.getElementById(id));
                chart_obj.push(obj);
            }
            // 配置项
            var option = {
                series: [{
                    type: 'gauge',
                    // 画的大一点
                    radius: '90%',
                    //开始角度 左侧角度
                    startAngle: 220,
                    //结束角度 右侧
                    endAngle: -40,
                    // 指针
                    pointer: {
                        show: true,
                        width: 5,
                    },
                    // 标题：字号调大加粗，向下挪
                    title: {
                        show: true,
                        textStyle: {
                            color: "#4e96ef",
                            fontSize: 16,
                            fontWeight: 'bold',
                        },
                        offsetCenter: ["0", "90%"]
                    },
                    // 数据：字号调小一点，向下挪
                    detail: {
                        show: true,
                        fontSize: 14,
                        formatter: function(value) {
                            return value + "%";
                        },
                        offsetCenter: ["0", "60%"]
                    },
                    // 刻度标签：字号调小一点
                    axisLabel: {
                        show: true,
                        fontSize: 12,
                    },
                    axisLine: {
                        lineStyle: {
                            // 圆弧的宽度
                            width: 12,
                            // 圆弧的颜色区间
                            color: [
                                [0.2, '#ff5722'],
                                [0.8, '#03a9f4'],
                                [1, '#8bc34a']
                            ]
                        }
                    },
                    // 刻度线：长度改小
                    splitLine: {
                        length: 12
                    },
                }]
            };

            _.forEach(this.data, (item, index) => {
                let this_option = _.cloneDeep(option);
                // 改数据
                this_option.series[0].data = [item];
                // 显示图表
                chart_obj[index].setOption(this_option);
            });

        }
    }
};
</script>