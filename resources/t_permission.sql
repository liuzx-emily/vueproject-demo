/*
 Navicat Premium Data Transfer

 Source Server         : localhost密码root
 Source Server Type    : MySQL
 Source Server Version : 50548
 Source Host           : localhost:3306
 Source Schema         : vueproject

 Target Server Type    : MySQL
 Target Server Version : 50548
 File Encoding         : 65001

 Date: 04/11/2019 15:28:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `parentId` int(11) NOT NULL COMMENT '父级id',
  `type` tinyint(4) NOT NULL COMMENT '1导航(无内容) 2菜单 3按钮 4页面跳转链接',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'url或者code值',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'icon',
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '描述',
  `order` tinyint(4) NULL DEFAULT NULL COMMENT '排序字段',
  `isDelete` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0正常1删除',
  `createTime` bigint(20) NOT NULL COMMENT '创建时间',
  `updateTime` bigint(20) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 75 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_permission
-- ----------------------------
INSERT INTO `t_permission` VALUES (1, '系统管理', 0, 1, '/system', 'gears', '', 12, 0, 1557027428395, 1557195832417);
INSERT INTO `t_permission` VALUES (2, '部门管理', 1, 2, '/system/dept', NULL, '', 2, 0, 1557027515408, 1559115267859);
INSERT INTO `t_permission` VALUES (3, '人员管理', 1, 2, '/system/deptAndUser', NULL, '', 1, 0, 1557027775223, 1559117133846);
INSERT INTO `t_permission` VALUES (4, '角色管理', 1, 2, '/system/role', NULL, '', 3, 0, 1557028216406, 1557028216406);
INSERT INTO `t_permission` VALUES (5, '权限管理', 1, 2, '/system/permission', NULL, '', 4, 0, 1557110406100, 1557372291268);
INSERT INTO `t_permission` VALUES (31, '文章管理', 0, 2, '/article', 'book', '', 11, 0, 1557191389360, 1557195837762);
INSERT INTO `t_permission` VALUES (45, '新增', 2, 3, 'dept:btn:add', '', '', 1, 0, 1559099231635, 1559099231635);
INSERT INTO `t_permission` VALUES (46, '编辑', 2, 3, 'dept:btn:edit', '', '', 2, 0, 1559099266232, 1559099266232);
INSERT INTO `t_permission` VALUES (47, '查看', 2, 3, 'dept:btn:look', '', '', 3, 0, 1559099277544, 1559099277544);
INSERT INTO `t_permission` VALUES (48, '删除', 2, 3, 'dept:btn:delete', '', '', 4, 0, 1559099288353, 1559099288353);
INSERT INTO `t_permission` VALUES (49, '新增', 3, 3, 'user:btn:add', '', '', 1, 0, 1559099653124, 1559099653124);
INSERT INTO `t_permission` VALUES (50, '编辑', 3, 3, 'user:btn:edit', '', '', 2, 0, 1559099666990, 1559099666990);
INSERT INTO `t_permission` VALUES (51, '查看', 3, 3, 'user:btn:look', '', '', 3, 0, 1559099676728, 1559099676728);
INSERT INTO `t_permission` VALUES (52, '删除', 3, 3, 'user:btn:delete', '', '', 4, 0, 1559099691591, 1559099691591);
INSERT INTO `t_permission` VALUES (53, '新增', 4, 3, 'role:btn:add', '', '', 1, 0, 1559099728861, 1559099728861);
INSERT INTO `t_permission` VALUES (54, '编辑', 4, 3, 'role:btn:edit', '', '', 2, 0, 1559099737543, 1559099737543);
INSERT INTO `t_permission` VALUES (55, '查看', 4, 3, 'role:btn:look', '', '', 3, 0, 1559099746585, 1559099746585);
INSERT INTO `t_permission` VALUES (56, '删除', 4, 3, 'role:btn:delete', '', '', 4, 0, 1559099757926, 1559099757926);
INSERT INTO `t_permission` VALUES (57, '新增', 5, 3, 'permission:btn:add', '', '', 1, 0, 1559099791709, 1559099791709);
INSERT INTO `t_permission` VALUES (58, '编辑', 5, 3, 'permission:btn:edit', '', '', 2, 0, 1559099800423, 1559099800423);
INSERT INTO `t_permission` VALUES (59, '查看', 5, 3, 'permission:btn:look', '', '', 3, 0, 1559099810440, 1559099810440);
INSERT INTO `t_permission` VALUES (60, '删除', 5, 3, 'permission:btn:delete', '', '', 4, 0, 1559099821324, 1559099821324);
INSERT INTO `t_permission` VALUES (61, '新增', 31, 3, 'article:btn:add', '', '', 1, 0, 1559122007950, 1559122007950);
INSERT INTO `t_permission` VALUES (62, '编辑', 31, 3, 'article:btn:edit', '', '', 2, 0, 1559122026122, 1559122026122);
INSERT INTO `t_permission` VALUES (63, '查看', 31, 3, 'article:btn:look', '', '', 3, 0, 1559122042650, 1559122042650);
INSERT INTO `t_permission` VALUES (64, '删除', 31, 3, 'article:btn:delete', '', '', 4, 0, 1559122062242, 1559122062242);
INSERT INTO `t_permission` VALUES (65, '审核', 31, 3, 'article:btn:audit', '', '', 5, 0, 1559194644356, 1559194644356);
INSERT INTO `t_permission` VALUES (73, '门户', 0, 4, './portal.html', 'fire', '', 21, 0, 1572851034425, 1572851601550);
INSERT INTO `t_permission` VALUES (74, '注册', 0, 4, './register.html', 'fire', '', 22, 0, 1572851536431, 1572851604958);

SET FOREIGN_KEY_CHECKS = 1;
