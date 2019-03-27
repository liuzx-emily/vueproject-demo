<style lang="scss" scoped>
.container {
    position: relative;
    width: 800px;
    margin: 0 auto;
    height: 230px;
    outline: 1px solid black;
}
.swiper-container {
    height: 100%;
}
.box {
    margin-top: 15px;
    box-sizing: border-box;
    height: 200px;
    padding: 15px;
    border: 1px solid #eee;
    background: #acb;
    color: white;
    position: relative;
    .box-title {
        color: #098;
        font-size: 16px;
        line-height: 1.8;
    }
    .box-publisher {
        color: #fff;
        font-size: 14px;
        position: absolute;
        bottom: 50px;
    }
    .box-time {
        color: #fff;
        font-size: 14px;
        position: absolute;
        bottom: 20px;
    }
}
</style>
<template>
    <section>
      <a href="https://www.swiper.com.cn/api/index.html">中文API</a>
        <section class="container">
            <swiper :options="swiperOption">
                <swiper-slide v-for="slide in swiperSlides">
                    <section class="box">
                        <section class="box-title">{{slide.title}}</section>
                        <section class="box-publisher">作者：{{slide.publisher}}</section>
                        <section class="box-time">时间：{{xTools.formatDate(slide.time)}}</section>
                    </section>
                </swiper-slide>
                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </section>
    </section>
</template>
<script>
export default {
    name: 'carrousel',
    data() {
        return {
            swiperOption: {
                // ----------------
                // 切换速度 ms
                speed: 1500,
                // 每张之间的间隔距离 px
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                },
                // 一次看几张（设置了之后，会根据容器宽度、间隔来自动计算每张的宽度，很方便！）
                slidesPerView: 4,

            },
            swiperSlides: [],
        }
    },
    mounted() {
        setInterval(() => {
            this.swiperSlides = [
                { "title": "海军芜湖舰参加突尼斯海军成立60周年国际舰队检阅活动", "publisher": "小明", "time": "1549987200000", },
                { "title": "守好祖国疆域一草一木（强军思想引领新征程）", "publisher": "陈余治", "time": "1549555200000", },
                { "title": "加拿大司法部就孟晚舟案签发授权 华为：对此感到失望", publisher: "快科技", time: "1551628800000", },
                { "title": "标题1", publisher: "快科技1", time: "1551628800000", },
                { "title": "标题2 华为：对此感到失望", publisher: "快科技2", time: "1551628800000", },
                { "title": "标题3 华为：对此感到失望", publisher: "快科技3", time: "1551628800000", },
            ];
        }, 1000)
    }
}
</script>