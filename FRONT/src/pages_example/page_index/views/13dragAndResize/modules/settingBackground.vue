<style scoped></style>
<template>
    <section>
        <el-form ref="form" label-width="70px" :model="dialogData" :rules="rules">
            <el-form-item label="背景" prop="backgroundType">
                <el-radio-group v-model="dialogData.backgroundType" style="width:100%">
                    <el-radio :label="1">无</el-radio>
                    <el-radio :label="2">背景颜色</el-radio>
                    <el-radio :label="3">背景图片</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="背景颜色" prop="backgroundColor" v-if="dialogData.backgroundType==2">
                <el-color-picker v-model="dialogData.backgroundColor" show-alpha></el-color-picker>
            </el-form-item>
            <el-form-item label="背景图片" prop="backgroundImgUrl" v-if="dialogData.backgroundType==3">
                <uploadOneImg :fimgUrl.sync="dialogData.backgroundImgUrl" :canBeDeleted="false"></uploadOneImg>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="saveData">确 定</el-button>
    </section>
</template>
<script>
import { render_background, } from '../utils.js'
export default {
    data() {
        return {
            dialogData: {
                // 1无 2背景颜色 3背景图片
                backgroundType: 1,
                backgroundColor: "",
                backgroundImgUrl: "",
            },
            rules: {},
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
        refreshData(data) {
            this.dialogData.backgroundType = this.currentMagic.data.backgroundType;
            this.dialogData.backgroundColor = this.currentMagic.data.backgroundColor;
            this.dialogData.backgroundImgUrl = this.currentMagic.data.backgroundImgUrl;
        },
        saveData() {
            this.currentMagic.data.backgroundType = this.dialogData.backgroundType;
            this.currentMagic.data.backgroundColor = this.dialogData.backgroundColor;
            this.currentMagic.data.backgroundImgUrl = this.dialogData.backgroundImgUrl;

            render_background(this.currentMagic);
        },
    }
};
</script>