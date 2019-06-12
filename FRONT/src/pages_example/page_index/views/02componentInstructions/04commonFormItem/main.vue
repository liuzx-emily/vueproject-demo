<style scoped></style>
<template>
    <section>
        <el-button type="success" class="size-big" @click="fuzhi">赋值</el-button>
        <el-button type="primary" class="size-big" @click="printParam">打印参数</el-button>
        <br>
        <el-card>
            <div slot="header">
                <span>使用说明</span>
            </div>
            <!-- card body -->
            <p>1 manyLevelAddress：可选参数<code>hasNullOption</code>（是否添加 "请选择"这一空项，默认为true）</p>
            <p>2 pickDateRange：可选参数<code>cannotBeFuture</code>（不能选择未来吗，默认为true）；可选参数<code>width</code>（每个picker的宽度，默认为150px）</p>
            <p>3 pickYear：可选参数<code>cannotBeFuture</code>（不能选择未来吗，默认为true）；可选参数<code>width</code>（每个picker的宽度，默认为150px）</p>
        </el-card>
        <section class="search-condition">
            <section class="box">
                <span class="search-label">行政区划：</span>
                <span class="search-input">
                    <!-- 可选参数hasNullOption：是否添加 "请选择"这一空项（默认为true） -->
                    <!-- 可选参数width，默认为"" -->
                    <manyLevelAddress :flevelOne.sync="searchparam.address_levelone" :flevelTwo.sync="searchparam.address_leveltwo" :flevelThree.sync="searchparam.address_levelthree" :hasNullOption="true" width="" />
                </span>
            </section>
            <section class="box">
                <span class="search-label">日期范围：</span>
                <span class="search-input">
                    <!-- 可选参数cannotBeFuture：不能选择未来吗，默认为true -->
                    <!-- 可选参数width，默认为"" -->
                    <pickDateRange :fstartTime.sync="searchparam.startTime" :fendTime.sync="searchparam.endTime" :cannotBeFuture="true" width="" />
                </span>
            </section>
            <section class="box">
                <span class="search-label">年份：</span>
                <span class="search-input">
                    <!-- 可选参数cannotBeFuture：不能选择未来吗，默认为true -->
                    <!-- 可选参数width，默认为"" -->
                    <pickYear :fyear.sync="searchparam.year" :cannotBeFuture="true" width="" />
                </span>
            </section>
        </section>
    </section>
</template>
<script>
export default {
    props: {},
    components: {},
    data() {
        return {
            // 
            searchparam: {
                address_levelone: "",
                address_leveltwo: "",
                address_levelthree: "",
                startTime: "",
                endTime: "",
                year: "",
            }
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        printParam() {
            console.log(`一级地址：${this.searchparam.address_levelone}`);
            console.log(`二级地址：${this.searchparam.address_leveltwo}`);
            console.log(`三级地址：${this.searchparam.address_levelthree}`);
            console.log(`起始时间：${this.searchparam.startTime}`);
            console.log(`结束时间：${this.searchparam.endTime}`);
            console.log(`年份：${this.searchparam.year}`);
        },
        fuzhi() {
            // 广东-广州-海珠
            this.searchparam.address_levelone = "440000";
            this.searchparam.address_leveltwo = "440100";
            this.searchparam.address_levelthree = "440105";
            // 20190526-20190612
            this.searchparam.startTime = 1558800000000;
            this.searchparam.endTime = 1560355199999;
            // 2017年
            this.searchparam.year = 2017;
        }
    }
};
</script>