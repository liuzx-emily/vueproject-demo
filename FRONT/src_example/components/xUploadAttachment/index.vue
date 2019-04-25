<style lang="scss" scoped>
    .xUploadAttachment-container{
        margin:10px 0;
        ul{
            line-height:22px;
            li{
                font-size:12px;
                .icon{
                    margin-right:5px;
                    color:#1E88E5;
                }
                a.fileName{
                    text-decoration: underline;
                    cursor: pointer;
                    // color: #555;
                    color: #1e5494;
                }
                i.fa.deleteBtn{
                    color:#f56c6c;
                    font-size:16px;
                    margin-left:10px;
                    position:relative;
                    top:2px;
                    cursor:pointer;
                }
            }   
        }
    }
    .inlineMode{
        .upload-container,ul,li{
            display:inline-block;
        }
        .upload-container{
            margin-right:10px;
        }
        li{
            margin-right:20px;
        }
        i.fa.deleteBtn{
            margin-left:5px;
        }
    }
</style>
<template>
    <div v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)" class="xUploadAttachment-container" :class="{inlineMode:inlineMode}">
        <!-- 编辑模式 -->
        <template v-if="!readOnly">
            <!-- 上传附件 -->
            <el-upload action="用不到，随便填" :http-request="doUploadAttachment" :show-file-list="false" :multiple="true" class="upload-container">
                <el-button size="mini" type="primary" slot="trigger">上传附件</el-button>
            </el-upload>
            <ul>
                <li v-for="(file,index) in fileList">
                    <i class="fa fa-paperclip icon"></i>
                    <a @click="do_download(file)" title="点击下载" class="fileName">{{file.name}}</a>
                    <i @click="do_delete(index)" class="fa fa-trash deleteBtn" title="点击删除"></i>
                </li>
            </ul>
        </template>
        <!-- 阅读模式 -->
        <template v-else>
            <ul v-if="fileList&&fileList.length>0">
                <li v-for="(file,index) in fileList">
                    <i class="fa fa-paperclip icon"></i>
                    <a @click="do_download(file)" title="点击下载" class="fileName">{{file.name}}</a>
                </li>
            </ul>
            <template v-else>
                无
            </template>
        </template>
    </div>
</template>
<script>
import _ from 'lodash'
import xTools from '~/utils/xTools.js'

export default {
    props: {
        orginallist: {
            type: Array,
            default: () => { return []; }
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        inlineMode: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        orginallist(value) {
            this.fileList = _.cloneDeep(value);
        }
    },
    components: {},
    data() {
        return {
            loading: false,
            fileList: _.cloneDeep(this.orginallist)
        };
    },
    methods: {
        // -------------------------------- 上传附件 --------------------------------
        doUploadAttachment(param) {
            const file = param.file;
            if (file.size / 1024 / 1024 > 20) {
                this.$message({
                    message: '文件大小不允许超过20MB！',
                    type: 'error'
                });
                return;
            }
            this.loading = true;
            var data = new FormData();
            data.append("file", file);
            data.append("fileName", file.name);
            data.append("md5", xTools.guid());
            this.xAxios({
                method: 'post',
                url: BASE_PATH + '/article/upload.htmls',
                data: data
            }).then((response) => {
                const res = response.data;
                this.fileList.push({
                    id: res.data,
                    name: file.name
                })
                this.$message({
                    type: "success",
                    message: "附件上传成功！"
                });
                this.loading = false;
            }).catch(error => { this.loading = false; });
        },
        do_download(file) {
            window.location.href = BASE_PATH + `/article/download.htmls?id=${file.id}`;
        },
        do_delete(index) {
            this.fileList.splice(index, 1);
        }
    }
};
</script>