<template>
    <section>
        <el-radio-group v-model="mode">
            <el-radio :label="1">instuctions</el-radio>
            <el-radio :label="2">basic</el-radio>
            <el-radio :label="3">advanced</el-radio>
        </el-radio-group>
        <section style="padding:10px 0;">
            <instructions v-if="mode==1" />
            <chartBasic v-if="mode==2" />
            <chartAdvanced v-if="mode==3" />
        </section>
    </section>
</template>
<script>
import instructions from './instructions/main.vue'
import chartBasic from './basic/main.vue'
import chartAdvanced from './advanced/main.vue'
export default {
    components: { instructions, chartBasic, chartAdvanced, },
    data() {
        return {
            // 1说明 2basic 3advanced
            mode: 1,
        }
    },
    mounted() {},
    methods: {}
};
</script>