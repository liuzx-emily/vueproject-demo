<style scoped>
    .el-tree >>> .el-tree-node__content:hover .btns{
        display: block;
    }
</style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
        <section style="text-align:center;margin:10px 0;">
            <el-button v-permission:dept="1" type="primary" @click="openDial_main(1)">添加</el-button>
            <el-button v-permission:dept="4" type="danger" @click="openConfirm_delete(2)">批量删除</el-button>
        </section>
        <!-- 部门树 -->
        <el-tree :data="treeData" node-key="id" :props="{label:'name',children:'child'}" :default-expand-all="true" :highlight-current="true" :expand-on-click-node="false" :show-checkbox="true" :check-strictly="true" ref="tree" @node-click="nodeClick">
            <section class="userpage_deptTreeNode" slot-scope="{ node, data }">
                <span class="name">{{ node.label }}</span>
                <span class="btns">
                    <el-button v-permission:dept="2" class="blue" @click.stop="openDial_main(2,data)" title="编辑">
                        <i class="fa fa-edit"></i>
                    </el-button>
                    <el-button v-permission:dept="3" class="green" @click.stop="openDial_main(3,data)" title="查看">
                        <i class="fa fa-eye"></i>
                    </el-button>
                    <el-button v-permission:dept="4" class="red" @click.stop="openConfirm_delete(1,data)" title="删除">
                        <i class="fa fa-trash"></i>
                    </el-button>
                </span>
            </section>
        </el-tree>
        <!-- 弹窗：主 -->
        <dialogMain :refreshFunc="refreshData" :parentData="treeData" ref="dialogMain"></dialogMain>
    </section>
</template>
<script>
import './styles/deptTreeNode.scss'
// 引用的是 dept 页面下的 dialogMain
import dialogMain from '../../dept/dialogMain.vue'
export default {
    components: { dialogMain, },
    data() {
        return {
            loading: false,
            treeData: [],
            // 
            deptId: "",
        }
    },
    computed: {},
    watch: {
        deptId: {
            // 该回调将会在侦听开始之后被立即调用。顺序是 watch到了-> created -> mounted。
            // 所以要小心，这里HTML结构还没有渲染出来，所以$refs等是取不到的。
            immediate: true,
            // handler不可以写成箭头函数
            handler: function() {
                this.$parent.deptId = this.deptId;
            },
        },
        treeData: {
            immediate: true,
            handler: function() {
                this.$parent.deptTreeData = this.treeData;
            },
        },
    },
    created() {},
    mounted() {
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + "/dept/list.do",
            }).then(res => {
                let data = this._.cloneDeep(res.data);
                this.treeData = this.xtools.arrayToTree(data, {
                    before_idkey: "id",
                    before_parentkey: "parentId",
                    after_childkey: "child"
                });
                // 选中第一个节点
                if (this.treeData && this.treeData.length > 0) {
                    this.$nextTick(() => {
                        this.deptId = this.treeData[0].id;
                        this.$refs.tree.setCurrentKey(this.deptId);
                    });
                }
                this.loading = false;
            });
        },
        // 点击树的节点
        nodeClick() {
            this.deptId = this.$refs.tree.getCurrentNode().id;
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
            this.xtools.openConfirm_delete({
                url: '/dept/delete.do',
                data: { ids },
                refreshFunc: this.refreshData,
            });
        }
    }
};
</script>