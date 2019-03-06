<template>
    <section>
        <h2>modules</h2>
        <ul>
            <li>搜索列表的搜索条件：起始日期 - 结束日期</li>
            <li>选地址时，select二级联动</li>
        </ul>
        <h2>组件</h2>
        <ul>
            <li>返回顶部</li>
            <li>无限级导航</li>
            <li>treetable</li>
        </ul>
        <example />
    </section>
</template>
<script>
// import '~/styles/main.scss'
// import example from '~/modules/WorkingHour/example.vue'
// import example from '~/modules/ThreeLevelAddress/example.vue'
// import example from '~/modules/MeterNumber/example.vue'
// import example from '~/modules/xFolding/example.vue'
import example from '~/components/xBackToTop/example.vue'
// import example from '~/components/xTable/example.vue'
// import example from '~/components/xTreeTable/example.vue'
// import example from '~/components/xLimitlessSidebarMenu/example.vue'
export default {
    components: { example }
};
</script>