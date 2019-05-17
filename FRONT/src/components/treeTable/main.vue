<style rel="stylesheet/css">
@keyframes treeTableShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes treeTableShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
<style lang="scss" scoped>
$color-blue: #2196F3;
$space-width: 18px;
.ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
        content: ""
    }
}
.tree-ctrl {
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
}
.el-icon-minus, .el-icon-plus {
    width: $space-width;
}
</style>
<template>
    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column :label="controlColumn.label" :width="controlColumn.width" style="text-align:left">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
                <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus" />
                    <i v-else class="el-icon-minus" />
                </span>
                {{scope.row[controlColumn.prop]}}
            </template>
        </el-table-column>
        <slot></slot>
    </el-table>
</template>
<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
export default {
    install(Vue) {
        Vue.component("treeTable", this);
    },
    props: {
        data: {
            type: [Array, Object],
            required: true
        },
        controlColumn: {
            type: Object,
            default: () => {}
        },
        expandAll: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 格式化数据源
        formatData: function() {
            const args = [this.data, this.expandAll];
            let res = treeToArray.apply(null, args);
            return res;
        }
    },
    methods: {
        showRow: function(row) {
            const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
            row.row._show = show
            return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
        },
        // 切换下级是否展开
        toggleExpanded: function(trIndex) {
            const record = this.formatData[trIndex]
            record._expanded = !record._expanded
        },
        // 图标显示
        iconShow(index, record) {
            return (index === 0 && record.child && record.child.length > 0)
        }
    }
};
</script>