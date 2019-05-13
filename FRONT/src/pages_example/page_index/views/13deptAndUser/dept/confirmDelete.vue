<style scoped></style>
<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.1)">
    </section>
</template>
<script>
export default {
    props: {
        refreshFunc: {
            type: Function,
            default: () => {},
        },
    },
    components: {},
    data() {
        return {
            loading: false,
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        // 打开"删除"询问框，确认后删除（可以批量）
        openConfirm(ids) {
            this.$confirm('您确认要删除数据吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = {
                    id: ids
                };
                this.loading = true;
                this.xAxios({
                    method: 'post',
                    url: BASE_PATH + '/dept/delete.do',
                    data: param
                }).then((response) => {
                    const res = response.data;
                    if (res.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                        // 刷新
                        this.refreshFunc();
                    }
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                });
            }).catch(error => {});
        },
    }
};
</script>