<template>
  <el-date-picker
    v-model="year"
    type="year"
    :picker-options="yearPickerOption"
    :style="pickerStyle"
  ></el-date-picker>
</template>
<script>
export default {
  props: {
    // 初始值，字符串"2017"
    value: {
      default: null
    },
    // 宽度
    width: {
      type: String,
      default: "200px"
    },
    // 参数：默认选中当前年份？（如果有初始值，则本参数不生效）
    defaultPickCurrentYear: {
      type: Boolean,
      default: true
    },
    // 参数：不能选择未来的年份？
    cannotBeFuture: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value() {
      this.set(this.value);
    }
  },
  data() {
    let year = null;
    if (this.value) {
      this.set(this.value);
    } else {
      if (this.defaultPickCurrentYear) {
        year = new Date();
      }
    }

    let yearPickerOption = {};
    // 不能是未来！
    if (this.cannotBeFuture) {
      yearPickerOption = {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      };
    }
    return {
      year: year,
      yearPickerOption: yearPickerOption
    };
  },
  computed: {
    pickerStyle() {
      return {
        width: this.width
      };
    }
  },
  methods: {
    // 传入字符串：""或者"2019"
    set(value) {
      if (value) {
        let date = new Date();
        date.setFullYear(this.value);
        this.year = date;
      } else {
        this.year = null;
      }
    },
    // 返回字符串：""或者"2019"
    get() {
      if (this.year) {
        return this.year.getFullYear();
      } else {
        return "";
      }
    }
  }
};
</script>

