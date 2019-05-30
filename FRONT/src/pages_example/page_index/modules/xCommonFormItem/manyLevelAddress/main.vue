<style scoped>
</style>
<template>
    <section style="">
        <el-select v-model="levelOne" :style="pickerStyle" v-loading="levelOne_loading">
            <el-option v-for="item in levelOne_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-select v-model="levelTwo" :style="pickerStyle" v-loading="levelTwo_loading">
            <el-option v-for="item in levelTwo_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-select v-model="levelThree" :style="pickerStyle" v-loading="levelThree_loading">
            <el-option v-for="item in levelThree_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
    </section>
</template>
<script>
export default {
    install(Vue) {
        Vue.component("manyLevelAddress", this);
    },
    props: {
        flevelOne: String,
        flevelTwo: String,
        flevelThree: String,
        // 是否添加 "请选择"这一空项
        hasNullOption: {
            type: Boolean,
            default: true
        },
        // 宽度
        width: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            levelOne_list: [],
            levelTwo_list: [],
            levelThree_list: [],
            levelOne: "",
            levelTwo: "",
            levelThree: "",
            levelOne_loading: false,
            levelTwo_loading: false,
            levelThree_loading: false,
        }
    },
    computed: {
        pickerStyle() {
            let style = {};
            if (this.width) {
                style.width = this.width;
            }
            return style;
        }
    },
    watch: {
        flevelOne: {
            immediate: true,
            handler() {
                this.levelOne = this.flevelOne;
            },
        },
        flevelTwo: {
            immediate: true,
            handler() {
                this.levelTwo = this.flevelTwo;
            },
        },
        flevelThree: {
            immediate: true,
            handler() {
                this.levelThree = this.flevelThree;
            },
        },
        levelOne() {
            this.refresh_levelTwo();
            this.$emit("update:flevelOne", this.levelOne);
        },
        levelTwo() {
            this.refresh_levelThree();
            this.$emit("update:flevelTwo", this.levelTwo);
        },
        levelThree() {
            this.$emit("update:flevelThree", this.levelThree);
        }
    },
    created() {
        this.get_levelOne_list();
        this.refresh_levelTwo();
        this.refresh_levelThree();
    },
    methods: {
        get_levelOne_list() {
            this.levelOne_loading = true;
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/district/getLevelOneList.do',
            }).then((response) => {
                const res = response.data;
                this.levelOne_list = this.processResponse(res);
                this.levelOne_loading = false;
            }).catch(error => {});
        },
        refresh_levelTwo() {
            this.levelTwo_list = [];
            if (this.levelOne) {
                this.levelTwo_loading = true;
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + '/district/getByParentCode.do',
                    params: { parentCode: this.levelOne }
                }).then((response) => {
                    const res = response.data;
                    this.levelTwo_list = this.processResponse(res);
                    // 如果levelTwo不在levelTwo_list中，就清掉levelTwo和levelThree
                    if (this._.indexOf(this._.map(this.levelTwo_list, "value"), this.levelTwo) == -1) {
                        this.levelTwo = undefined;
                        this.levelThree = undefined;
                    }
                    this.levelTwo_loading = false;
                }).catch(error => {});
            }
        },
        refresh_levelThree() {
            this.levelThree_list = [];
            if (this.levelTwo) {
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + '/district/getByParentCode.do',
                    params: { parentCode: this.levelTwo }
                }).then((response) => {
                    const res = response.data;
                    this.levelThree_list = this.processResponse(res);
                    // 如果levelThree不在levelThree_list中，就清掉levelThree
                    if (this._.indexOf(this._.map(this.levelThree_list, "value"), this.levelThree) == -1) {
                        this.levelThree = undefined;
                    }
                }).catch(error => {});
            }
        },
        // -------------------- 工具方法 --------------------
        processResponse(res) {
            let arr = this._.map(res.data, (item) => {
                return {
                    label: item.name,
                    value: item.code,
                };
            });
            if (arr.length > 0 && this.hasNullOption) {
                arr.unshift({ value: "", label: "请选择" });
            }
            return arr;
        },
    }
};
</script>