<style scoped></style>
<template>
    <section>
        <el-card>
            <div slot="header">问题描述 </div>
            <!-- card body -->
            <p>在<code>App.vue</code>中进行初始化操作，如获取用户的角色信息，记为<code>getRoleInfo1</code>。</p>
            <p>在子页面<code>subpage</code>中，需要根据用户角色不同，alert不同的信息。</p>
            <p>如果页面一进来就是<code>subpage</code>，那么很有可能可能<code>getRoleInfo1</code>还没有返回信息，此时<code>subpage</code>中根据角色进行判断就会出问题。</p>
        </el-card>
        <el-card>
            <div slot="header">聪明的方法</div>
            <!-- card body -->
            <p>在<code>App.vue</code>中设置一个局部变量<code>initDone</code>，初始化为false。给<code>#main_container</code>设置<code>v-if="initDone"</code></p>
            <p>把子页面需要用的值存到全局变量中(vuex)，这些全局变量记为<code>vars</code>。在<code>App.vue</code>中，所有<code>vars</code>都获取完之后，再把<code>initDone</code>设置为true。</p>
        </el-card>
        <el-card>
            <div slot="header">笨方法 </div>
            <!-- card body -->
            <p>笨方法1：在<code>subpage</code>中手动获取角色信息，记为<code>getRoleInfo2</code>，并在<code>getRoleInfo2</code>的success中进行alert</p>
            <p>笨方法2：将<code>getRoleInfo1</code>是否完成记录为全局变量，并在<code>subpage</code>中监听这个变量</p>
        </el-card>
    </section>
</template>
<script>
export default {
    props: {},
    components: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>