<style lang="scss" scoped>
    .pickDateRange-container {
  display: inline-block;
}
</style>
<template>
    <section class="pickDateRange-container">
        <el-date-picker v-model="startTime" type="date" value-format="timestamp" :picker-options="pickerOption_start" :style="pickerStyle"></el-date-picker>至
        <el-date-picker v-model="endTime" type="date" value-format="timestamp" :picker-options="pickerOption_end" :style="pickerStyle"></el-date-picker>
    </section>
</template>
<script>
export default {
    install(Vue) {
        Vue.component("pickDateRange", this);
    },
    props: {
        // 宽度
        width: {
            type: String,
            default: "150px"
        }
    },
    data() {
        return {
            startTime: null,
            endTime: null,
            pickerOption_start: {
                disabledDate: time => {
                    return this.endTime && time.getTime() > this.endTime;
                }
            },
            pickerOption_end: {
                disabledDate: time => {
                    return this.startTime && time.getTime() < this.startTime;
                }
            }
        };
    },
    computed: {
        pickerStyle() {
            return {
                width: this.width
            };
        }
    },
    methods: {
        // 返回时间戳。type：1起始 2终止
        get(type) {
            if (type === 1) {
                if (this.startTime) {
                    let date1 = new Date(this.startTime);
                    date1.setHours(0);
                    date1.setMinutes(0);
                    date1.setSeconds(0);
                    date1.setMilliseconds(0);
                    return date1.getTime();
                } else {
                    return null;
                }
            } else if (type === 2) {
                if (this.endTime) {
                    let date2 = new Date(this.endTime);
                    date2.setHours(23);
                    date2.setMinutes(59);
                    date2.setSeconds(59);
                    date2.setMilliseconds(999);
                    return date2.getTime();
                } else {
                    return null;
                }
            }
        }
    }
};
</script>