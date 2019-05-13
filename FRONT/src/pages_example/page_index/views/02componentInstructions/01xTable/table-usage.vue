<template>
    <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
        <el-card>
            <div slot="header" class="clearfix">
                <span>组件使用说明</span>
            </div>
            <div>
                <p>1 内置loading，在
                    <code>refresh</code> 方法中自动切换
                </p>
                <p>2 内置分页参数：page row</p>
                <p>3 内置后端排序，参数为：sort order，组件内部已经绑定了排序函数，只需要给排序的列添加
                    <code>sortable="custom"</code>。默认排序参数使用
                    <code>defaultsort</code>来传递（这是xTable组件封装的属性，不是el-table提供的）
                </p>
                <p>4 内置多选功能：传递
                    <code>:enableCheckbox="true"</code>。使用
                    <code>getSelection</code> 方法获取选中行数据
                </p>
                <p>5 如果需要关闭分页功能，传递
                    <code>:enablePaging="false"</code>，默认为true
                </p>
                <p>6 如果需要修改分页信息，传递<code>pagingParam</code>参数。注意：如果要自定义起始页数，那么在mounted里面<span style="color:red">不要调用 refreshTable_pageOne()</span></p>
            </div>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <span>el-table使用经验</span>
            </div>
            <div>
                <p>1 表头强制换行：使用header插槽，见"面积"这一列</p>
                <p>2 如果排序字段和渲染字段不一致怎么办？见"性别"这一列</p>
                <p>3 用 pickDateRange 和 pickYear这种组件。如果有默认初始值，那么要在组件和searchparam中都赋初始值才行！！！</p>
            </div>
        </el-card>
        <section class="search-condition">
            <section class="box">
                <span class="search-label">名称：</span>
                <span class="search-input">
                    <el-input v-model.trim="fakesearchparam.name"></el-input>
                </span>
            </section>
            <section class="box">
                <span class="search-label">下拉框：</span>
                <span class="search-input">
                    <el-select v-model="fakesearchparam.select1">
                        <el-option label="全部" :value="-1"></el-option>
                        <el-option label="值1" :value="1"></el-option>
                        <el-option label="值2" :value="2"></el-option>
                    </el-select>
                </span>
            </section>
            <section class="box">
                <span class="search-label">日期：</span>
                <span class="search-input">
                    <pickDateRange ref="pickDateRange1" />
                    <!-- <pickDateRange width="150px" ref="pickDateRange1"/> --></span>
            </section>
            <section class="box">
                <span class="search-label">年份：</span>
                <span class="search-input">
                    <pickYear ref="pickYear1"></pickYear>
                    <!-- <pickYear :value="2014" width="200px" :defaultPickCurrentYear="true" :cannotBeFuture="true" ref="pickYear1"></pickYear> -->
                </span>
            </section>
            <section class="search-btn-box">
                <el-button type="primary" @click="do_search">搜索</el-button>
                <el-button type="success" @click="dialog_1_open(1)">新增</el-button>
                <el-button type="danger" @click="do_delete_multiple">批量删除</el-button>
            </section>
        </section>
        <xTable :refresh="refresh" :searchparam="searchparam" ref="table" :defaultsort="defaultsort" :enableCheckbox="true" :enablePaging="true" :pagingParam="pagingParam">
            <el-table-column prop="name" label="名称" sortable="custom"></el-table-column>
            <el-table-column prop="gender" label="性别" sortable="custom">
                <template slot-scope="scope">{{scope.row.genderText}}</template>
            </el-table-column>
            <el-table-column prop="select1" label="下拉框" sortable="custom">
                <template slot-scope="scope">{{scope.row.select1Text}}</template>
            </el-table-column>
            <el-table-column prop="number" width="130px">
                <template slot="header">数
                    <br>字
                </template>
            </el-table-column>
            <el-table-column prop="time" label="日期" width="120px">
                <template slot-scope="scope">{{scope.row.timeText}}</template>
            </el-table-column>
            <el-table-column label="操作" width="250px">
                <template slot-scope="scope">
                    <el-button class="size-small" type="success" @click="dialog_1_open(2,scope.row)">编辑</el-button>
                    <el-button class="size-small" type="primary" @click="dialog_1_open(3,scope.row)">查看</el-button>
                    <el-button class="size-small" type="warning" @click="dialog_2_open(scope.row)">审核</el-button>
                    <el-button class="size-small" type="danger" @click="do_delete([scope.row.id])">删除</el-button>
                </template>
            </el-table-column>
        </xTable>
        <!-- 弹窗1 -->
        <el-dialog :title="dialog_1.title" :visible.sync="dialog_1.visible" width="600px" :modal-append-to-body='false'>
            <el-form ref="dialog_1_ref" label-width="100px" :model="dialog_1.data" :rules="dialog_1.rules" :disabled="dialog_1.readonly">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dialog_1.data.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="dialog_1.data.gender">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="下拉框" prop="select1">
                    <el-select v-model="dialog_1.data.select1" style="width:100%;">
                        <el-option label="全部" :value="-1"></el-option>
                        <el-option label="值1" :value="1"></el-option>
                        <el-option label="值2" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input type="textarea" v-model="dialog_1.data.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <template v-if="dialog_1.readonly">
                    <el-button @click="dialog_1.visible = false">关 闭</el-button>
                </template>
                <template v-else>
                    <el-button @click="dialog_1.visible = false">取 消</el-button>
                    <el-button type="primary" @click="dialog_1_save">确 定</el-button>
                </template>
            </span>
        </el-dialog>
        <!-- 弹窗2 -->
        <el-dialog :title="dialog_2.title" :visible.sync="dialog_2.visible" width="500px" :modal-append-to-body='false'>
            <el-form ref="dialog_2_ref" label-width="100px" :model="dialog_2.data" :rules="dialog_2.rules">
                <el-form-item label="审核结果" prop="flag">
                    <el-radio-group v-model="dialog_2.data.flag">
                        <el-radio label="1">通过</el-radio>
                        <el-radio label="0">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="不通过原因" prop="description" v-if="dialog_2.data.flag==='0'">
                    <el-input type="textarea" v-model="dialog_2.data.reason"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog_2.visible = false">取 消</el-button>
                <el-button type="primary" @click="dialog_2_save">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            loading: false,
            // 表格参数
            fakesearchparam: {
                name: "",
                select1: -1,
            },
            searchparam: {
                name: "",
                select1: -1,
                startTime: "",
                endTime: "",
                // 如果年份选择有初始值，那么必须在这里也传入。不然页面初始化后的默认列表，是没有带着这个字段的
                year: new Date().getFullYear()
            },
            // 分页参数
            pagingParam: {
                pageSizes: [5, 10, 20, 50],
                // 如果要自定义起始页数，那么在mounted里面不要调用 refreshTable_pageOne()
                pageNum: 1,
                pageSize: 5,
            },
            // 后端排序，默认参数
            defaultsort: { sort: "name", order: "asc" },
            // 弹窗1
            dialog_1: {
                title: "信息",
                // 1新增 2编辑 3查看
                mode: 1,
                visible: false,
                readonly: false,
                data: {
                    id: null,
                    name: null,
                    number: null,
                    gender: null,
                    select1: null,
                    description: null,
                },
                rules: {
                    name: [
                        { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    ],
                    gender: [
                        { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    ],
                    select1: [
                        { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    ],
                }
            },
            // 弹窗2
            dialog_2: {
                title: "审核",
                visible: false,
                data: {
                    id: null,
                    flag: null,
                    reason: null,
                },
                rules: {
                    flag: [
                        { required: true, message: "不能为空", trigger: ['blur', 'change'] },
                    ]
                }
            },
        };
    },
    mounted() {
        this.refreshTable_pageOne();
    },
    methods: {
        // ------------------------------ 表格 ------------------------------
        // 传给子组件用的
        refresh(param, self) {
            // console.log(param);
            // 获取表格数据
            self.loading = true;
            self.xAxios({
                method: "get",
                url: BASE_PATH + "/example/xTable.htmls",
                params: param
            }).then(response => {
                const res = response.data;
                // 数据格式化
                self.tableData = this._.map(res.data, item => {
                    item.timeText = this.xTools.formatDate(item.time, 1);
                    // 性别
                    if (item.gender === 1) {
                        item.genderText = "男";
                    } else if (item.gender === 0) {
                        item.genderText = "男";
                    } else {
                        item.genderText = "";
                    }
                    // 下拉框
                    if (item.select1 === 1) {
                        item.select1Text = "值1";
                    } else if (item.select1 === 2) {
                        item.select1Text = "值2";
                    } else {
                        item.select1Text = "";
                    }
                    return item;
                });
                self.count = res.count;
                self.loading = false;
            }).catch(error => {
                self.loading = false;
            });
        },
        // 刷新表格（跳回第一页）
        refreshTable_pageOne() {
            this.$refs.table.pageNum = 1;
            this.$refs.table.refreshTable();
        },
        // 搜索
        do_search() {
            this.searchparam.name = this.fakesearchparam.name;
            this.searchparam.select1 = this.fakesearchparam.select1;
            // 日期范围选择
            this.searchparam.startTime = this.$refs.pickDateRange1.get(1);
            this.searchparam.endTime = this.$refs.pickDateRange1.get(2);
            // 年份
            this.searchparam.year = this.$refs.pickYear1.get();
            // 刷新表格（跳回第一页）
            this.refreshTable_pageOne();
        },
        do_delete(ids) {
            this.$confirm("删除后不可恢复，您确认要删除吗？", "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                console.log("删除", ids);
                let idString = this._.join(ids, ",");
                // this.xAxios({
                //     method: 'post',
                //     url: BASE_PATH + '/euq/delete.htmls',
                //     params: {
                //         id: idString
                //     }
                // }).then((response) => {
                //     const res = response.data;
                //     if (res.code == 1) {
                //         this.$message({
                //             type: 'success',
                //             message: '删除成功！'
                //         });
                //         // 刷新
                //         this.refreshTable_pageOne();
                //     }
                // }).catch(error => {});
            }).catch(error => {});
        },
        do_delete_multiple() {
            var ids = this._.map(this.$refs.table.getSelection(), "id");
            if (ids.length > 0) {
                this.do_delete(ids);
            } else {
                this.$message({
                    message: "请先勾选数据！",
                    type: "warning"
                });
            }
        },
        // 弹窗1
        dialog_1_open(mode, data) {

            if (mode == 1) {
                this.dialog_1.data = {
                    id: null,
                    name: "",
                    number: null,
                    gender: 0,
                    select1: null,
                    description: "",
                };
                this.dialog_1.readonly = false;
            } else if (mode == 2 || mode == 3) {
                this.dialog_1.data = {
                    id: data.id,
                    name: data.name,
                    number: null,
                    gender: data.gender,
                    select1: data.select1,
                    description: data.description,
                };
                this.dialog_1.readonly = (mode == 3);
            }
            this.dialog_1.mode = mode;
            this.dialog_1.visible = true;
            this.$nextTick(() => {
                this.$refs.dialog_1_ref.clearValidate();
            });
        },
        dialog_1_save() {
            this.$refs.dialog_1_ref.validate(valid => {
                if (valid) {
                    // 拼参数
                    let param = this._.cloneDeep(this.dialog_1.data);
                    if (this.dialog_1.mode == 1) {
                        console.log("新增");
                    } else if (this.dialog_1.mode == 2) {
                        console.log("编辑");
                    }
                    this.loading = true;
                    this.xAxios({
                        xJsonData: true,
                        // method: 'post',
                        url: BASE_PATH + '/example/fake_common.htmls',
                        data: param,
                        // params: param,
                    }).then((response) => {
                        const res = response.data;
                        if (res.code == 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            });
                            // 关闭弹窗
                            this.dialog_1.visible = false;
                            // 刷新
                            this.refreshTable_pageOne();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '操作失败！'
                            });
                        }
                        this.loading = false;
                    }).catch(error => {
                        this.loading = false;
                    });
                } else {
                    // 验证失败
                }
            });
        },
        // 弹窗2
        dialog_2_open(data) {
            this.dialog_2.visible = true;
            this.dialog_2.data.id = data.id;
            this.dialog_2.data.flag = null;
            this.dialog_2.data.reason = "";
            this.$nextTick(() => {
                this.$refs.dialog_2_ref.clearValidate();
            });
        },
        dialog_2_save() {
            this.$refs.dialog_2_ref.validate(valid => {
                if (valid) {
                    // 拼参数
                    let param = this._.cloneDeep(this.dialog_2.data);
                    console.log(param);
                    this.loading = true;
                    this.xAxios({
                        xJsonData: true,
                        // method: 'post',
                        url: BASE_PATH + '/example/fake_common.htmls',
                        data: param,
                        // params: param,
                    }).then((response) => {
                        const res = response.data;
                        if (res.code == 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            });
                            // 关闭弹窗
                            this.dialog_2.visible = false;
                            // 刷新
                            this.refreshTable_pageOne();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '操作失败！'
                            });
                        }
                        this.loading = false;
                    }).catch(error => {
                        this.loading = false;
                    });
                } else {
                    // 验证失败
                }
            });
        },
    }
};
</script>