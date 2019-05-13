<template>
    <el-date-picker v-model="year" type="year" :picker-options="yearPickerOption" :style="pickerStyle"></el-date-picker>
</template>
<script>
export default {
    install(Vue) {
        Vue.component("pickYear", this);
    },
    props: {
        // 初始值
        value: {
            default: null
        },
        // 宽度
        width: {
            type: String,
            default: "200px"
        },
        // 参数：默认选中当前年份？
        defaultPickCurrentYear: {
            type: Boolean,
            default: true
        },
        // 参数：不能选择未来的年份？
        cannotBeFuture: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        value() {
            this.set(this.value);
        }
    },
    data() {
        let yearPickerOption = {};
        // 不能是未来！
        if (this.cannotBeFuture) {
            yearPickerOption = {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            };
        }
        return {
            year: null,
            yearPickerOption: yearPickerOption
        };
    },
    mounted() {
        if (this.value) {
            this.set(this.value);
        } else {
            if (this.defaultPickCurrentYear) {
                this.year = new Date();
            }
        }
    },
    computed: {
        pickerStyle() {
            return {
                width: this.width
            };
        }
    },
    methods: {
        // 传入字符串：""或者"2019"
        set(value) {
            if (value) {
                let date = new Date();
                date.setFullYear(value);
                this.year = date;
            } else {
                this.year = null;
            }
        },
        // 返回字符串：""或者"2019"
        get() {
            if (this.year) {
                return this.year.getFullYear();
            } else {
                return "";
            }
        }
    }
};
</script>