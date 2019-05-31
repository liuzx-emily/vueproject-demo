const Sequelize = require('sequelize');
const sequelize = require("../../utils/initDatabase");

const BASIC_ATTRIBUTES = {
    id: {
        primaryKey: true,
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: "",
    },
    createTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        comment: "创建时间"
    },
    updateTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        comment: "修改时间"
    },
};
/*说明：
1 使用create方法时，依次触发 beforeValidate afterValidate beforeCreate beforeSave afterCreate afterSave
2 使用update方法时，依次触发 beforeValidate afterValidate beforeBulkUpdate afterBulkUpdate
*/
const BASIC_OPTIONS = {
    hooks: {
        beforeBulkCreate(instances, options) {
            // console.log(" -------------------------- beforeBulkCreate -------------------------- ", );
        },
        beforeBulkDestroy(options) {
            // console.log(" -------------------------- beforeBulkDestroy -------------------------- ", );
        },
        beforeBulkUpdate(options) {
            // console.log(" -------------------------- beforeBulkUpdate -------------------------- ", );
            /*
            为了实现每次更新时自动修改updateTime，先尝试在 beforeValidate 中修改updateTime的值，失败了。
            所以来这里尝试，成功了！
            */
            if (options.fields.indexOf("updateTime") == -1) {
                options.fields.push("updateTime");
            }
            options.attributes.updateTime = Date.now();
        },
        beforeValidate(instance, options) {
            // console.log(" -------------------------- beforeValidate -------------------------- ", );

            /*
            功能点一：为了实现创建的时候，自动给createTime和updateTime赋值。
            因为建立model的时候，设定createTime和updateTime都不能为空，所以要在数据验证之前，即 beforeValidate 中赋值。
            至于为什么下面的操作在update时不起作用，我也不知道。
            
            */
            instance.createTime = Date.now();
            instance.updateTime = Date.now();

            /*
            功能点二：为了实现每次更新时自动修改updateTime，先尝试在这里修改updateTime的值。
            因为调用update方法时，没有传入的字段会被放到options.skip中。所以先修改options.fields和options.skip。再添加update
            */
            // options.fields.push("updateTime");
            // options.skip.splice(options.skip.indexOf("updateTime"), 1);
            // instance.updateTime = Date.now();
            /*
            但是上面三行代码没有成功，原因未知。
            所以又去 beforeBulkUpdate 中尝试了。
            */

            /*
            找不同：
            create的时候，options.fields是model中全部的key。options.skip是[]。
            update的时候，options.fields是调用时传递的参数。options.skip是 [全部的-传递的参数]
            */
            // console.log(JSON.stringify(instance));
            // console.log(JSON.stringify(options));

        },
        afterValidate(instance, options) {
            // console.log(" -------------------------- afterValidate -------------------------- ", );
        },
        validationFailed(instance, options, error) {
            // console.log(" -------------------------- validationFailed -------------------------- ", );
        },
        beforeCreate(instance, options) {
            /*console.log(" -------------------------- beforeCreate -------------------------- ", );
            console.log(instance);
            console.log(" ------------------------- ");
            console.log(options);
            console.log(" ------------------------- ");*/
        },
        beforeDestroy(instance, options) {
            // console.log(" -------------------------- beforeDestroy -------------------------- ", );
        },
        beforeUpdate(instance, options) {
            // console.log(" -------------------------- beforeUpdate -------------------------- ", );
        },
        beforeSave(instance, options) {
            // console.log(" -------------------------- beforeSave -------------------------- ", );
        },
        beforeUpsert(values, options) {
            // console.log(" -------------------------- beforeUpsert -------------------------- ", );
        },
        afterCreate(instance, options) {
            // console.log(" -------------------------- afterCreate -------------------------- ", );
        },
        afterDestroy(instance, options) {
            // console.log(" -------------------------- afterDestroy -------------------------- ", );
        },
        afterUpdate(instance, options) {
            // console.log(" -------------------------- afterUpdate -------------------------- ", );
        },
        afterSave(instance, options) {
            // console.log(" -------------------------- afterSave -------------------------- ", );
        },
        afterUpsert(created, options) {
            // console.log(" -------------------------- afterUpsert -------------------------- ", );
        },
        afterBulkCreate(instances, options) {
            // console.log(" -------------------------- afterBulkCreate -------------------------- ", );
        },
        afterBulkDestroy(options) {
            // console.log(" -------------------------- afterBulkDestroy -------------------------- ", );
        },
        afterBulkUpdate(options) {
            // console.log(" -------------------------- afterBulkUpdate -------------------------- ", );
        },
    }
}
class EasyModelExample {
    constructor(param) {
        // name
        this.name = param.name;

        // attributes
        this.attributes = {};
        // 基础属性：id createTime updateTime
        for (let key in BASIC_ATTRIBUTES) {
            this.attributes[key] = BASIC_ATTRIBUTES[key];
        }
        // 可选属性：order description
        param.easyModelOptions = param.easyModelOptions || {};
        if (param.easyModelOptions.hasField_isDelete) {
            this.attributes.isDelete = {
                type: Sequelize.TINYINT,
                allowNull: false,
                comment: "0正常1删除",
                defaultValue: 0
            };
        }
        if (param.easyModelOptions.hasField_order) {
            this.attributes.order = {
                type: Sequelize.TINYINT,
                allowNull: true,
                comment: "排序字段"
            };
        }
        // 自定义属性
        for (let key in param.attributes) {
            this.attributes[key] = param.attributes[key];
        }
        // options
        this.options = {};
        for (let key in BASIC_OPTIONS) {
            this.options[key] = BASIC_OPTIONS[key];
        }
        for (let key in param.options) {
            this.options[key] = param.options[key];
        }

        // 
        this.init();

    }
    init() {
        this.model = sequelize.define(this.name, this.attributes, this.options);
    }

    getModel() {
        return this.model;
    }
}


module.exports = EasyModelExample;