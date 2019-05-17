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
                    <router-link v-for="(item) in navList" :key="item.code" :to="item.code">
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
            <!-- 侧边栏 -->
            <template v-if="leftNavList.length>0">
                <section id="sidebar_wrap">
                    <section id="leftNav_control">
                        <section class="inner" @click="$store.state.cuttedSideBar=!$store.state.cuttedSideBar">
                            <i class="fa fa-arrow-circle-o-left" v-if="!$store.state.cuttedSideBar"></i>
                            <i class="fa fa-arrow-circle-o-right" v-else></i>
                            <span class="txt">菜单</span>
                        </section>
                    </section>
                    <xLimitlessSidebarMenu :data="leftNavList" :props="sidebarMenuProps" id="leftNav" />
                </section>
            </template>
            <!-- 主要内容 -->
            <section id="content_wrap" :style="ContentWrapStyle">
                <router-view :key="$route.fullPath"></router-view>
                <!-- <router-view></router-view> -->
            </section>
        </section>
    </div>
</template>
<script>
// 本页
import "./styles/main.scss";
import UserInfo from "./modules/xUserInfo/main.vue";
export default {
    name: "app",
    components: { UserInfo },
    watch: {
        '$route.path':{
            immediate:true,
            handler(value){
                // console.log(this.$router);
                // console.log("$route.path为："+value);
            }
        },
        'leftNavList'() {
            this.jumpToFirstNav();
        },
        initDone(value) {
            if (value) {
                this.$nextTick(() => {
                    this.calculateHeight();
                })
            }
        }
    },
    computed: {
        ContentWrapStyle() {
            if (this.leftNavList.length > 0) {
                return {};
            } else {
                return {
                    marginLeft: 0
                };
            }
        },
        // 
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
            let currentTopNav_and_children = this._.filter(this.navList, item => item.code == this.currentTopNavPath);
            // url在navList中没有匹配上
            if (currentTopNav_and_children.length === 0) {
                // this.$router.push({ name: '404' });
                return [];
            }
            let child = currentTopNav_and_children[0].child;
            if (child && child.length > 0) {
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
            // 初始化完成了吗(所有要存在$store里的值都放好了吗？)
            initDone: false,
            // 总导航
            navList: [],
            sidebarMenuProps: {
                before_idkey: "id",
                before_parentkey: "parentId",
                urlKey: "code"
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
            let findRealPage = (list) => {
                if (list && list.length > 0) {
                    // list不是空的
                    let firstChild = list[0];
                    if (firstChild.type == 1) {
                        // type==1，是导航，需要接着往下找
                        return findRealPage(firstChild.child);
                    } else if (firstChild.type == 2) {
                        // type==2，是页面
                        return firstChild.code;
                    } else {
                        // type为其他，权限肯定是配错了！
                    }
                } else {
                    // 是空的

                }
            };
            if (this.$route.path == this.currentTopNavPath) {
                let realPageCode = findRealPage(this.leftNavList);
                realPageCode && this.$router.push(realPageCode);
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
                // url: BASE_PATH + "/permission/nav.htmls",
                url: BASE_PATH + "/permission/list.do",
                params: {}
            }).then(response => {
                const res = response.data;
                const navList = this.xTools.arrayToTree(res.data, {
                    before_idkey: "id",
                    before_parentkey: "parentId",
                    after_childkey: "child"
                });
                // 路由跳转
                if (navList && navList.length > 0) {
                    this.navList = navList;
                    // 说明：路由不能跳转到指定路径，因为用户不一定有权限！所以需要手动跳转
                    if (this.$route.path == "/") {
                        this.$router.push(navList[0].code);
                    }
                    this.initDone = true;
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