<style scoped>
.ringchart2 {
    width: 100%;
    height: 500px;
}
</style>
<template>
    <section class="box-with-shadow">
        <div>
            <section :id="elementId" class="ringchart2"></section>
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
                // { name: "蓟州区", value: 100 },
            ],
            // 每行放几个
            count_per_row: 6,
            // 每个pie有多大
            each_pie_size: 200

        }
    },
    computed: {
        elementId() {
            return "ringchart2_" + this.randomNum;
        },
        // 总共有几行
        row_number() {
            return Math.ceil(this.data.length / this.count_per_row);
        }

    },
    mounted() {

    },
    methods: {
        initChart() {
            this.initFlag = true;
            let colorArr = ["#01a6a6", "#fbc533", "#aad571", "#f89046", "#33cca1", "#fc7e4b", "#3585f6", "#9575cd", "#FB8C00", "#D84315", "#607d8b", "#e6a23c", "#f56c6c", "#795548", "#9d8eb7", "#F9A825"];
            // 设置height
            let elementHeight = this.each_pie_size * this.row_number
            let element = document.getElementById(this.elementId);
            element.style.height = elementHeight + "px";
            // 初始化
            let chart_obj = this.echarts.init(element);
            let option = {
                // legend颜色会用这个color
                color: colorArr,
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                    // 和每个series的name对应
                    data: this._.map(this.data, "name"),
                },
                series: []
            };
            _.forEach(this.data, (item, index) => {
                index += 1;
                // 在第几行
                let row = Math.ceil(index / this.count_per_row);
                // 在第几列
                let col = index - (row - 1) * this.count_per_row;
                // 计算位置
                let x = (2 * col - 1) / (2 * this.count_per_row) * 100;
                let y = (2 * row - 1) / (2 * this.row_number) * 100;
                // console.log(`第${index}个，在第${row}行，第${col}列，圆心在 (${x}%,${y}%)`);
                let this_series = {
                    // 这里的name，是整个饼图的name。为了在legend中显示的
                    name: item.name,
                    type: 'pie',
                    // 圆心位置
                    center: [x + "%", y + "%"],
                    // 半径，单位px
                    radius: [60, 80],
                    data: [{
                            name: "",
                            value: item.value,
                            itemStyle: {
                                color: colorArr[index - 1],
                            },
                            // 文字 放在环的里面
                            label: {
                                show: true,
                                position: 'center',
                                fontSize: 16,
                                formatter: function(params) {
                                    return `${item.name}\n${params.value}%`;
                                },
                            },
                            // 视觉引导线 隐藏
                            labelLine: {
                                show: false,
                            },
                        }, {
                            name: '',
                            value: 100 - item.value,
                            itemStyle: {
                                color: '#eee',
                            }
                        },

                    ]
                };
                option.series.push(this_series)
            });
            // 显示图表
            chart_obj.setOption(option);
        }
    }
};
</script>