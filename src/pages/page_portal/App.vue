<template>
    <div id="app">
        <section id="page_header">
            <section class="page_header_text_wrap">
                <section class="w1200">
                    <header id="page_title">
                        <section id="chs_title">门户</section>
                        <section id="englisth_title">PORTAL</section>
                    </header>
                    <nav id="page_nav">
                        <router-link v-for="(item,index) in navList" :key="item.path" :to="item.path">{{item.name}} </router-link>
                    </nav>
                </section>
            </section>
            <!-- banner图。因为图片内容要一直居中，所以用background，不直接用img -->
            <section id="page_banner"></section>
        </section>
        <section id="page_maincontent">
            <router-view class="w1200"></router-view>
        </section>
        <section id="page_footer">技术支持：RABBIT</section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            navList: []
        };
    },
    created() {
        this.getNav();
    },
    methods: {
        getNav() {
            this.loading = true;
            this.xAxios({
                xDonotNeedLoginCheck: true,
                method: 'get',
                url: BASE_PATH + '/portal/nav.htmls',
            }).then((response) => {
                const res = response.data;
                if (res.code == 1) {
                    let nav = this._.cloneDeep(res.data);
                    nav.unshift({
                        "name": "首页",
                        "path": "/index"
                    });
                    this.navList = nav;
                }
                this.loading = false;
            }).catch(error => {});
        }
    }

};
</script>