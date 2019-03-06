<template>
    <section>
        <ThreeLevelAddress :flevelOne.sync="a_levelOne" :flevelTwo.sync="a_levelTwo" :flevelThree.sync="a_levelThree" />
        <ThreeLevelAddress :flevelOne.sync="b_levelOne" :flevelTwo.sync="b_levelTwo" :flevelThree.sync="b_levelThree" />
        <ThreeLevelAddress :flevelOne.sync="c_levelOne" :flevelTwo.sync="c_levelTwo" :flevelThree.sync="c_levelThree" />
    </section>
</template>
<script>
import ThreeLevelAddress from '~/modules/ThreeLevelAddress/index.vue';
export default {
    components: { ThreeLevelAddress },
    data() {
        return {
            a_levelOne: "",
            a_levelTwo: "",
            a_levelThree: "",
            b_levelOne: "",
            b_levelTwo: "",
            b_levelThree: "",
            c_levelOne: "河东区",
            c_levelTwo: "上杭路街道",
            c_levelThree: "小胡同",
        };
    },
    mounted() {
        setTimeout(() => {
            this.a_levelOne = "南开区";
            this.a_levelTwo = "水上公园街道";
            this.a_levelThree = "第三公寓";
            this.b_levelOne = "东丽区";
            this.b_levelTwo = "军粮城街道";
            this.b_levelThree = "马路边";
        }, 1500);
    }
};
</script>