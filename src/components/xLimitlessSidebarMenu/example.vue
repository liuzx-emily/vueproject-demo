<style lang="scss">
.style1 {
    width: 200px;
    background: #eee;
    border: 1px solid #ccc;
    .name_and_controlBtn {
        a.limitless-menu-li-name {
            padding: 5px 0;
            font-family: '微软雅黑';
            font-size: 15px;
            // 未选中时
            &, &:focus {
                color: red;
            }
            // 选中时、hover时
            &.router-link-exact-active, &:hover {
                background: red;
                color: white
            }
        }
        .controlBtn {
            top: 3px;
            color: blue;
        }
    }

}
</style>
<template>
    <section>
        <p> 1 使用 router-link 来控制路由跳转，所以需要 vue-router【现在使用的版本为 3.0.1】 </p>
        <p> 2 使用到 font-awesome 的图标 </p>
        <p> 3 使用 lodash 库 </p>
        <p> 4 使用 xTools </p>
        <p> 5 说明：index.vue 用来将普通数据格式化为树形数据，main.vue是递归调用的实际组件</p>
        <xLimitlessSidebarMenu :data="data" :props="props" class="style1" />
    </section>
</template>
<script>
import xLimitlessSidebarMenu from '~/components/xLimitlessSidebarMenu/index.vue';
export default {
    components: { xLimitlessSidebarMenu },
    data() {
        return {
            data: data1,
            props: {
                before_idkey: "id",
                before_parentkey: "parent",
                urlKey: "url",
            }
        }
    },
    mounted() {
        // debugger
    }
};
const data1 = [{
        id: "0",
        name: '大象',
        parent: "5",
        url: "/elephant"
    }, {
        id: "5",
        name: '动物',
        parent: "#",
        url: "/animal"
    }, {
        id: "6",
        name: '植物',
        parent: "#",
        url: "/plant"
    },
    {
        id: "1",
        name: '苹果',
        parent: "6",
        url: "/apple"
    },
    {
        id: "2",
        name: '橘子',
        parent: "6",
        url: "/orange"
    },
    {
        id: "3",
        name: '鸭',
        parent: "5",
        url: "/duck"
    },
    {
        id: "4",
        name: '榴莲',
        parent: "6",
        url: "/durian"
    },
    {
        id: "11",
        name: '大鸭',
        parent: "3",
        url: "/duck/big"
    },
    {
        id: "12",
        name: '小鸭',
        parent: "3",
        url: "/duck/small"
    },
];
</script>