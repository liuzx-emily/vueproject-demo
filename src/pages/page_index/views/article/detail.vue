<style lang="scss" scoped>
.box-with-shadow{
    max-width: 1200px;
    padding-right:30px;
    padding-bottom: 40px;
}
.fake-form-box {
  margin-bottom: 22px;
}
.fake-form-box-txt {
  display: inline-block;
  width: 100px;
  text-align: right;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  float: left;
  box-sizing: border-box;
}
.fake-form-box-content {
  margin-left: 100px;
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
/*审核未通过原因*/
.auditfail-reason-box {
    margin-left: 62px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #ff5722;
}
</style>
<template>
  <section v-loading.fullscreen.lock="loading" element-loading-background="rgba(0,0,0,0.05)">
    <!-- 返回 -->
    <section style="margin:10px 0 10px;">
      <el-button type="text" icon="el-icon-arrow-left" @click="goBack" style="margin-right:50px;">返回</el-button>
      <!-- 新增、编辑： 保存、提交-->
      <template v-if="mode==1||mode==2">
        <el-button size="medium" type="success" @click="do_save(3)">保存</el-button>
        <el-button size="medium" type="primary" @click="do_save(0)">提交</el-button>
      </template>
      <!-- 查看：无操作按钮 -->
      <!-- 审核：审核通过、审核不通过 -->
      <template v-if="mode==4">
        <el-button size="medium" type="success" @click="do_review_yes">审核通过</el-button>
        <el-button size="medium" type="warning" @click="do_review_no">审核不通过</el-button>
      </template>
    </section>
    <section class="box-with-shadow">
      <div
        class="auditfail-reason-box"
        v-if="this.dialogData.audit==2"
      >审核未通过，原因：{{dialogData.reason}}</div>
      <el-form
        ref="dialogForm1"
        label-width="100px"
        :model="dialogData"
        :rules="dialogRule1"
        style="width:95%"
        @submit.native.prevent
        :disabled="readOnly"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="dialogData.title"></el-input>
        </el-form-item>
        <el-form-item label="发布人" prop="publisher" style="display:inline-block;width:50%;">
          <el-input v-model="dialogData.publisher"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="time" style="display:inline-block;width:50%;">
          <el-date-picker
            v-model="dialogData.time"
            type="date"
            value-format="timestamp"
            style="width:140px;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="fake-form-box">
        <span class="fake-form-box-txt">附件</span>
        <div class="fake-form-box-content">
          <xUploadAttachment
            :orginallist="dialogData.list"
            ref="xUploadAttachment"
            :inlineMode="true"
            :readOnly="mode==3||mode==4"
          />
        </div>
      </div>
      <div>
        <span class="fake-form-box-txt">内容</span>
        <div class="fake-form-box-content">
          <xEditor ref="xEditor" :readOnly="readOnly"/>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  components: { },
  data() {
    return {
      loading: false,
      dialogData: {
        title: "",
        publisher: "",
        time: "",
        list: [],
        content: "",
        audit: 0
      },
      dialogRule1: {
        title: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: ["blur", "change"]
          }
        ],
        publisher: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: ["blur", "change"]
          }
        ],
        time: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ]
      }
    };
  },
  computed: {
    mode() {
      return this.$route.params.mode;
    },
    readOnly() {
      return this.mode == 3 || this.mode == 4;
    },
    articleId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    if (this.mode != 1) {
      this.getData();
    }
  },
  methods: {
    goBack() {
      // 1列表 2文章页面
      this.$router.push("/article");
    },
    getData() {
      this.loading = true;
      this.xAxios({
        method: "get",
        url: BASE_PATH + "/article/detail.htmls",
        params: {
          id: this.articleId
        }
      })
        .then(response => {
          const res = response.data;
          this.dialogData = _.cloneDeep(res.data);
          this.$refs.xEditor.setContent(this.dialogData.content);
          this.loading = false;
        })
        .catch(error => {});
    },
    // 1提交、0保存
    do_save(submitStatus) {
      // submitStatus 0提交 3保存
      if (submitStatus == 0) {
        this.$confirm("提交后信息无法再次更改，确定提交吗？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.save(submitStatus);
          })
          .catch(error => {});
      } else {
        this.save(submitStatus);
      }
    },
    // 保存
    save(submitStatus) {
      let param = _.cloneDeep(this.dialogData);
      // 文章id
      param.id = this.articleId;
      // 内容
      param.content = this.$refs.xEditor.getContent();
      // 附件
      let file = this.$refs.xUploadAttachment.fileList;
      param.list = _.map(file, "id");
      // 审核状态
      // 在审核不通过(audit == 2)时，点击保存(submitStatus == 3)，审核状态还是"审核不通过"
      if (this.dialogData.audit == 2 && submitStatus == 3) {
        param.audit = 2;
      } else {
        param.audit = submitStatus;
      }
      this.$refs.dialogForm1.validate(valid => {
        if (valid) {
          // 附件和内容至少填一个
          if (
            this.$refs.xEditor.checkContentIsNotNull() === false &&
            param.list.length == 0
          ) {
            this.$message({
              message: "内容和附件不能同时为空！",
              type: "warning",
              showClose: true
            });
            return;
          }
          this.loading = true;
          this.xAxios({
            xJsonData: true,
            url:
              BASE_PATH + `/article/${this.mode == 1 ? "add" : "edit"}.htmls`,
            data: param
          })
            .then(response => {
              const res = response.data;
              // 数据格式化
              if (res.code == 1) {
                this.$message({
                  type: "success",
                  message: "操作成功！"
                });
                // 返回列表页
                _.delay(() => {
                  // alert("注释了！");
                  this.$parent.type = 1;
                }, 1500);
              }
            })
            .catch(error => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    // 审核通过
    do_review_yes() {
      this.$confirm("您确认审核通过吗？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = {
            id: this.articleId,
            audit: 1
          };
          this.loading = true;
          this.xAxios({
            method: "post",
            url: BASE_PATH + "/article/audit.htmls",
            data: param
          })
            .then(response => {
              const res = response.data;
              if (res.code == 1) {
                this.loading = true;
                this.$message({
                  type: "success",
                  message: "操作成功！"
                });
                _.delay(() => {
                  this.$parent.type = 1;
                }, 1500);
              }
              this.loading = false;
            })
            .catch(error => {
              this.loading = false;
            });
        })
        .catch(error => {
          this.loading = false;
        });
    },
    // 审核不通过
    do_review_no() {
      this.$prompt("请输入审核不通过的原因", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea"
      })
        .then(({ value }) => {
          let param = {
            id: this.articleId,
            audit: 2,
            reason: value
          };
          this.loading = true;
          this.xAxios({
            method: "post",
            url: BASE_PATH + "/article/audit.htmls",
            data: param
          })
            .then(response => {
              const res = response.data;
              if (res.code == 1) {
                this.loading = true;
                this.$message({
                  type: "success",
                  message: "操作成功！"
                });
                _.delay(() => {
                  this.$parent.type = 1;
                }, 1500);
              }
              this.loading = false;
            })
            .catch(error => {
              this.loading = false;
            });
        })
        .catch(() => {
          // this.$message({
          //     type: 'info',
          //     message: '取消输入'
          // });
        });
    }
  }
};
</script>*/