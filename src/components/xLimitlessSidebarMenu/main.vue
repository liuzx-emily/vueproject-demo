<template>
    <ul class="limitless-menu-ul">
        <li v-for="(item,index) in formattedData" class="limitless-menu-li" :key="index">
            <!-- 有子级： -->
            <template v-if="item.hasChild">
                <section class="name_and_controlBtn">
                    <!-- 说明：在这里加padding，是为了背景颜色覆盖一整行。
                    如果在外层的 li 上加padding，那么它的子级的背景颜色就不是一整行了。 -->
                    <a class="limitless-menu-li-name" @click="item.showChild = !item.showChild" :style="paddingStyle"> {{item.name}} </a>
                    <span class="controlBtn" v-if="item.hasChild" @click="item.showChild = !item.showChild">
                        <i class="fa fa-angle-up" v-if="item.showChild"></i>
                        <i class="fa fa-angle-down" v-else></i>
                    </span>
                </section>
                <submenu :data="item.child" :urlKey="urlKey" :level="level+1" v-show="item.showChild"></submenu>
            </template>
            <!-- 没有子级 -->
            <template v-else>
                <section class="name_and_controlBtn">
                    <!-- 说明：在这里加padding，是为了背景颜色覆盖一整行。
                    如果在外层的 li 上加padding，那么它的子级的背景颜色就不是一整行了。 -->
                    <router-link class="limitless-menu-li-name" :to="item[urlKey]" :style="paddingStyle"> {{item.name}} </router-link>
                </section>
            </template>
        </li>
    </ul>
</template>
<script>
import _ from 'lodash';
export default {
    // 自己调用自己，所以必须得写name！！！！
    name: 'submenu',
    props: {
        data: Array,
        urlKey: String,
        level: Number
    },
    computed: {
        paddingStyle() {
            return {
                'paddingLeft': this.level * 30 + 'px'
            };
        },
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
    mounted() {},
    methods: {
        // 格式化数据，添加属性showChild，计算属性hasChild
        formattingData() {
            // let data = this.data;
            // 必须要先深拷贝一下，不然就会出错，原因未知？？？？？
            let data = _.cloneDeep(this.data);
            let formattedData = _.map(data, (item) => {
                if (item.child && item.child.length > 0) {
                    item.hasChild = true;
                } else {
                    item.hasChild = false;
                }
                item.showChild = true;
                return item;
            });
            return formattedData;
        }
    }
};
</script>