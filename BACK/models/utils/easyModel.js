const Sequelize = require('sequelize');

const BASIC_ATTRIBUTES = {
  id: {
    primaryKey: true,
    type: Sequelize.STRING(50),
    allowNull: false,
    comment: "",
  },
  isDelete: {
    type: Sequelize.TINYINT,
    allowNull: false,
    comment: "0正常1删除",
    defaultValue: 0
  },
  order: {
    type: Sequelize.TINYINT,
    allowNull: true,
    comment: "排序字段"
  },
  createTime: {
    type: Sequelize.BIGINT,
    allowNull: true,
    comment: "创建时间"
  },
  updateTime: {
    type: Sequelize.BIGINT,
    allowNull: true,
    comment: "修改时间"
  },
};
/*说明：
1 create : beforeValidate -> [validate] -> afterValidate -> beforeCreate -> beforeSave -> [create] -> afterCreate -> afterSave
2 update : beforeValidate -> afterValidate -> beforeUpdate -> beforeSave -> beforeValidate -> afterValidate -> afterUpdate -> afterSave
*/
const BASIC_OPTIONS = {
  hooks: {
    beforeValidate(instance, options) {
      console.log(" -------------------------- beforeValidate -------------------------- ");
    },
    afterValidate(instance, options) {
      console.log(" -------------------------- afterValidate -------------------------- ");
    },
    validationFailed(instance, options, error) {
      console.log(" -------------------------- validationFailed -------------------------- ");
    },
    beforeCreate(instance, options) {
      console.log(" -------------------------- beforeCreate -------------------------- ");
      /* 为了实现创建的时候，自动给 createTime 和 updateTime 赋值。
        因为是在 beforeCreate 中才给这两个字段赋值，而到达 beforeCreate 前要先经过 validate 。为了能够顺利通过 validate，要将这两个字段设置为 allowNull: true 
      */
      instance.createTime = Date.now();
      instance.updateTime = Date.now();
    },
    beforeDestroy(instance, options) {
      console.log(" -------------------------- beforeDestroy -------------------------- ");
    },
    beforeUpdate(instance, options) {
      console.log(" -------------------------- beforeUpdate -------------------------- ");
      /* 为了实现更新的时候，自动给 updateTime 赋值。
        因为是在 beforeUpdate 中才给字段赋值，而到达 beforeUpdate 前要先经过 validate 。为了能够顺利通过 validate，要将字段设置为 allowNull: true
        update的时候，options.fields是调用时传递的参数。options.skip是 [全部的-传递的参数]
     */
      instance.updateTime = Date.now();
      options.fields.push("updateTime");/* update 时必须向 options.fields 中手动添加 updateTime，不然即使设置了 instance.updateTime 也不会生效。这一点和 create 中不同*/
    },
    beforeSave(instance, options) {
      console.log(" -------------------------- beforeSave -------------------------- ");
    },
    afterCreate(instance, options) {
      console.log(" -------------------------- afterCreate -------------------------- ");
    },
    afterDestroy(instance, options) {
      console.log(" -------------------------- afterDestroy -------------------------- ");
    },
    afterUpdate(instance, options) {
      console.log(" -------------------------- afterUpdate -------------------------- ");
    },
    afterSave(instance, options) {
      console.log(" -------------------------- afterSave -------------------------- ");
    },
  }
}
class EasyModelExample {
  constructor(param) {
    // name
    this.name = param.name;
    if (param.clean) {
      // attributes 
      this.attributes = param.attributes;
      // options
      this.options = param.options;
    } else {
      // attributes 
      this.attributes = { ...BASIC_ATTRIBUTES, ...param.attributes };
      const easyModelOptions = param.easyModelOptions || {};
      if (easyModelOptions.noField_isDelete) {
        delete this.attributes.isDelete;
      }
      if (easyModelOptions.noField_order) {
        delete this.attributes.order;
      }
      // options
      this.options = { ...BASIC_OPTIONS, ...param.options };
    }
  }
  register(sequelize) {
    return sequelize.define(this.name, this.attributes, this.options);
  }
}


module.exports = EasyModelExample;