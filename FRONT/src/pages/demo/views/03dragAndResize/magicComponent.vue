<style scoped lang="less">
.isCurrentMagic {
    outline: 5px solid red;
}
</style>
<template>
    <!-- ******* 属性 ******* -->
    <!-- draggable -->
    <!-- resizable -->
    <!-- w:初始宽度 Number -->
    <!-- h:初始高度 Number -->
    <!-- minw:最小宽度 Number -->
    <!-- minh:最小高度 Number -->
    <!-- x:初始x位置 Number -->
    <!-- y:初始y位置 Number -->
    <!-- z:z-index Number|String -->
    <!-- handles:定义句柄数组以限制元素大小调整 默认['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'] -->
    <!-- axis:定义元素可拖动的轴。可用值为x, y 或者 both. -->
    <!-- grid:定义捕捉元素的网格。 Array 默认[1,1]-->
    <!-- parent:将元素的移动和尺寸限制为父元素。    -->
    <!-- snap:磁性对齐 -->
    <!-- isConflictCheck:不能重叠 -->
    <!-- ******* 事件 ******* -->
    <!-- activated:单击组件时调用，以显示句柄。 -->
    <!-- deactivated:每当用户单击组件外的任何位置时调用，以便停用它。 -->
    <!-- resizing:每当组件调整大小时调用。参数：left top width height -->
    <!-- resizestop:每当组件停止调整大小时调用。参数：left top width height -->
    <!-- dragging:每当拖动组件时调用。参数：left top -->
    <!-- dragstop:每当组件停止拖动时调用。参数：left top -->
    <vue-draggable-resizable :active.sync="data.active" :w="data.width" :h="data.height" :x="data.x" :y="data.y" :parent="true" :isConflictCheck="false" :class="checkIsCurrentMagic" @activated="onActivated" @deactivated="onDeactivated" @resizestop="onResizestop" @dragstop="onDragstop" :id="containerId">
        <!-- 内容 -->
        <section v-html="data.content"></section>
        <!-- 子内容 -->
        <magicComponent v-for="(item,index) in data.list" :key="index" :fdata.sync="item"></magicComponent>
    </vue-draggable-resizable>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
import { render_background, render_border, } from './utils.js'
// 数据
import original_data from './data/mainData.js'
export default {
    name: "magicComponent",
    components: { VueDraggableResizable, },
    props: { fdata: {}, },
    watch: {
        "data.active"(active) {
            if (active) {
                this.$store.commit("magicComponent/setCurrentId", this.data.id);
            }
        }
    },
    data() {
        return {
            containerId: "container-" + this.xtools.randomId(),
            // 指向一个地址。所以data变化 === fdata变化 === $store中的值变化
            data: this.fdata,
        }
    },
    computed: {
        containerEle() {
            return document.querySelector('#' + this.containerId);
        },
        checkIsCurrentMagic() {
            return { isCurrentMagic: this.data.id === this.$store.state.magicComponent.currentId };
        }
    },
    mounted() {
        render_background(this);
        render_border(this);
    },
    methods: {
        onActivated() {
            this.data.active = true;
        },
        onDeactivated() {
            this.data.active = false;
        },
        onResizestop(left, top, width, height) {
            this.data.x = left;
            this.data.y = top;
            this.data.width = width;
            this.data.height = height;
        },
        onDragstop(left, top) {
            this.data.x = left;
            this.data.y = top;
        },
    }
};
</script>