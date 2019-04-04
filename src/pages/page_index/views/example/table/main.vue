<template>
    <section>
        <el-radio-group v-model="type">
            <el-radio :label="1">用法</el-radio>
            <el-radio :label="2">样式</el-radio>
        </el-radio-group>
        <tableUsage v-if="type===1"/>
        <tableStyle v-if="type===2"/>
    </section>
</template>
<script>
import tableUsage from './table-usage.vue'
import tableStyle from './table-style.vue'
export default {
    components: {
        tableUsage,tableStyle,
    },
    data() {
        return {
            // 1用法 2样式
            type: 1,
        };
    }
};
</script>