<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-card>
            <div slot="header" class="clearfix">
                <span>修改表格样式</span>
            </div>
            <div>
                <p>1 tableClassColor 默认值为 color-common ，可选 color-neat
                    <el-input v-model="tableClass.color"></el-input>
                </p>
                <p>2 tableClassSize：默认 size-common ，可选 size-big size-small
                    <el-input v-model="tableClass.size"></el-input>
                </p>
                <p>3 tableClassAlign 默认值为 align-center ，可选 align-left
                    <el-input v-model="tableClass.align"></el-input>
                </p>
                <p>（预设的样式写在table组件中了）</p>
            </div>
        </el-card>
        <xTable :refresh="refresh" ref="table" :tableClassColor="tableClass.color" :tableClassSize="tableClass.size" :tableClassAlign="tableClass.align">
            <el-table-column prop="name" label="名称" sortable="custom"></el-table-column>
            <el-table-column prop="gender" label="性别" sortable="custom">
                <template slot-scope="scope">{{scope.row.genderText}}</template>
            </el-table-column>
            <el-table-column prop="select1" label="下拉框" sortable="custom">
                <template slot-scope="scope">{{scope.row.select1Text}}</template>
            </el-table-column>
            <el-table-column prop="time" label="日期" width="120px">
                <template slot-scope="scope">{{scope.row.timeText}}</template>
            </el-table-column>
            <el-table-column label="操作" width="250px">
                <template slot-scope="scope">
                    <el-button class="tinyBtn" type="primary" @click="">查看</el-button>
                    <el-button class="tinyBtn" type="success" @click="">编辑</el-button>
                    <el-button class="tinyBtn" type="warning" @click="">审核</el-button>
                    <el-button class="tinyBtn" type="danger" @click="">删除</el-button>
                </template>
            </el-table-column>
        </xTable>
    </section>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            loading: false,
            tableClass: {
                color: "color-common",
                size: "size-common",
                align: "align-left",
            }
        };
    },
    mounted() {
        this.refreshTable_pageOne();
    },
    methods: {
        // ------------------------------ 表格 ------------------------------
        // 传给子组件用的
        refresh(param, self) {
            console.log(param);
            // 获取表格数据
            self.loading = true;
            self
                .xAxios({
                    method: "get",
                    url: BASE_PATH + "/example/xTable.htmls",
                    params: param
                })
                .then(response => {
                    const res = response.data;
                    // 数据格式化
                    self.tableData = this._.map(res.data, item => {
                        item.timeText = this.xTools.formatDate(item.time, 1);
                        // 性别
                        if (item.gender === 1) {
                            item.genderText = "男";
                        } else if (item.gender === 0) {
                            item.genderText = "男";
                        } else {
                            item.genderText = "";
                        }
                        // 下拉框
                        if (item.select1 === 1) {
                            item.select1Text = "值1";
                        } else if (item.select1 === 2) {
                            item.select1Text = "值2";
                        } else {
                            item.select1Text = "";
                        }
                        return item;
                    });
                    self.count = res.count;
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        // 刷新表格（跳回第一页）
        refreshTable_pageOne() {
            this.$refs.table.pageNum = 1;
            this.$refs.table.refreshTable();
        },
    }
};
</script>