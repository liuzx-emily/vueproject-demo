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
        <section>
            <el-card>
                <div slot="header">
                    <span>尺寸</span>
                </div>
                <!-- card body -->
                <section class="box">
                    <section class="box-title">
                        size-tiny
                    </section>
                    <el-button type="" class="size-tiny">tiny按钮</el-button>
                    <el-button type="primary" class="size-tiny">tiny按钮</el-button>
                    <el-button type="success" class="size-tiny">tiny按钮</el-button>
                    <el-button type="warning" class="size-tiny">tiny按钮</el-button>
                    <el-button type="danger" class="size-tiny">tiny按钮</el-button>
                </section>
                <section class="box">
                    <section class="box-title">
                        size-small
                    </section>
                    <el-button type="" class="size-small">small按钮</el-button>
                    <el-button type="primary" class="size-small">small按钮</el-button>
                    <el-button type="success" class="size-small">small按钮</el-button>
                    <el-button type="warning" class="size-small">small按钮</el-button>
                    <el-button type="danger" class="size-small">small按钮</el-button>
                </section>
                <section class="box">
                    <section class="box-title">
                        size-common
                    </section>
                    <el-button type="" class="size-common">common按钮</el-button>
                    <el-button type="primary" class="size-common">common按钮</el-button>
                    <el-button type="success" class="size-common">common按钮</el-button>
                    <el-button type="warning" class="size-common">common按钮</el-button>
                    <el-button type="danger" class="size-common">common按钮</el-button>
                </section>
                <section class="box">
                    <section class="box-title">
                        size-big
                    </section>
                    <el-button type="" class="size-big">big按钮</el-button>
                    <el-button type="primary" class="size-big">big按钮</el-button>
                    <el-button type="success" class="size-big">big按钮</el-button>
                    <el-button type="warning" class="size-big">big按钮</el-button>
                    <el-button type="danger" class="size-big">big按钮</el-button>
                </section>
            </el-card>
        </section>
    </section>
</template>
<script>
export default {
    data() {
        return {
        }
    }
};
</script>