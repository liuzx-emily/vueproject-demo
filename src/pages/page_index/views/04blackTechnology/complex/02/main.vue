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
// import img from '../../../../../images/bg.jpg'
import img from '~/images/bg.jpg'
export default {
    data() {
        return {
            imgUrl: img
        }
    }
};
</script>