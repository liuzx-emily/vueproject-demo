<style scoped></style>
<template>
    <section>
        <gc-editor :fcontent.sync="dialogData.content" ref="editor" height="200"></gc-editor>
        <button type="button" @click="saveData">保存</button>
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
                this.$refs.editor.setContent(this.dialogData.content);
            });
        },
        saveData() {
            this.currentMagic.data.content = this.dialogData.content;
        },
    }
};
</script>