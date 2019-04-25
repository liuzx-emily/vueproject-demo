<template>
    <section>
        使用<a href="https://github.com/kamranahmedse/driver.js" target="_blank" id="aaaaaa">driver.js </a>
        <el-button type="primary" @click="do_guide">显示教程</el-button>
    </section>
</template>
<script>
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
export default {
    data() {
        return {
            guide: null
        }
    },
    mounted() {
        this._.delay(() => {
            this.guide = new Driver({
                prevBtnText: "上一个",
                nextBtnText: "下一个",
                closeBtnText: "关闭",
                doneBtnText: "结束"
            });
            // this.do_guide();
        }, 2000)
    },
    methods: {
        do_guide() {
            let step2 = [{
                element: '#aaaaaa',
                popover: {
                    title: "主导航"
                }
            }];
            let steps = [{
                element: "#topbar nav",
                // stageBackground: "#000",
                popover: {
                    title: "主导航"
                }
            }, {
                element: "#leftNav_control .inner",
                stageBackground: "#000",
                popover: {
                    title: "收缩、展开侧边栏"
                }
            }, {
                element: "#userBox",
                // stageBackground: "#000",
                popover: {
                    title: "账户信息",
                    description: "鼠标滑上可以显示下拉菜单，进行修改密码、修改个人信息、安全退出操作",
                    position: "left"
                }
            }];
            this.guide.defineSteps(step2);
            this.guide.start();
        }
    }
};
</script>