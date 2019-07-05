<style lang="less">
.detailPage-title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
}
.detailPage-info {
    font-size: 14px;
    color: #999;
    text-align: center;
    margin-bottom: 20px;
    span {
        margin: 0 10px;
    }
}
.detailPage-fileList {
    border-top: 3px solid #eee;
    padding-top: 15px;
    color: #555;
    font-size: 14px;
    span {
        margin-top: 5px;
        margin-right: 10px;
        display: inline-block;

    }
    ul {
        display: inline-block;
        vertical-align: top;
        li {
            margin: 5px 0;
            text-decoration: underline;
            cursor: pointer;
            color: #2196F3;
        }
    }
}
</style>
<template>
    <section>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:20px 0;">
            <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="listPageUrl">{{column.name}}</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 详情 -->
        <div class="detailPage">
            <div class="detailPage-title">{{article.title}}</div>
            <div class="detailPage-info">
                <span>发布人：{{article.publisher}}</span>
                <time>发布时间：{{article.date}}</time>
            </div>
            <div v-html="article.content"></div>
            <div class="detailPage-fileList" v-if="article.fileList&&article.fileList.length>0">
                <span>附件下载：</span>
                <ul>
                    <li v-for="item in article.fileList" title="点击下载" @click="do_download(item.id)">{{item.name}}</li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            // 栏目id和名称
            column: {
                id: "",
                name: ""
            },
            // 文章
            article: {
                title: "",
                date: "",
                publisher: "",
                content: "",
                fileList: []
            }
        };
    },
    computed: {
        listPageUrl() {
            return "/list/" + this.column.id;
        }
    },
    watch: {
        "$route.params.id"() {
            this.getData();
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        do_download(id) {
            window.location.href = BASE_PATH + `/esi/download.htmls?id=${id}`;
        },
        getData() {
            this.column = {
                id: 123,
                name: "栏目名称",
            };
            this.article = {
                title: "标题",
                date: "2018-08-08",
                publisher: "小明",
                content: "<p style='color:red;'>哈哈</p>",
                fileList: [
                    { name: "附件1", id: 1 },
                    { name: "附件2", id: 2 },
                ]
            };
            // this.loading = true;
            // this.xAxios({
            //     method: 'get',
            //     url: BASE_PATH + '/esi/front/details.htmls',
            //     params: {
            //         id: this.$route.params.id
            //     }
            // }).then(res => {
            //     this.column = {
            //         id: res.data.catalogId,
            //         name: res.data.name,
            //     };
            //     this.article = {
            //         title: res.data.title,
            //         date: xtools.formattingDate(res.data.time, 1),
            //         publisher: res.data.publisher,
            //         content: res.data.content,
            //         fileList: res.data.list
            //     }
            //     this.loading = false;
            // }).catch(error => {});
        }
    }
};
</script>