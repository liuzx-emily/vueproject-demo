<template>
    <section>
        <MeterNumber :val.sync="val1" />
        <MeterNumber :val.sync="val2" :readonly="true" />
    </section>
</template>
<script>
import MeterNumber from '~/modules/MeterNumber/index.vue';
export default {
    components: { MeterNumber },
    data() {
        return {
            val1: "",
            val2: "",
        };
    },
    mounted() {
        setTimeout(() => {
            this.val1 = "哈哈,嘿嘿";
            this.val2 = "苹果,香蕉,梨";
        }, 1500);
    }
};
</script>