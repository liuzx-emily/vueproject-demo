<template>
    <section class="bigForm">
        <WorkingHour :weekdayStartTime="weekdayStartTime" :weekdayEndTime="weekdayEndTime" :weekendStartTime="weekendStartTime" :weekendEndTime="weekendEndTime" :haircut="haircut" ref="WorkingHour" />
        <el-button @click="do_print">打印结果</el-button>
    </section>
</template>
<script>
import WorkingHour from '~/modules/WorkingHour/index.vue';
export default {
    components: { WorkingHour },
    data() {
        return {
            weekdayStartTime: "8:00",
            weekdayEndTime: "15:30",
            weekendStartTime: "9:30",
            weekendEndTime: "10:30",
            haircut: -5
        };
    },
    mounted() {
        setTimeout(() => {
            this.haircut = 0;
        }, 1500);
    },
    methods: {
        do_print() {
            // 先验证合法性，再取值
            if (this.$refs.WorkingHour.checkValidation()) {
                let res = this.$refs.WorkingHour.getResult();
                console.log(res);
            } else {
                console.log("校验失败");
            }
        }
    }
};
</script>