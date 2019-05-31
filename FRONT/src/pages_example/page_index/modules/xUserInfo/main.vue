<template>
    <section id="userBox">
        <span class="username">{{$store.state.userInfo.name}}</span>
        <i class="fa fa-caret-down"></i>
        <ul>
            <li @click="openDial_changePassword">修改密码</li>
            <li @click="openDial_editInfo">修改个人信息</li>
            <li @click="logout">安全退出</li>
        </ul>
        <!-- 弹窗：修改个人信息 -->
        <dialogEditInfo ref="dialogEditInfo"></dialogEditInfo>
        <!-- 弹窗：修改密码 -->
        <dialogChangePassword ref="dialogChangePassword"></dialogChangePassword>
    </section>
</template>
<script>
import dialogEditInfo from './dialogEditInfo.vue'
import dialogChangePassword from './dialogChangePassword.vue'
export default {
    components: { dialogEditInfo, dialogChangePassword, },
    data() { return {} },
    methods: {
        // 打开弹窗：修改个人信息
        openDial_editInfo() {
            this.$refs.dialogEditInfo.openDial();
        },
        // 打开弹窗：修改密码
        openDial_changePassword() {
            this.$refs.dialogChangePassword.openDial();
        },
        // 退出
        logout() {
            this.loading = false;
            this.xAxios({
                method: "post",
                url: BASE_PATH + "/logout.do"
            }).then(response => {
                const res = response.data;
                if (res.code == "1") {
                    window.location.href = "./login.html";
                }
            })
        }
    }
};
</script>