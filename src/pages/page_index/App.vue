<template>
    <div id="app">
        <section id="topbar">
            <!-- logo -->
            <section class="logo">
                一个很长很长很长很长很长的标题
            </section>
            <!-- 导航 -->
            <nav>
                <router-link v-for="(item,index) in navList" :key="item.uri" :to="item.uri">
                    <!-- <i class="fa" :class="item.icon"></i> -->
                    <i class="fa" :class="'fa-'+item.icon"></i>
                    <span class="name">{{item.name}}</span>
                </router-link>
                <a href="./portal.html">
                    <i class="fa fa-umbrella"></i>
                    <span class="name">门户首页</span>
                </a>
            </nav>
            <!-- 用户 -->
            <section id="userBox">
                <!-- <router-link key="/mailbox" to="/mailbox" title="信箱" class="router_mail">
                    <el-badge :value="$store.state.msgNum" :hidden="$store.state.msgNum==0">
                        <i class="fa fa-envelope-o" style="font-size:20px"></i>
                    </el-badge>
                </router-link> -->
                <UserInfo />
            </section>
        </section>
        <template v-if="leftNavList.length>0">
            <section id="main_container" :class="{cuttedSideBar:$store.state.cuttedSideBar}">
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
                <router-view id="content_wrap"></router-view>
            </section>
        </template>
        <template v-else>
            <router-view id="content_wrap"></router-view>
        </template>
    </div>
</template>
<script>
// 全局
import '~/styles/reset.scss'
import '~/styles/common.scss'
import _ from 'lodash'
import xTools from '~/utils/xTools.js'
import xLimitlessSidebarMenu from '~/components/xLimitlessSidebarMenu/index.vue';
// 本页
import './styles/main.scss'
import UserInfo from './modules/xUserInfo/index.vue';
export default {
    name: 'app',
    components: {
        UserInfo,
        xLimitlessSidebarMenu
    },
    created() {
        this.getUserInfo();
    },
    watch: {
        currentTopNavPath() {
            this.jumpToFirstNav();
        },
        leftNavList() {
            this.jumpToFirstNav();
        },
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
            let aaaaa = _.filter(this.navList, item => item.uri == this.currentTopNavPath);
            if (aaaaa[0] && aaaaa[0].child && aaaaa[0].child.length > 0) {
                return aaaaa[0].child;
            } else {
                return [];
            }
        }
    },
    mounted() {
        this.jumpToFirstNav();
    },
    data: function() {
        return {
            // 总导航
            navList: [],
            props: {
                before_idkey: "permissionId",
                before_parentkey: "parentId",
                urlKey: "uri",
            }
        }
    },
    methods: {
        // 如果访问本组件的根地址，自动跳转到第一个菜单
        jumpToFirstNav() {
            if (this.$route.path == this.currentTopNavPath) {
                if (this.leftNavList && this.leftNavList[0] && this.leftNavList[0].uri) {
                    this.$router.push(this.leftNavList[0].uri);
                }
            }
        },
        // 获取菜单数据，并且自动跳转到第一个菜单
        getUserInfo() {
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/user/userStatus.htmls',
            }).then((response) => {
                const res = response.data;
                if (res.code == "1") {
                    // 已登录
                    let userInfo = {
                        id: res.data.userId,
                        name: res.data.realname,
                    };
                    this.$store.state.userInfo = userInfo;
                    // 获取菜单数据，并且自动跳转到第一个菜单
                    this.getMenuData();
                    this.getPermissionBtnData();
                } else {
                    // 未登录                    
                    window.location.href = "./portal.html";
                }
            }).catch(error => {
                // console.log(error);
            });
        },
        // 获取菜单数据，并且自动跳转到第一个菜单
        getMenuData() {
            this.xAxios({
                method: 'get',
                url: BASE_PATH + '/permission/nav.htmls',
                params: {}
            }).then((response) => {
                const res = response.data;
                const navList = xTools.arrayToTree(res.data, { before_idkey: "permissionId", before_parentkey: "parentId", after_childkey: 'child' });
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
                method: 'get',
                url: BASE_PATH + '/permission/btn.htmls',
                params: {}
            }).then((response) => {
                const res = response.data;
                this.$store.state.permissionBtns = _.map(res.data, "code");
            }).catch(error => {});
        }
    }
};
</script>