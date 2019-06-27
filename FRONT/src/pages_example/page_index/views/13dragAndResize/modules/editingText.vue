<style scoped></style>
<template>
    <section>
        <xEditor :fcontent.sync="dialogData.content" ref="xEditor" height="200" />
        <el-button type="primary" @click="saveData">保存</el-button>
    </section>
</template>
<script>
export default {
    data() {
        return {
            dialogData: {
                content: "",
            }
        }
    },
    computed: {
        currentMagic() {
            return this.$store.state.magicComponent.currentComponent;
        }
    },
    watch: {
        currentMagic(value) {
            if (value) {
                this.refreshData();
            }
        }
    },
    methods: {
        refreshData() {
            this.dialogData.content = this.currentMagic.data.content || "";
            this.$nextTick(() => {
                this.$refs.xEditor.setContent(this.dialogData.content);
            });
        },
        saveData() {
            this.currentMagic.data.content = this.dialogData.content;
        },
    }
};
</script>