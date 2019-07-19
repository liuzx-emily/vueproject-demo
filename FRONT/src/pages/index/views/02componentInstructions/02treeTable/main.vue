<style>
</style>
<template>
    <section>
        <el-card>
            <p>1 属性中不能包含<code>children</code> 因为新版本的element（v2.7.0 更新于2019-03-28），table组件支持树形结构，只要他检测到存在children属性，就会认为这是一个树形数据并相应渲染。</p>
            <p>2 样式控制和xTable一样：传递<code>color</code>、<code>size</code>、<code>align</code></p>
        </el-card>
        <el-card>
            <div slot="header">
                为什么不用新版本element默认支持的树形table？
            </div>
            <!-- card body -->
            <p>因为他的实现非常简陋，不支持默认展开节点数据。一开始所有节点都是收缩的。</p>
            <p>这就导致：想要编辑一个层级很深的元素的话，你需要一层层点开。编辑成功后页面自动刷新，所有节点又全部收起来了。你想查看效果，又得一层层点开</p>
        </el-card>
        <treeTable :data="treeTableData" :controlColumn="treeTableProps.controlColumn" :expandAll="treeTableProps.expandAll" :color="treeTableProps.color" :size="treeTableProps.size" :align="treeTableProps.align">
            <el-table-column prop="description" label="描述"></el-table-column>
        </treeTable>
    </section>
</template>
<script>
import { listData } from './data/listData.js'
export default {
    data() {
        return {
            treeTableProps: {
                controlColumn: { label: "名称", prop: "name", width: "" },
                expandAll: true,
                color: "common",
                size: "small",
                align: "center",
            },
            treeTableData: [],
        }
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            setTimeout(() => {
                this.treeTableData = this.xtools.arrayToTree(listData, {
                    id: "id",
                    parentId: "parentId",
                    children: "child"
                });
                this.loading = false;
            }, 1000);
        },
    }
};
</script>