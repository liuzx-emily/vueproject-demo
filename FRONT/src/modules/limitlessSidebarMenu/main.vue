<template>
    <!-- 如果level从1开始，那么最高级菜单，也有padding-left。 -->
    <submenu :data="formattedData" :urlKey="props.urlKey" :level="1" />
</template>
<script>
import submenu from './submenu.vue'
import './main.less'
export default {
    install(Vue) {
        Vue.component("xLimitlessSidebarMenu", this);
    },
    components: { submenu },
    props: {
        data: {
            type: Array,
            default: () => { return []; }
        },
        props: {
            type: Object,
            default: () => {
                return {
                    before_idkey: "id",
                    before_parentkey: "parentId",
                    urlKey: "url",
                }
            }
        }
    },
    data() {
        return {
            formattedData: this.formattingData(),
        }
    },
    watch: {
        data() {
            this.formattedData = this.formattingData();
        }
    },
    methods: {
        // 格式化数据，将平级的数据，转换成tree结构数据
        formattingData() {
            let data = this.data;
            // let data = this._.cloneDeep(data);
            let treeData = this.xtools.arrayToTree(data, {
                id: this.props.before_idkey,
                parentId: this.props.before_parentkey,
                children: "child"
            });
            return treeData;
        }
    }
};
</script>