<style scoped></style>
<template>
    <section>
        <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="timeline" name="chart1">
                <bugTimeline ref="chart1" />
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import bugTimeline from './01timeline.vue'
export default {
    props: {},
    components: { bugTimeline },
    data() {
        return {
            activeTab: "chart1"
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.$refs[this.activeTab].getData();},
    methods: {
        tabClick(tab) {
            let name = tab.name;
            let ref = this.$refs[name];
            this.$nextTick(() => {
                ref.getData();
            })
        }
    }
};
</script>