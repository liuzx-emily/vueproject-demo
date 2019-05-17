<style scoped></style>
<template>
    <section>
        <el-card>
            <div slot="header">
                显示、隐藏实现渐变效果
            </div>
            <!-- card body -->
            <p> CSS中的<code>transition</code>属性对<code>display</code>不生效，对<code>opacity</code>生效。</p>
            <p>如果display和opcaity同时变化，transition也不生效，所以只能使用opacity，不能用display</p>
            <pre style="margin-left:-70px;">
            	.show{            		
            		opacity:0;
            		transition:1s;
            	}
            	.hide{            		
            		opacity:1;
            		transition:1s;
            	}
            </pre>
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