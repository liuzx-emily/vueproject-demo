<style scoped>
img {
    width: 500px;
}
</style>
<template>
    <section>
        <img :src="imgUrl">
    </section>
</template>
<script>
import img from '~/images/bg.jpg'
export default {
    data() {
        return {
            // imgUrl: img,
            // imgUrl:require("~/images/bg.jpg"),
            // imgUrl:"http://upload.jianshu.io/users/upload_avatars/11323154/7e0ec3ec-0725-4672-907b-a6b9a4a72ee7.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96"
        }
    },
    created() {
        // this.imgUrl = "http://upload.jianshu.io/users/upload_avatars/11323154/7e0ec3ec-0725-4672-907b-a6b9a4a72ee7.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96"
        // this.imgUrl="../../images/bg.jpg"
    }
};
</script>