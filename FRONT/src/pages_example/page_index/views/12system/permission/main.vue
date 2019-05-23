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
                    <span v-if="scope.row.type==1" style="color:#9C27B0">导航</span>
                    <span v-if="scope.row.type==2" style="color:#4CAF50">页面</span>
                    <span v-if="scope.row.type==3" style="color:#ff9800">按钮</span>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="code" width="350px"></el-table-column>
            <el-table-column prop="icon" label="icon" width="180px"></el-table-column>
            <el-table-column label="操作" width="250px">
                <template slot-scope="scope" v-if="scope.row.id!='0'">
                    <el-button class="size-small" type="warning" v-if="checkBtn('edit')" @click="openDial_main(2,scope.row)">编辑</el-button>
                    <el-button class="size-small" type="success" v-if="checkBtn('look')" @click="openDial_main(3,scope.row)">查看</el-button>
                    <el-button class="size-small" type="danger" v-if="checkBtn('delete')" @click="openConfirm_delete(scope.row)">删除</el-button>
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
                url: BASE_PATH + "/permission/list.do",
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
        openConfirm_delete(data) {
            this.$refs.confirmDelete.openConfirm([data.id]);
        }
    }
};
</script>