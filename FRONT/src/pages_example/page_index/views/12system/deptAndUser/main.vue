<style scoped>
.deptAndUser_container{
    height: 100%;
}
.deptAndUser_left, .deptAndUser_right {
    display: inline-block;
    height: 100%;
    vertical-align: top;
    background: white;
    box-sizing: border-box;
    overflow: auto;
}
.deptAndUser_left {
    width: 250px;
    border-right: 2px solid #eee;
    margin-right: 15px;
}
.deptAndUser_right {
    width: calc(100% - 270px);
}
</style>
<template>
    <section class="deptAndUser_container">
        <section class="deptAndUser_left">
            <cDept />
        </section>
        <section class="deptAndUser_right">
            <cUser :deptId="deptId" :deptTreeData="deptTreeData" />
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
        return {
            // 右侧的用户管理用到
            deptId: "",
            deptName: "",
            deptTreeData: [],
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>