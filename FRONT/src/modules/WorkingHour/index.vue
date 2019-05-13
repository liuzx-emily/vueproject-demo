<style scoped>
.WorkingHour_inputBox {
    font-size: 12px;
}
.WorkingHour_inputBox .el-input-number, .WorkingHour_inputBox .el-input {
    width: 62px !important;
}
</style>
<template>
    <section>
        <div class="input_group input_group_2">
            <span class="input_group_text">
                周一至周五每天工作时间：
            </span>
            <section class="input_group_rightcontent">
                <section class="WorkingHour_inputBox">
                    <el-input-number v-model="workingStartTime1_hour" :min="0" :max="23" :precision="0" :controls="false"></el-input-number>：
                    <el-input v-model="workingStartTime1_minute"></el-input>
                    <!-- <el-input-number v-model="workingStartTime1_minute" :min="0" :max="59" :precision="0" :controls="false"></el-input-number> -->
                    到
                    <el-input-number v-model="workingEndTime1_hour" :min="0" :max="23" :precision="0" :controls="false"></el-input-number>：
                    <!-- <el-input-number v-model="workingEndTime1_minute" :min="0" :max="59" :precision="0" :controls="false"></el-input-number> -->
                    <el-input v-model="workingEndTime1_minute"></el-input>
                </section>
            </section>
        </div>
        <div class="input_group input_group_2">
            <span class="input_group_text">
                周六周日每天工作时间：
            </span>
            <section class="input_group_rightcontent">
                <section class="WorkingHour_inputBox">
                    <el-input-number v-model="workingStartTime2_hour" :min="0" :max="23" :precision="0" :controls="false"></el-input-number>：
                    <!-- <el-input-number v-model="workingStartTime2_minute" :min="0" :max="59" :precision="0" :controls="false"></el-input-number>  -->
                    <el-input v-model="workingStartTime2_minute"></el-input>
                    到
                    <el-input-number v-model="workingEndTime2_hour" :min="0" :max="23" :precision="0" :controls="false"></el-input-number>：
                    <!-- <el-input-number v-model="workingEndTime2_minute" :min="0" :max="59" :precision="0" :controls="false"></el-input-number> -->
                    <el-input v-model="workingEndTime2_minute"></el-input>
                </section>
            </section>
        </div>
        <div class="input_group input_group_2">
            <span class="input_group_text">
                每周浮动时间(h)：
            </span>
            <section class="input_group_rightcontent">
                <el-input-number v-model="cuttingHour" :precision="1" controls-position="right"></el-input-number>
            </section>
        </div>
        <div class="input_group input_group_2">
            <span class="input_group_text">
                年使用时间(h)：
            </span>
            <section class="input_group_rightcontent">
                <el-input v-model="totalTime" disabled></el-input>
            </section>
        </div>
    </section>
</template>
<script>
export default {
    props: ["weekdayStartTime", "weekdayEndTime", "weekendStartTime", "weekendEndTime", "haircut"],
    data() {
        return {
            workingStartTime1_hour: undefined,
            workingStartTime1_minute: undefined,
            workingEndTime1_hour: undefined,
            workingEndTime1_minute: undefined,
            workingStartTime2_hour: undefined,
            workingStartTime2_minute: undefined,
            workingEndTime2_hour: undefined,
            workingEndTime2_minute: undefined,
            cuttingHour: 0,
        }
    },
    watch: {
        // 父级传来的五个值
        weekdayStartTime() {
            this.refresh_weekdayStartTime();
        },
        weekdayEndTime() {
            this.refresh_weekdayEndTime();
        },
        weekendStartTime() {
            this.refresh_weekendStartTime();
        },
        weekendEndTime() {
            this.refresh_weekendEndTime();
        },
        haircut() {
            this.cuttingHour = this.haircut;
        },
    },
    computed: {
        totalTime() {
            var flag_workday;
            var flag_weekend;
            var sum = 0;
            // --------------- 周一至周五 ---------------
            var start1_hour = this.workingStartTime1_hour;
            var start1_minute = this.workingStartTime1_minute;
            var end1_hour = this.workingEndTime1_hour;
            var end1_minute = this.workingEndTime1_minute;
            if (this.check_not_null_undefined_0lengthstring(start1_hour) && this.check_not_null_undefined_0lengthstring(end1_hour) && this.check_not_null_undefined_0lengthstring(start1_minute) && this.check_not_null_undefined_0lengthstring(end1_minute)) {
                // 四个值都填了
                flag_workday = true;
                var total = end1_hour - start1_hour - start1_minute / 60 + end1_minute / 60;
                if (total < 0) {
                    total += 24;
                }
                sum = total * 5;
            } else if (this.check_is_null_undefined__0lengthstring(start1_hour) && this.check_is_null_undefined__0lengthstring(end1_hour) && this.check_is_null_undefined__0lengthstring(start1_minute) && this.check_is_null_undefined__0lengthstring(end1_minute)) {
                // 四个值都没填
                flag_workday = true;
            } else {
                // 有的填了，有的没填，不作数
                flag_workday = false;
            }

            // --------------- 周六至周日 ---------------
            var start2_hour = this.workingStartTime2_hour;
            var start2_minute = this.workingStartTime2_minute;
            var end2_hour = this.workingEndTime2_hour;
            var end2_minute = this.workingEndTime2_minute;

            if (this.check_not_null_undefined_0lengthstring(start2_hour) && this.check_not_null_undefined_0lengthstring(end2_hour) && this.check_not_null_undefined_0lengthstring(start2_minute) && this.check_not_null_undefined_0lengthstring(end2_minute)) {
                // 四个值都填了
                flag_weekend = true;
                var total = end2_hour - start2_hour - start2_minute / 60 + end2_minute / 60;
                if (total < 0) {
                    total += 24;
                }
                sum = sum + (total) * 2;
            } else if (this.check_is_null_undefined__0lengthstring(start2_hour) && this.check_is_null_undefined__0lengthstring(end2_hour) && this.check_is_null_undefined__0lengthstring(start2_minute) && this.check_is_null_undefined__0lengthstring(end2_minute)) {
                // 四个值都没填
                flag_weekend = true;
            } else {
                flag_weekend = false;
            }
            // --------------- 浮动时间 ---------------
            var cuttingHour = this.cuttingHour;
            if (!cuttingHour) {
                // 没填
                sum = sum;
            } else {
                // 填了
                sum += cuttingHour;
            }
            // --------------- 最后判断 ---------------
            if (flag_workday && flag_weekend && sum >= 0) {
                return (sum * 52).toFixed(2);
            } else {
                return undefined;
            }
        }
    },
    mounted() {
        this.refresh_weekdayStartTime();
        this.refresh_weekdayEndTime();
        this.refresh_weekendStartTime();
        this.refresh_weekendEndTime();
        this.cuttingHour = this.haircut;
    },
    methods: {
        check_not_null_undefined_0lengthstring(value) {
            if (value === null || value === undefined || value === "") {
                return false;
            } else {
                return true;
            }
        },
        check_is_null_undefined__0lengthstring(value) {
            if (value === null || value === undefined || value === "") {
                return true;
            } else {
                return false;
            }
        },
        do_join(hour, minute) {
            let res = "";
            // 为什么不直接写 if(!null)？因为 hour===0时也会进if
            if (hour === null || hour === undefined) {

            } else {
                res += hour;
            }
            res += ":";
            if (minute === null || minute === undefined) {

            } else {
                res += minute;
            }
            return res;
        },
        do_split(time, type) {
            if (time) {
                let value = time.split(":")[type];
                if (!value) {
                    return undefined;
                } else if (value == "undefined") {
                    return undefined;
                } else {
                    return value;
                }
            } else {
                return undefined;
            }
        },
        refresh_weekdayStartTime() {
            this.workingStartTime1_hour = this.do_split(this.weekdayStartTime, 0);
            this.workingStartTime1_minute = this.do_split(this.weekdayStartTime, 1);
        },
        refresh_weekdayEndTime() {
            this.workingEndTime1_hour = this.do_split(this.weekdayEndTime, 0);
            this.workingEndTime1_minute = this.do_split(this.weekdayEndTime, 1);
        },
        refresh_weekendStartTime() {
            this.workingStartTime2_hour = this.do_split(this.weekendStartTime, 0);
            this.workingStartTime2_minute = this.do_split(this.weekendStartTime, 1);
        },
        refresh_weekendEndTime() {
            this.workingEndTime2_hour = this.do_split(this.weekendEndTime, 0);
            this.workingEndTime2_minute = this.do_split(this.weekendEndTime, 1);
        },
        do_check(value, weekday_or_weekend, start_or_end) {
            let flag;
            if (value === undefined || value === null || value.length == 0) {
                // 没填，ok
                flag = true;
            } else if (/^[0-5][0-9]$/.test(value)) {
                // 填了，是 00-59
                flag = true;
            } else {
                // 填了，填的不对
                this.$message({
                    message: ` ${weekday_or_weekend==1?"周一至周五":"周六周日"}每天工作时间- ${start_or_end==1?"起始":"结束"}分钟输入错误（必须为00-59）`,
                    type: 'warning',
                    duration: 0,
                    showClose: true,
                });
                flag = false;
            }
            return flag;
        },
        checkValidation() {
            // 分钟数允许输入和保存 00、05这样的数据，但是 el-input-number会把这样的数据格式化为0、5，所以不能用 el-input-number，只能用 el-input。
            // 所以分钟数需要额外校验
            return this.do_check(this.workingStartTime1_minute, 1, 1) &&
                this.do_check(this.workingEndTime1_minute, 1, 2) &&
                this.do_check(this.workingStartTime2_minute, 2, 1) &&
                this.do_check(this.workingStartTime2_minute, 2, 2);
        },
        getResult() {
            return {
                "weekdayStartTime": this.do_join(this.workingStartTime1_hour, this.workingStartTime1_minute),
                "weekdayEndTime": this.do_join(this.workingEndTime1_hour, this.workingEndTime1_minute),
                "weekendStartTime": this.do_join(this.workingStartTime2_hour, this.workingStartTime2_minute),
                "weekendEndTime": this.do_join(this.workingEndTime2_hour, this.workingStartTime2_minute),
                "haircut": this.cuttingHour,
                "yearUseTime": this.totalTime
            }
        }
    }
};
</script>