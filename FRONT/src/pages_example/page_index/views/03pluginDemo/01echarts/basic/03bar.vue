<style scoped>
    .chart{
    display: block;
    width: 100%;
    height: 400px;
}
</style>
<template>
    <section v-loading.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-card>
            <p> tip1：柱状图必须设置 xAxis.boundaryGap = true; </p>
            <p> tip2：柱状图可以设置堆叠效果：设置stack </p>
            <p> tip3：只有一组数据时，可以设置不同颜色让图变得好看一点【记得把图例隐藏】 </p>
            <el-button type="primary" @click="getData">重新获取数据</el-button>
        </el-card>
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
            let chart_obj = this.echarts.init(document.getElementById(this.elementId), "chic");
            // 配置项
            let option = {
                title: {
                    text: "~主标题~",
                },
                legend: {},
                tooltip: {
                    trigger: 'axis',
                },
            };
            // -------------- 设置x轴 --------------
            let xAxis = {
                name: "月份",
                type: 'category',
            };
            xAxis.data = ['一月', '二月', '三月', '四月'];
            option.xAxis = [xAxis];
            // -------------- 设置y轴 --------------
            let yAxis = {
                name: "价格(元)",
                type: 'value',
            };
            option.yAxis = [yAxis];
            // -------------- 设置series --------------
            option.series = this._.map(this.data, item => {
                let series = {
                    type: 'bar',
                    name: item.name,
                    data: item.data,
                    // tip2：柱状图可以设置堆叠效果：设置stack。stack相同的会叠在一起
                    // stack: item.type,
                    // tip3：只有一组数据时，可以设置不同颜色让图变得好看一点【记得把图例隐藏】
                    // itemStyle: {
                    //     color: params => {
                    //         const colorArr = ["#ff7576", "#ffba75", "#75bbff", "#4ce297", ];
                    //         return colorArr[params.dataIndex % colorArr.length]
                    //     }
                    // },
                };
                return series;
            });
            // 显示图表
            chart_obj.setOption(option);
            this.loading = false;
        }
    }
};
</script>