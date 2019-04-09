<style scoped>
    .meternumber_textarea{
        margin-bottom:10px;
    }
    .meternumber_input{
        display: inline-block;
        width: 190px;
        margin-right:8px
    }
</style>
<template>
    <section>
        <el-input type="textarea" :rows="4" v-model="alltext" resize="none" disabled class="meternumber_textarea"></el-input>
        <template v-if="!readonly">
            <el-input v-model="text" class="meternumber_input"></el-input>
            <el-button type="primary" @click="do_add" class="size-small">添加</el-button>
            <el-button type="danger" @click="do_clear" class="size-small" style="margin-left: 5px;">清空</el-button>
        </template>
    </section>
</template>
<script>
export default {
    props: {
        readonly: {
            type: Boolean,
            default: false
        },
        val: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            alltext: this.val,
            text: ""
        }
    },
    watch: {
        val() {
            if (this.val) {
                this.alltext = this.val;
            } else {
                this.alltext = "";
            }
        },
        alltext() {
            this.$emit("update:val", this.alltext);
        }
    },
    methods: {
        do_add() {
            // 没填新的
            if (this.text.length == 0) {
                return;
            }
            if (/,/.test(this.text)) {
                alert("请不要输入逗号！");
                return;
            }
            if (this.alltext.length == 0) {
                // 之前没有，直接赋值
                this.alltext = this.text;
            } else {
                // 之前有，要添加
                var arr = this.alltext.split(",");
                arr.push(this.text);
                this.alltext = arr.join(",");
            }
            this.text = "";
        },
        do_clear() {
            this.alltext = "";
        }
    }
};
</script>