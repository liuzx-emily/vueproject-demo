<template>
    <div id="app" v-loading.fullscreen.lock="!initDone" element-loading-background="rgba(0,0,0,0.2)">
        <section id="topbar">
            <!-- logo -->
            <section class="logo">一个很长很长很长很长很长的标题</section>
            <!-- 按钮放在这里，只是为了演示导出PDF的效果 -->
            <el-button type="danger" class="size-small" @click="do_exportPDF">导出PDF</el-button>
            <!-- 包在 .rightAlignContainer 中的内容会靠右对齐 -->
            <div class="rightAlignContainer">
                <!-- 导航 -->
                <nav>
                    <router-link v-for="(item) in navList" :key="item.uri" :to="item.uri">
                        <i class="fa" :class="'fa-'+item.icon"></i>
                        <span class="name">{{item.name}}</span>
                    </router-link>
                    <a href="./portal.html">
                        <i class="fa fa-umbrella"></i>
                        <span class="name">门户首页</span>
                    </a>
                </nav>
                <!-- 信箱 -->
                <section class="mailBox">
                    <router-link key="/mailbox" to="/mailbox" title="信箱">
                        <el-badge :value="$store.state.msgNum" :hidden="$store.state.msgNum==0">
                            <i class="fa fa-envelope-o"></i>
                        </el-badge>
                    </router-link>
                </section>
                <!-- 用户信息 -->
                <UserInfo />
            </div>
            <!-- 导航 -->
        </section>
        <section id="main_container" :class="{cuttedSideBar:$store.state.cuttedSideBar}" v-if="initDone">
            <template v-if="leftNavList.length>0">
                <section id="sidebar_wrap">
                    <section id="leftNav_control">
                        <section class="inner" @click="$store.state.cuttedSideBar=!$store.state.cuttedSideBar">
                            <i class="fa fa-arrow-circle-o-left" v-if="!$store.state.cuttedSideBar"></i>
                            <i class="fa fa-arrow-circle-o-right" v-else></i>
                            <span class="txt">菜单</span>
                        </section>
                    </section>
                    <xLimitlessSidebarMenu :data="leftNavList" :props="props" id="leftNav" />
                </section>
                <section id="content_wrap">
                    <router-view></router-view>
                </section>
            </template>
            <template v-else>
                <section id="content_wrap" style="margin-left:0">
                    <router-view></router-view>
                </section>
            </template>
        </section>
    </div>
</template>
<script>
// 本页
import "./styles/main.scss";
import UserInfo from "./modules/xUserInfo/index.vue";
export default {
    name: "app",
    components: { UserInfo },
    watch: {
        currentTopNavPath() {
            this.jumpToFirstNav();
        },
        leftNavList() {
            this.jumpToFirstNav();
        },
        initDone(value) {
            if (value) {
                this.$nextTick(() => {
                    this.calculateHeight();
                    // this.jumpToFirstNav();
                })
            }
        }
    },
    computed: {
        currentTopNavPath() {
            let res = /^\/[^/]{1,}/.exec(this.$route.path);
            if (res && res.length > 0) {
                return res[0];
            } else {
                return "";
            }
        },
        // 侧边导航
        leftNavList() {
            let currentTopNav_and_children = this._.filter(
                this.navList,
                item => item.uri == this.currentTopNavPath
            );
            if (currentTopNav_and_children[0] && currentTopNav_and_children[0].child && currentTopNav_and_children[0].child.length > 0) {
                return currentTopNav_and_children[0].child;
            } else {
                return [];
            }
        }
    },
    created() {
        this.getUserInfo();
    },
    data() {
        return {
            // 初始化完成了吗(所有要存在全局变量里的值都拿到了吗？)
            initDone: false,
            // 总导航
            navList: [],
            props: {
                before_idkey: "permissionId",
                before_parentkey: "parentId",
                urlKey: "uri"
            }
        };
    },
    methods: {
        // 演示导出PDF的效果
        do_exportPDF() {
            // 不能打印 #content_wrap，因为他是限高的
            let obj = document.querySelector('#content_wrap>*');;
            let fileName = "演示导出PDF效果";
            this.exportPDF(obj, fileName);
        },
        // 计算 #main_container的高度
        calculateHeight() {
            let func = () => {
                let h1 = this.xTools.getWindowSize().height;
                let h2 = document.getElementById("topbar").offsetHeight;
                let h3 = h1 - h2;
                document.getElementById("main_container").style.height = h3 + "px";
            };
            func();
            window.onresize = func;
        },
        // 如果访问本组件的根地址，自动跳转到第一个菜单
        jumpToFirstNav() {
            if (this.$route.path == this.currentTopNavPath) {
                if (
                    this.leftNavList &&
                    this.leftNavList[0] &&
                    this.leftNavList[0].uri
                ) {
                    this.$router.push(this.leftNavList[0].uri);
                }
            }
        },
        // 获取菜单数据，并且自动跳转到第一个菜单
        getUserInfo() {
            this.xAxios({
                method: "get",
                url: BASE_PATH + "/user/userStatus.htmls"
            }).then(response => {
                const res = response.data;
                if (res.code == "1") {
                    setTimeout(() => {
                        // 已登录
                        let userInfo = {
                            id: res.data.userId,
                            name: res.data.realname
                        };
                        this.$store.state.userInfo = userInfo;
                        this.initDone = true;
                        // 获取菜单数据，并且自动跳转到第一个菜单
                        this.getMenuData();
                        this.getPermissionBtnData();
                    }, 1000);
                } else {
                    // 未登录
                    window.location.href = "./portal.html";
                }
            }).catch(error => {});
        },
        // 获取菜单数据，并且自动跳转到第一个菜单
        getMenuData() {
            this.xAxios({
                method: "get",
                url: BASE_PATH + "/permission/nav.htmls",
                params: {}
            }).then(response => {
                const res = response.data;
                const navList = this.xTools.arrayToTree(res.data, {
                    before_idkey: "permissionId",
                    before_parentkey: "parentId",
                    after_childkey: "child"
                });
                // 路由跳转
                if (navList && navList.length > 0) {
                    this.navList = navList;
                    // 说明：路由不能跳转到指定路径，因为用户不一定有权限！所以需要手动跳转
                    if (this.$route.path == "/") {
                        this.$router.push(navList[0].uri);
                    }
                }
            }).catch(error => {});
        },
        // 获取按钮权限数据
        getPermissionBtnData() {
            this.xAxios({
                method: "get",
                url: BASE_PATH + "/permission/btn.htmls",
                params: {}
            }).then(response => {
                const res = response.data;
                this.$store.state.permissionBtns = this._.map(res.data, "code");
            }).catch(error => {});
        }
    }
};
</script>