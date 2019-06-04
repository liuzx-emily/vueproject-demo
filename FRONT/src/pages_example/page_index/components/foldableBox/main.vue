<style scoped>
h2.boxTitle {
    font-size: 22px;
    font-weight: bold;
    color: rgb(91, 118, 180);
    border-bottom: 2px solid rgb(91, 118, 180);
    /* padding-bottom: 10px; */
    /* padding-left: 10px; */
    padding: 10px;
    padding-top: 20px;
}

.toggleBox {
    position: absolute;
    top: 26px;
    right: 0;
    font-size: 13px;
    cursor: pointer;
    border: 1px solid #b3bfdb;
    /* box-shadow: #81D4FA 1px 1px 4px; */
    border-radius: 2px;
    padding: 2px 10px;
    color: #5b76b4;
}
.toggleBox>i {
    margin-right: 5px
}
</style>
<template>
    <section>
        <div style="position:relative">
            <h2 class="boxTitle">{{title}}</h2>
            <!-- 不能用 el-button 的原因：在表单页面，会被外面的 el-form 的 disabled 属性控制！ -->
            <div class="toggleBox" @click="show=!show">
                <template v-if="show">
                    <i class="fa fa-angle-double-up"></i>
                    <span>折叠</span>
                </template>
                <template v-else>
                    <i class="fa fa-angle-double-down"></i>
                    <span>展开</span>
                </template>
            </div>
        </div>
        <div class="projectinfo_box_contentbox" v-show="show">
            <slot></slot>
        </div>
    </section>
</template>
<script>
export default {
    install(Vue) {
        Vue.component("foldableBox", this);
    },
    props: {
        title: String
    },
    data() {
        return {
            show: true,
        }
    }
};
</script>