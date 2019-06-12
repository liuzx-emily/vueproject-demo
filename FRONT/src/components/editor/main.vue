<style scoped>
>>>.mce-branding {
    display: none;
}
</style>
<template>
    <!-- 本来想做成数据双向绑定的，但是 setContent 会导致光标位置丢失。-->
    <!-- 父->子：会导致光标位置一直丢失，所以做不了。所以在赋初始值时，需要在组件外部手动 setContent -->
    <!-- 子->父：可以。所以取值时，不需要在组件外部手动 getContent ，直接取fcontent就可以  -->
    <div class="tinymce-container">
        <textarea :id="tinymceId" class="tinymce-textarea"></textarea>
        <div class="editor-custom-btn-container"></div>
    </div>
</template>
<script>
import { menubar } from './config/menubar.js'
import { toolbar } from './config/toolbar.js'
import { plugins } from './config/plugins.js'
export default {
    install(Vue) {
        Vue.component("xEditor", this);
    },
    props: {
        readonly: {
            default: false
        },
        fcontent: String,
        height: {
            default: 400
        }
    },
    components: {},
    data() {
        return {
            tinymceId: this.xtools.randomId(),
            content: "",
        }
    },
    computed: {},
    watch: {
        // 父->子：做不了，所以监听父的变化没意义了。
        // fcontent: {
        //     immediate: true,
        //     handler() {
        //         this.content = this.fcontent;
        //     },
        // },
        content() {
            // setContent 会导致光标位置丢失
            // this.setContent(this.content);
            // 子->父：可以。将子级的变化传递给父级
            this.$emit("update:fcontent", this.content);
        },
    },
    created() {},
    mounted() {
        this.initTinymce();
    },
    methods: {
        initTinymce() {
            window.tinymce.init({
                readonly: this.readonly,
                selector: "#" + this.tinymceId,
                language: 'zh_CN',
                height: parseInt(this.height),
                menubar: menubar,
                toolbar: toolbar,
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
                plugins: plugins,
                init_instance_callback: editor => {
                    editor.on('keyup', e => {
                        this.content = this.getContent();
                    });
                    editor.on('change', e => {
                        this.content = this.getContent();
                    });
                }
            });
        },
        destroyTinymice() {

        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value)
        },
        getContent() {
            return window.tinymce.get(this.tinymceId).getContent();
        },
    }
};
</script>