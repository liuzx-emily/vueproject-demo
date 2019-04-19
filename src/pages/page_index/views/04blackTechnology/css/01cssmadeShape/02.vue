<style scoped lang="scss">
$w:300px;
$w1:22px;
$w2:26px;
$w3:20px;
.demo1 {
    width: $w;
    height: $w;
    box-sizing: border-box;
    background: #ff7576;
    border: $w1 dashed #f9efe4;
    position: relative;
    border-radius: 5px;
}
.demo1:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f7fdff;
    border: $w2 dashed #C8E6C9;
}
.demo1:after {
    content: "";
    position: absolute;
    left: $w2;
    right: $w2;
    top: $w2;
    bottom: $w2;
    background: #76ccf3;
    border: $w3 dashed #fbf9f3;
}
.inner {
    background: lighten(#ff7576, 22);
    margin-top: #{$w2+$w3};
    margin-left: #{$w2+$w3};
    width: #{$w - ($w1 + $w2 + $w3)*2};
    height: #{$w - ($w1 + $w2 + $w3)*2};
    position: relative;
    z-index: 1;
}
.demo2 {
    width: $w;
    height: $w;
    box-sizing: border-box;
    background: #fff;
    border: $w1 dashed #333;
    position: relative;
    border-radius: 5px;
}
.demo2:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    border: $w2 dashed #333;
}
.demo2:after {
    content: "";
    position: absolute;
    left: $w2;
    right: $w2;
    top: $w2;
    bottom: $w2;
    background: #fff;
    border: $w3 dashed #333;
}
.inner {
    background: #fff;
    margin-top: #{$w2+$w3};
    margin-left: #{$w2+$w3};
    width: #{$w - ($w1 + $w2 + $w3)*2};
    height: #{$w - ($w1 + $w2 + $w3)*2};
    position: relative;
    z-index: 1;
}
</style>
<template>
    <section>
        <section class="demo1">
            <section class="inner"></section>
        </section>
        <section class="demo2" style="margin-top:20px;">
            <section class="inner"></section>
        </section>
    </section>
</template>
<script>
export default {

};
</script>