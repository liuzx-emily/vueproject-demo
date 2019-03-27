<template>
    <section>
        <h1>权限管理（开发完成之后删掉）</h1>
        <el-tree :data="data" :props="props" style="width:100%;">
            <span slot-scope="{ node, data }">
                <span style="margin-right:30px">{{ node.label }}</span>
                <span>{{ data.uri}}</span>
                <span>
                    <!-- <el-button size="mini" @click="">编辑</el-button> -->
                    <el-button size="mini" @click="do_delete(data.permissionId)">删除</el-button>
                </span>
            </span>
        </el-tree>
    </section>
</template>
<script>
export default {
    name: "role",
    data() {
        return {
            data: [],
            props: {
                label: "name"
            }
        }
    },
    created() {
        this.getData();
        alert("没有完成，屏蔽掉了");
    },
    methods: {
        getData() {
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/permission/all.htmls',
                params: {
                    type: 1,
                    showAll: true
                }
            }).then((response) => {
                const res = response.data;
                this.data = this.xTools.arrayToTree(res, { before_idkey: "permissionId", before_parentkey: "parentId", after_childkey: 'children' });
            }).catch(error => {});
        },
        do_delete(id) {
            this.xAxios({
                method: 'post',
                url: BASE_PATH + '/permission/delete.htmls',
                params: {
                    ids: id
                }
            }).then((response) => {
                const res = response.data;
                if (res.code == 1) {
                    alert("删除成功！");
                    this.getData();
                } else {
                    alert("删除失败！");
                }
            }).catch(error => {});
        }
    }
};
</script>