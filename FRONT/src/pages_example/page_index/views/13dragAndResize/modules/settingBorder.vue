<style scoped></style>
<template>
    <section>
        <el-form ref="form" label-width="70px" :model="dialogData" :rules="rules">
            <el-form-item label="边框" prop="borderStyle">
                <el-radio-group v-model="dialogData.borderStyle" style="width:100%">
                    <el-radio label="1">无</el-radio>
                    <el-radio label="solid">实线</el-radio>
                    <el-radio label="dashed">虚线</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="圆角" prop="borderStyle">
                <el-input-number v-model="dialogData.borderRadius" :min="0" :precision="0"></el-input-number>
            </el-form-item>
            <template v-if="dialogData.borderStyle!=1">
                <el-form-item label="颜色" prop="borderColor">
                    <el-color-picker v-model="dialogData.borderColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="宽度" prop="borderWidth">
                    <el-input-number v-model="dialogData.borderWidth" :min="0" :precision="0"></el-input-number>
                </el-form-item>
            </template>
        </el-form>
        <el-button @click="saveData">保存</el-button>
    </section>
</template>
<script>
import { render_border, } from '../utils.js'
export default {
    data() {
        return {
            dialogData: {
                borderRadius: 5,
                // 1无 solid dashed
                borderStyle: "solid",
                borderColor: "#eee",
                borderWidth: 10,
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
        refreshData() {
            this.dialogData.borderRadius = this.currentMagic.data.borderRadius || 5;
            this.dialogData.borderStyle = this.currentMagic.data.borderStyle || "solid";
            this.dialogData.borderColor = this.currentMagic.data.borderColor || "#eee";
            this.dialogData.borderWidth = this.currentMagic.data.borderWidth || 2;
        },
        saveData() {
            this.currentMagic.data.borderRadius = this.dialogData.borderRadius;
            this.currentMagic.data.borderStyle = this.dialogData.borderStyle;
            this.currentMagic.data.borderColor = this.dialogData.borderColor;
            this.currentMagic.data.borderWidth = this.dialogData.borderWidth;

            render_border(this.currentMagic);
        },
    }
};
</script>