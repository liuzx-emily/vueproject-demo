const Sequelize = require('sequelize');

const EasyModelExample = require("./utils/easyModel");

let attributes = {
  // 这里的id会覆盖easyModel中的默认添加的id
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
    comment: "名称",
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: "父级id",
  },
  showInNavigation: {
    type: Sequelize.TINYINT,
    allowNull: false,
    comment: "是否在导航中显示 0不显示 1显示",
  },
  isExternalLink: {
    type: Sequelize.TINYINT,
    allowNull: false,
    comment: "是否为外部链接 0不是 1是（仅在showInNavigation为1时有效）",
  },
  code: {
    type: Sequelize.STRING(255),
    allowNull: false,
    comment: "url或者code值",
  },
  icon: {
    type: Sequelize.STRING(255),
    allowNull: true,
    comment: "icon（仅在showInNavigation为1时有效）",
  },
  description: {
    // Unlimited length TEXT column
    type: Sequelize.TEXT,
    allowNull: true,
    comment: "描述",
  },
};

const model = new EasyModelExample({
  name: "permission",
  attributes: attributes,
  options: {
    tableName: "t_permission",
  },
  easyModelOptions: {},
});

module.exports = model;