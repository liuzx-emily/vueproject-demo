<style scoped>
    .left{
    display: inline-block;
    width:calc(100% - 500px);
    height: 100%;
    vertical-align: top;
    overflow: auto;
}
.container {
    position: relative;
    width: 1200px;
    height: 800px;
    margin: 0 auto;
    outline: 1px solid black;
}
.right{
    display: inline-block;
    width: 500px;
}
>>>.el-card{
    margin-bottom: 5px;
    box-shadow: none!important;
}
>>>.el-card .el-card__header{
    padding: 5px 0;
    text-align: center;
    background:#eee;
    color:#555;
}
>>>.el-card .el-card__body{
    padding: 5px;
}
</style>
<template>
    <section style="height:100%;">
        <section class="left">
            <section class="container">
                <magicComponent :fdata.sync="data"></magicComponent>
            </section>
        </section>
        <section class="right">
            <a href="https://github.com/gorkys/vue-draggable-resizable">github地址</a>
            <el-button type="primary" @click="do_save">保存</el-button>
            <el-button type="text" @click="cancelSelect">取消当前选择的内容</el-button>
            <el-card>
                <div slot="header">当前元素</div>
                <section style="height:400px;overflow:auto">
                    <el-tabs v-show="currentMagic">
                        <el-tab-pane label="内容">
                            <editingText></editingText>
                        </el-tab-pane>
                        <el-tab-pane label="背景">
                            <settingBackground></settingBackground>
                        </el-tab-pane>
                        <el-tab-pane label="边框">
                            <settingBorder></settingBorder>
                        </el-tab-pane>
                    </el-tabs>
                </section>
            </el-card>
            <el-card>
                <div slot="header">大纲</div>
                <section style="height:100px;overflow:auto">
                    <el-tree :data="data.list" node-key="id" :props="{children:'list',label:'width'}" :highlight-current="true" @node-click="nodeClick" ref="tree"></el-tree>
                </section>
            </el-card>
        </section>
    </section>
</template>
<script>
// 递归的 magicComponent
import magicComponent from './magicComponent.vue'
// 弹窗
import editingText from './modules/editingText.vue'
import settingBackground from './modules/settingBackground.vue'
import settingBorder from './modules/settingBorder.vue'
// 数据
import original_data from './data/mainData.js'
export default {
    components: { magicComponent, editingText, settingBackground, settingBorder, },
    data() {
        let data = this._.cloneDeep(original_data);
        data.top = true;
        data.backgroundColor = "#ffffff";
        data.active = true;
        data.width = 1200;
        data.height = 800;
        data.content = "";
        return {
            contentId: "magic",
            data: data,
        }
    },
    computed: {
        currentMagic() {
            return this.$store.state.magicComponent.currentComponent;
        }
    },
    watch: {
        "currentMagic"(value) {
            if (value) {
                this.$refs.tree.setCurrentKey(value.data.id);
            } else {
                this.$refs.tree.setCurrentKey(null);
            }
        }
    },
    created() {
        this.getData();
    },
    mounted() {},
    methods: {
        cancelSelect() {
            this.$store.state.magicComponent.currentComponent = null;
        },
        getData() {
            this.xAxios({
                url: BASE_PATH + "/magiccomponent/list.do",
                params: {
                    contentId: this.contentId
                }
            }).then(res => {
                let data = this._.map(res.data, item => {
                    item.top = false;
                    item.active = false;
                    item.isDelete = false;
                    return item;
                })
                this.data.list = this.xtools.arrayToTree(data, {
                    after_childkey: "list",
                });
            })
        },
        do_save() {
            this.xAxios({
                method: 'POST',
                url: BASE_PATH + "/magiccomponent/saveAll.do",
                data: {
                    list: this.data.list,
                    contentId: this.contentId
                }
            }).then(res => {
                if (res.code == 1) {
                    this.$message({
                        message: '保存成功！',
                        type: 'success',
                    });
                }
            });
        },
        nodeClick(data) {
            data.active = true;
        }
    }
};
</script>