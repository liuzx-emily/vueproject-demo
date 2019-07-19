<style scoped>
    >>>.mce-branding {
        display: none;
    }
    >>>.mce-tinymce{
        width:auto!important;
    }
</style>
<template>
    <!-- 本来想做成数据双向绑定的，但是 setContent 会导致光标位置丢失。-->
    <!-- 父->子：会导致光标位置一直丢失，所以做不了。所以在赋初始值时，需要在组件外部手动 setContent -->
    <!-- 子->父：可以。所以取值时，不需要在组件外部手动 getContent ，直接取fcontent就可以  -->
    <div v-loading="loading">
        <textarea :id="tinymceId" class="tinymce-textarea"></textarea>
        <input :id="fileBtnId" type="file" @change="uploadImg" style="display:none;">
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
        // 文本框的高度
        height: {
            default: 400
        },
    },
    components: {},
    data() {
        return {
            loading: false,
            tinymceId: "editor-" + this.xtools.randomId(),
            fileBtnId: "fileBtn-" + this.xtools.randomId(),
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
                height: +this.height,
                menubar: menubar,
                toolbar: toolbar,
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
                font_formats: "宋体=宋体;" +
                    "仿宋=仿宋;" +
                    "微软雅黑=微软雅黑;" +
                    "楷体=楷体;" +
                    "隶书=隶书;" +
                    "黑体=黑体;" +
                    "幼圆=幼圆;" +
                    "Arial=arial,helvetica,sans-serif;",
                plugins: plugins,
                setup: editor => {
                    // 定义按钮，
                    editor.addButton('myBtn-imageUpload', {
                        text: '',
                        tooltip: '上传图片',
                        icon: "image",
                        onclick: () => {
                            const btn = document.querySelector("#" + this.fileBtnId);
                            btn.click();
                        }
                    })
                },
                init_instance_callback: editor => {
                    editor.on('keyup', e => {
                        this.content = this.getContent();
                    });
                    editor.on('change', e => {
                        this.content = this.getContent();
                    });
                }
            }).then(() => {
                // 如果编辑器放在弹窗中，那么第一次 setContent 的时候，可能编辑器还没初始化完。
                // 所以在初始化完成时，要赋值
                this.content && this.setContent(this.content);
            })
        },
        destroyTinymce() {

        },
        uploadImg() {
            const btn = document.querySelector("#" + this.fileBtnId);
            const files = btn.files;
            if (files.length === 0) {
                return;
            }
            const file = files[0];
            const maxSize = 20;
            // 类型验证
            if (file.type.indexOf("image") == -1) {
                this.$message({
                    message: `请上传图片！`,
                    type: 'error'
                });
                return;
            }
            // 大小验证
            if (file.size > maxSize * 1024 * 1024) {
                this.$message({
                    message: `图片大小不允许超过${maxSize}MB！`,
                    type: 'error'
                });
                return;
            }
            this.loading = true;
            var data = new FormData();
            data.append("file", file);
            data.append("fileName", file.name);
            this.xaxios({
                method: 'post',
                url: "/api/upload.do",
                data: data
            }).then(res => {
                this.$message({
                    type: "success",
                    message: "图片上传成功！"
                });
                const path = "/api/download.do?id=" + res.data;
                window.tinymce.get(this.tinymceId).insertContent(`<img src="${path}">`);
                this.loading = false;
            });
        },
        setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value);
            // 如果编辑器放在弹窗中，那么第一次 setContent 的时候，可能编辑器还没初始化完。
            // 所以在这里把 value 存起来，在初始化完成后赋值
            this.content = value;
        },
        getContent() {
            return window.tinymce.get(this.tinymceId).getContent();
        },
    }
};
</script>