<style scoped></style>
<template>
    <section>
        <el-input v-model="dialogData.title"></el-input>
        <el-button class="size-tiny color-prettyblue" @click="do_add"><i class="el-icon-plus"></i> 添加子内容</el-button>
        <el-button class="size-tiny color-prettyred" @click="do_delete"><i class="el-icon-delete"></i> 删除</el-button>
        <el-button type="primary" @click="saveData">保存</el-button>
    </section>
</template>
<script>
// 数据
import original_data from '../data/mainData.js'
export default {
    data() {
        return {
            dialogData: {
                title: "",
            }
        }
    },
    computed: {
        currentId() {
            return this.$store.state.magicComponent.currentId;
        },
        currentData() {
            return this.$store.state.magicComponent.currentData;
        }
    },
    watch: {
        currentId(value) {
            if (value) {
                this.refreshData();
            }
        },
    },
    methods: {
        refreshData() {
            this.dialogData.title = this.currentData.title || "";
        },
        saveData() {
            this.currentData.title = this.dialogData.title;
        },
        do_add() {
            // if (!this.currentData.list) {
            //     // 这里必须用 this.$set 来新增属性，不然就会出现 "数据变化了，但是渲染没有更新" 的问题
            //     this.$set(this.currentData, "list", []);
            //     // this.currentData.list = [];
            // }
            let newItem = this._.cloneDeep(original_data);
            newItem.id = this.xtools.randomId();
            newItem.active = true;

            this.$store.commit("magicComponent/addItem", newItem);
        },
        do_delete() {
            this.$store.commit("magicComponent/deleteItem");
        },
    }
};
</script>