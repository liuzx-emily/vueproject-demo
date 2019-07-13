<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;">
            <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{columnName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 列表 -->
        <!-- maxCount 最多展示多少篇文章，默认为0（不限制数量）
             maxTitleLength 标题最大长度，默认为30 -->
        <articleList :list="list" :maxTitleLength="50" />
        <!-- 分页 -->
        <el-pagination layout="total,sizes,prev, pager, next" :total="count" :page-sizes="[10,20,50]" style="margin-top:20px;text-align:center;" @current-change="currentChange" @size-change="sizeChange">
        </el-pagination>
    </section>
</template>
<script>
import _ from 'lodash'
import articleList from '../modules/articleList.vue'
export default {
    components: { articleList },
    data() {
        return {
            loading: false,
            columnName: "",
            list: [],
            count: 0,
            page: 1,
            row: 10
        };
    },
    watch: {
        "$route.params.id"() {
            this.page = 1;
            this.row = 10;
            this.getData();
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        sizeChange(value) {
            this.page = 1;
            this.row = value;
            this.getData();
        },
        currentChange(value) {
            this.page = value;
            this.getData();
        },
        getData() {
            this.columnName = "栏目名称";
            this.list = [
                { id: "1", title: "文章1", time: 1551236004594 },
                { id: "2", title: "文章2", time: 1551236004594 },
                { id: "3", title: "文章3名字很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长", time: 1551236004594 },
                { id: "4", title: "文章4", time: 1551236004594 },
                { id: "5", title: "文章5", time: 1551236004594 },
                { id: "6", title: "文章6", time: 1551236004594 },
                { id: "7", title: "文章7", time: 1551236004594 },
                { id: "8", title: "文章8", time: 1551236004594 },
                { id: "9", title: "文章9", time: 1551236004594 },
                { id: "10", title: "文章10", time: 1551236004594 },
            ];
            this.count = 15;
            // this.loading = true;
            // this.xAxios({
            //     method: 'get',
            //     url: BASE_PATH + '/esi/front/list.htmls',
            //     params: {
            //         id: this.$route.params.id,
            //         page: this.page,
            //         row: this.row
            //     }
            // }).then(res => {
            //     this.columnName = res.data.name;
            //     this.list = res.data.data;
            //     this.count = res.data.count;
            //     this.loading = false;
            // }).catch(error => {});
        }
    }
};
</script>