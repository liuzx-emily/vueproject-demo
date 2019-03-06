<template>
    <section class="indexPageBox">
        <section class="title">
            <section class="chs_title">
                <a :href="url" v-if="canClick">
                    {{chstitle}}
                </a>
                <a href="javascript:void(0)" v-else style="cursor:auto">
                    {{chstitle}}
                </a>
            </section>
            <section class="englisth_title">/ {{englisthtitle}}</section>
        </section>
        <section>
            <slot></slot>
        </section>
    </section>
</template>
<script>
export default {
    props: {
        chstitle: {
            type: String,
            default: ""
        },
        englisthtitle: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
    },
    computed: {
        canClick() {
            return this.url.length > 0;
        }
    },

};
</script>
<style lang="scss">
.indexPageBox {
    width: 550px;
    margin: 20px 25px;
    display: inline-block;
    vertical-align: top;
    .title {
        .chs_title {
            display: inline-block;
            a {
                font-family: '微软雅黑';
                font-size: 22px;
                color: black;
                display: inline-block;
                padding-bottom: 5px;
                border-bottom: 2px solid #439ade;
            }

        }
        .englisth_title {
            margin-left: 10px;
            display: inline-block;
            vertical-align: text-top;
            font-family: '微软雅黑';
            font-size: 12px;
            color: #858585;
        }
        margin-bottom: 15px;
    }
}
</style>