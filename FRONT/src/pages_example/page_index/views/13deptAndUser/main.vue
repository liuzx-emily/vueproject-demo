<style scoped>
.deptAndUser_left, .deptAndUser_right {
    display: inline-block;
    height: 100%;
    vertical-align: top;
    background: white;
    box-sizing: border-box;
    overflow: auto;
}
.deptAndUser_left {
    width: 280px;
    border-right:1px solid #ddd;
    margin-right: 20px;
}
.deptAndUser_right {
    width: calc(100% - 300px);
    border-left:1px solid #ddd;
}
</style>
<template>
    <section>
        <section class="deptAndUser_left">
            <cDept />
        </section>
        <section class="deptAndUser_right">
            <cUser />
        </section>
    </section>
</template>
<script>
import cDept from './dept/main.vue'
import cUser from './user/main.vue'
export default {
    props: {},
    components: { cDept, cUser, },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        console.log(1);
    },
    methods: {}
};
</script>