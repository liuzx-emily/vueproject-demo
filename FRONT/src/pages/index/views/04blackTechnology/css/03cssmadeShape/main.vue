<style scoped></style>
<template>
    <section>
        <el-radio-group v-model="mode">
            <el-radio :label="1">三角形</el-radio>
            <el-radio :label="2">花色边框</el-radio>
        </el-radio-group>
        <section style="padding:10px 0;">
            <subpage1 v-if="mode==1" />
            <subpage2 v-if="mode==2" />
        </section>
    </section>
</template>
<script>
import subpage1 from './01triangle.vue'
import subpage2 from './02.vue'
export default {
    props: {},
    components: { subpage1,subpage2 },
    data() {
        return {
            mode: 2,
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
};
</script>