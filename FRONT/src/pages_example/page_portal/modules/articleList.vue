<template>
    <ul class="indexPage_newsList">
        <li v-for="item in formattedList">
            <span class="blue-dot"></span>
            <a :href="'#/detail/'+item.id" :title="item.name">
                <span class="news_name">
                    {{ formatName(item.title)}}
                </span>
            </a>
            <span class="news_date">{{item.time | formatDate }}</span>
        </li>
    </ul>
</template>
<script>
import _ from 'lodash';
export default {
    props: {
        "list": Array,
        // maxCount 最多展示多少篇文章，默认为0（不限制数量）
        "maxCount": {
            type: Number,
            default: 0
        },
        // maxTitleLength 标题最大长度，默认为30
        "maxTitleLength": {
            type: Number,
            default: 30
        }
    },
    computed: {
        formattedList() {
            let list = _.cloneDeep(this.list);
            if (this.maxCount !== 0 && list && list.length > this.maxCount) {
                list.length = this.maxCount;
            }
            return list;
        }
    },

    filters: {
        formatDate(value) {
            return xtools.formattingDate(value, 1);
        },
    },
    methods: {
        formatName(value) {
            if (value.length > this.maxTitleLength) {
                return value.substring(0, this.maxTitleLength - 3) + "...";
            } else {
                return value;
            }
        }
    }
};
</script>
<style lang="scss">
ul.indexPage_newsList {
    // height: 370px;
    li {
        position: relative;
        border-bottom: 1px solid #f5f5f5;
        padding: 12px 0;
        .blue-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            background: #439ade;
            border-radius: 50%;
            margin: 0px 10px 2px;
        }
        a {
            .news_name {
                font-size: 15px;
                color: #484848;
            }
        }
        .news_date {
            position: absolute;
            right: 0;
            font-size: 12px;
            color: #999999;
        }
    }
}
</style>