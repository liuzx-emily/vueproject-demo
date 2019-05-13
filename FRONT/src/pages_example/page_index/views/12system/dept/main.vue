<template>
    <section>
        <section class="search-condition">
            <section class="search-btn-box">
                <el-button size="small" type="primary" @click="openDial_main(1)" v-if="checkBtn('add')">新增</el-button>
            </section>
        </section>
        <treeTable :data="mainData" :controlColumn="controlColumn" :expandAll="true">
            <el-table-column prop="type" label="类型" width="100px">
                <template slot-scope="scope">
                    <span v-if="scope.row.type==1">好吃</span>
                    <span v-if="scope.row.type==2">不好吃</span>
                    <span v-else></span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="备注" width="250px"></el-table-column>
            <el-table-column label="操作" width="250px">
                <template slot-scope="scope" v-if="scope.row.id!='0'">
                    <el-button class="size-small" type="warning" v-if="checkBtn('edit')" @click="openDial_main(2,scope.row)">编辑</el-button>
                    <el-button class="size-small" type="success" v-if="checkBtn('look')" @click="openDial_main(3,scope.row)">查看</el-button>
                    <el-button class="size-small" type="danger" v-if="checkBtn('delete')" @click="openConfirm_delete(1,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </treeTable>
        <dialogMain :refreshFunc="refreshData" :mainData="mainData" ref="dialogMain"></dialogMain>
        <confirmDelete :refreshFunc="refreshData" ref="confirmDelete"></confirmDelete>
    </section>
</template>
<script>
import dialogMain from './dialogMain.vue'
import confirmDelete from './confirmDelete.vue'
export default {
    components: { dialogMain, confirmDelete },
    data() {
        return {
            loading: false,
            controlColumn: {
                label: '名称',
                prop: 'name',
                width: ''
            },
            mainData: [],
        }
    },
    computed: {},
    mounted() {
        this.refreshData();
    },
    methods: {
        // 检查按钮权限
        checkBtn(code) {
            var btnPermmisionCheck = this.xTools.checkBtn(this.$store, 'dept:btn:' + code);
            return btnPermmisionCheck;
        },
        // 表格treetable
        refreshData() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + "/dept/list.do",
            }).then((response) => {
                const res = response.data;
                let data = this._.cloneDeep(res.data);
                this.mainData = this.xTools.arrayToTree(data, {
                    before_idkey: "id",
                    before_parentkey: "parentId",
                    after_childkey: "child"
                });
                this.loading = false;
            }).catch(error => {
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
                // ids = this._.map(this.$refs.table.tableSelection,"id");
                ids = this.$refs.tree.getCheckedKeys();
                if (ids.length == 0) {
                    this.$message({
                        type: 'error',
                        message: '请先勾选数据！'
                    });
                    return false;
                }
            }
            this.$refs.confirmDelete.openConfirm(ids);
        }

    }
};
</script>