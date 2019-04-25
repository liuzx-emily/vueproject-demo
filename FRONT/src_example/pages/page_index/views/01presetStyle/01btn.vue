<style scoped="" lang="scss">
    .box{
        margin:10px 0;
        .box-title{
            display:inline-block;
            margin-right:10px;
            width:130px;
            text-align:right;
        }
    }
</style>
<template>
    <section>
        <el-card>
            <div slot="header">
                <span>尺寸</span>
            </div>
            <section class="box">
                <section class="box-title">
                    size-tiny
                </section>
                <el-button type="" class="size-tiny">按钮</el-button>
                <el-button type="primary" class="size-tiny">按钮</el-button>
                <el-button type="success" class="size-tiny">按钮</el-button>
                <el-button type="warning" class="size-tiny">按钮</el-button>
                <el-button type="danger" class="size-tiny">按钮</el-button>
            </section>
            <section class="box">
                <section class="box-title">
                    size-small
                </section>
                <el-button type="" class="size-small">按钮</el-button>
                <el-button type="primary" class="size-small">按钮</el-button>
                <el-button type="success" class="size-small">按钮</el-button>
                <el-button type="warning" class="size-small">按钮</el-button>
                <el-button type="danger" class="size-small">按钮</el-button>
            </section>
            <section class="box">
                <section class="box-title">
                    size-common
                </section>
                <el-button type="" class="size-common">按钮</el-button>
                <el-button type="primary" class="size-common">按钮</el-button>
                <el-button type="success" class="size-common">按钮</el-button>
                <el-button type="warning" class="size-common">按钮</el-button>
                <el-button type="danger" class="size-common">按钮</el-button>
            </section>
            <section class="box">
                <section class="box-title">
                    size-big
                </section>
                <el-button type="" class="size-big">按钮</el-button>
                <el-button type="primary" class="size-big">按钮</el-button>
                <el-button type="success" class="size-big">按钮</el-button>
                <el-button type="warning" class="size-big">按钮</el-button>
                <el-button type="danger" class="size-big">按钮</el-button>
            </section>
        </el-card>
    </section>
</template>
<script>
export default {
    components:{},
    data() {
        return {

        }
    }
};
</script>