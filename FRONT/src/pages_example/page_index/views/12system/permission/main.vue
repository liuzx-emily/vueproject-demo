<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
        <section class="search-condition">
            <section class="search-btn-box">
                <el-button v-permission:permission="1" type="primary" @click="openDial_main(1)">新增</el-button>
            </section>
        </section>
        <treeTable :data="treeTableData" :controlColumn="treeTableProps.controlColumn" :expandAll="treeTableProps.expandAll">
            <el-table-column prop="type" label="类型" width="100px">
                <template slot-scope="scope">
                    <span v-if="scope.row.type==1" style="color:#9C27B0">导航</span>
                    <span v-if="scope.row.type==2" style="color:#4CAF50">页面</span>
                    <span v-if="scope.row.type==3" style="color:#ff9800">按钮</span>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="code" width="350px"></el-table-column>
            <el-table-column prop="icon" label="icon" width="180px"></el-table-column>
            <el-table-column label="操作" width="250px">
                <template slot-scope="scope">
                    <el-button class="size-small" type="warning" v-permission:permission="2" @click="openDial_main(2,scope.row)">编辑</el-button>
                    <el-button class="size-small" type="success" v-permission:permission="3" @click="openDial_main(3,scope.row)">查看</el-button>
                    <el-button class="size-small" type="danger" v-permission:permission="4" @click="openConfirm_delete(1,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </treeTable>
        <!-- 弹窗：主 -->
        <dialogMain :refreshFunc="refreshData" :parentData="treeTableData" ref="dialogMain"></dialogMain>
    </section>
</template>
<script>
import dialogMain from './dialogMain.vue'
export default {
    components: { dialogMain, },
    data() {
        return {
            loading: false,
            treeTableProps: {
                controlColumn: { label: "名称", prop: "name", width: "" },
                expandAll: true,
            },
            treeTableData: [],
        }
    },
    computed: {},
    mounted() {
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + "/permission/list.do",
            }).then((response) => {
                const res = response.data;
                let data = this._.cloneDeep(res.data);
                this.treeTableData = this.xTools.arrayToTree(data, {
                    before_idkey: "id",
                    before_parentkey: "parentId",
                    after_childkey: "child"
                });
                this.loading = false;
            });
        },
        // 打开弹窗：主弹窗
        openDial_main(type, data) {
            data = data || {};
            this.$refs.dialogMain.openDial(type, data.id);
        },
        // 打开询问框：删除
        openConfirm_delete(type, data) {
            let ids = [];
            if (type == 1) {
                // 单个
                ids = [data.id];
            } else if (type == 2) {
                // 批量
            }
            this.xTools.openConfirm({
                ids: ids,
                url: '/permission/delete.do',
                refreshFunc: this.refreshData,
                context: this,
            });
        }
    }
};
</script>