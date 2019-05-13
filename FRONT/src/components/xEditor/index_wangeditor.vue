<template>
    <section>
        <!-- 为什么要加上z-index:0？因为里面有一个层级很高的div，会把弹窗盖住。 -->
        <section :id="editorId" style="position:relative;z-index:0;"></section>
    </section>
</template>
<script>
import xTools from '~/utils/xTools.js'
import WangEditor from 'wangeditor'
export default {
    install(Vue){
        Vue.component("xEditor",this);
    },
    components: { WangEditor },
    props: {
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        readOnly() {
            this.changeModifiability(!this.readOnly);
        }
    },
    data() {
        return {
            random: xTools.guid(),
            editor: null
        }
    },
    computed: {
        editorId() {
            return 'xEditor' + this.random;
        }
    },
    mounted() {
        this.editor = new WangEditor('#' + this.editorId); // 自定义菜单配置
        this.editor.customConfig.menus = [
            // 'head', // 标题
            'justify', // 对齐方式
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            // 'link', // 插入链接
            'list', // 列表
            'quote', // 引用
            // 'emoticon', // 表情
            'image', // 插入图片
            // 'table', // 表格
            // 'video', // 插入视频
            // 'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ];
        // 自定义字体
        this.editor.customConfig.fontNames = [
            '宋体',
            '微软雅黑',
            '楷体',
            '黑体',
            '隶书',
            'Arial',
            // 'Tahoma',
            // 'Verdana'
        ];
        this.editor.customConfig.uploadImgShowBase64 = true;
        this.editor.create();
        // 是否禁用
        this.changeModifiability(!this.readOnly);

    },
    methods: {
        // 禁用编辑器
        changeModifiability(flag) {
            this.editor.$textElem.attr('contenteditable', flag);
        },
        // 设置内容
        setContent(value) {
            this.editor.txt.html(value);
        },
        // 获取内容
        getContent() {
            return this.editor.txt.html();
        },
        // 判断是否为空
        checkContentIsNotNull() {
            let text = this.editor.txt.text();
            if (text && text.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

};
</script>