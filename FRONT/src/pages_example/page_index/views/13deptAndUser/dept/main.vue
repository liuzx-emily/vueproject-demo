<style scoped>
    .el-tree >>> .el-tree-node__content {
        /*padding-top: 5px;*/
        /*padding-bottom: 5px;*/
    }
    .el-tree >>> .el-tree-node__content:hover .btns{
        display: block;
    }
</style>
<template>
    <section>
        <section style="text-align:center;margin:10px 0;">
            <el-button class="size-common" type="primary" @click="openDial_main(1)" v-if="checkBtn('add')">添加</el-button>
            <el-button class="size-common" type="success" @click="openDial(1)" v-if="checkBtn('add')">导入</el-button>
            <el-button class="size-common" type="danger" @click="openConfirm_delete(2)" v-if="checkBtn('delete')">删除</el-button>
        </section>
        <!-- 部门树 -->
        <el-tree :data="mainData" node-key="id" :props="treeProps" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" :show-checkbox="true" ref="tree">
            <section class="userpage_deptTreeNode" slot-scope="{ node, data }">
                <span class="name">{{ node.label }}</span>
                <span class="btns">
                    <el-button class="blue" @click.stop="openDial_main(2,data)" title="编辑" v-if="checkBtn('edit')">
                        <i class="fa fa-edit"></i>
                    </el-button>
                    <el-button class="green" @click.stop="openDial_main(3,data)" title="查看" v-if="checkBtn('look')">
                        <i class="fa fa-eye"></i>
                    </el-button>
                    <el-button class="red" @click.stop="openConfirm_delete(1,data)" title="删除" v-if="checkBtn('delete')">
                        <i class="fa fa-trash"></i>
                    </el-button>
                </span>
            </section>
        </el-tree>
        <dialogMain :refreshFunc="refreshData" :mainData="mainData" ref="dialogMain"></dialogMain>
        <confirmDelete :refreshFunc="refreshData" ref="confirmDelete"></confirmDelete>
    </section>
</template>
<script>
import './deptTreeNode.scss'
import dialogMain from './dialogMain.vue'
import confirmDelete from './confirmDelete.vue'
export default {
    props: {},
    components: { dialogMain, confirmDelete },
    data() {
        return {
            loading: false,
            treeProps: { label: 'name', children: 'child' },
            mainData: [],
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.refreshData();
    },
    methods: {
        checkBtn(code) {
            return true;
            var btnPermmisionCheck = this.xTools.checkBtn(this.$store, 'dept:btn:' + code);
            return btnPermmisionCheck;
        },
        refreshData() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + "/dept/list.do",
            }).then((response) => {
                const res = response.data;
                let data = this.xTools.arrayToTree(this._.cloneDeep(res.data), {
                    before_idkey: "id",
                    before_parentkey: "parentId",
                    after_childkey: "child",
                });
                this.mainData = data;
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