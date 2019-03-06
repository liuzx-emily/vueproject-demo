<template>
    <!-- 如果level从1开始，那么最高级菜单，也有padding-left。 -->
    <submenu :data="formattedData" :urlKey="props.urlKey" :level="1" />
</template>
<script>
import submenu from './main'
import _ from 'lodash';
import xTools from '~/utils/xTools.js'
import './index.scss'
export default {
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
            // let data = _.cloneDeep(data);
            let treeData = xTools.arrayToTree(data, {
                before_idkey: this.props.before_idkey,
                before_parentkey: this.props.before_parentkey,
                after_childkey: "child"
            });
            return treeData;
        }
    }
};
</script>