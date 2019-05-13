<style scoped>
</style>
<template>
    <section style="">
        <el-select v-model="levelOne" style="width:200px;">
            <el-option v-for="item in levelOne_list" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
        <el-select v-model="levelTwo" style="width:200px;">
            <el-option v-for="item in levelTwo_list" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
        <el-input v-model="levelThree" style="width:400px;"></el-input>
    </section>
</template>
<script>
import _ from 'lodash'
export default {
    props: {
        flevelOne: String,
        flevelTwo: String,
        flevelThree: String,
    },
    data() {
        return {
            levelOne_list: [],
            levelTwo_list: [],
            levelOne: this.flevelOne,
            levelTwo: this.flevelTwo,
            levelThree: this.flevelThree,
        }
    },
    watch: {
        flevelOne() {
            this.levelOne = this.flevelOne;
        },
        flevelTwo() {
            this.levelTwo = this.flevelTwo;
        },
        flevelThree() {
            this.levelThree = this.flevelThree;
        },
        levelOne() {
            this.refresh_leveltwo();
            this.$emit("update:flevelOne", this.levelOne);
        },
        levelTwo() {
            this.$emit("update:flevelTwo", this.levelTwo);
        },
        levelThree() {
            this.$emit("update:flevelThree", this.levelThree);
        }
    },
    created() {
        this.get_levelOne_list();
        this.refresh_leveltwo();
    },
    methods: {
        get_levelOne_list() {
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/divisions/listplus.htmls',
                params: {}
            }).then((response) => {
                const res = response.data;
                // let arr = _.cloneDeep(res.data);
                let arr = _.map(res.data, (item) => {
                    return {
                        text: item.name,
                        value: item.name,
                    };
                });
                arr.unshift({ value: "", text: "请选择" });
                this.levelOne_list = arr;
            }).catch(error => {});
        },
        refresh_leveltwo() {
            if (this.levelOne) {
                this.xAxios({
                    method: 'get',
                    url: BASE_PATH + '/divisions/list.htmls',
                    params: { areaName: this.levelOne }
                }).then((response) => {
                    const res = response.data;
                    let arr = _.map(res, (item) => {
                        return {
                            text: item.cityName,
                            value: item.cityName,
                        };
                    });
                    arr.unshift({ value: "", text: "请选择" });
                    this.levelTwo_list = arr;
                    // 如果levelTwo不在levelTwo_list中，就清掉
                    if (_.indexOf(_.map(res, "cityName"), this.levelTwo) == -1) {
                        this.levelTwo = "";
                    }
                }).catch(error => {});
            }
        }
    }
};
</script>