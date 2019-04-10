<style lang="scss" scoped>
@mixin cssmade-shape($width:10px, $color:white, $direction:bottom) {
    width: 0;
    height: 0;
    border: $width solid transparent;
    border-#{$direction}: $width solid $color;
}
ul.demo1 {
    li {
        display: inline-block;
        width: 200px;
        text-align: center;
        background: #cab;
        margin: 0 5px;
        padding: 10px 0;
        position: relative;
        .shape-box {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center
        }
        .shape {
            @include cssmade-shape(10px);
            display: none;
        }
    }
    li:hover {
        .shape {
            display: inline-block;
            vertical-align: top;
        }
    }
}
ul.demo2 {
    margin-top: 10px;
    li {
        display: block;
        width: 200px;
        text-align: center;
        background: #bac;
        margin: 0 15px;
        padding: 15px 0;
        position: relative;
        .shape-box {
            position: absolute;
            top: 15px;
            left: 0;
            width: 100%;
            text-align: left
        }
        .shape {
            @include cssmade-shape(10px, white, left);
            display: none;
        }
    }
    li:hover {
        .shape {
            display: inline-block;
            vertical-align: top;
        }
    }
}
</style>
<template>
    <section>
        <el-card>
            <div slot="header" class="clearfix">
                <span>说明</span>
            </div>
            <div>
                <p>1 使用scss的 <code>@mixin</code> </p>
            </div>
        </el-card>
        <ul class="demo1">
            <li v-for="item in 4">块-{{item}}
                <div class="shape-box">
                    <span class="shape"></span>
                </div>
            </li>
        </ul>
        <ul class="demo2">
            <li v-for="item in 4">块-{{item}}
                <div class="shape-box">
                    <span class="shape"></span>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    props: [],
    data() {
        return {};
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
};
</script>