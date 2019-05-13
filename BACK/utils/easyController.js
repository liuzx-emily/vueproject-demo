const Op = require('sequelize').Op;
const uuid = require("uuid/v4")

class EasyControllerExample {
    constructor(model, options) {
        this.model = model;
        this.options = {
            NeedCheckIsDelete: options.NeedCheckIsDelete,
            attributes: options.attributes
        };
    }

    async findAll(ctx, next) {
        let whereParam = ctx.query;
        if (this.options.NeedCheckIsDelete) {
            whereParam.isDelete = 0;
        }
        await this.model.findAll({
            attributes: this.options.attributes,
            where: whereParam,
            order: [
                ['order', 'DESC']
            ],
        }).then(data => {
            processReadAction(data, ctx);
        }).catch(err => {
            processErr(err, ctx);
        });
    }

    async findByPk(ctx, next) {
        let id = ctx.query.id;
        let whereParam = {};
        if (this.options.NeedCheckIsDelete) {
            whereParam.isDelete = 0;
        }
        await this.model.findByPk(id, {
            attributes: this.options.attributes,
            where: whereParam,
        }).then(data => {
            processReadAction(data, ctx);
        }).catch(err => {
            processErr(err, ctx);
        });
    }

    async create(ctx, next) {
        // 取参数
        let param = ctx.request.body;
        param.id = uuid();
        await this.model.create(param).then(data => {
            // console.log(res);
            processWriteAction(data, ctx);
        }).catch(err => {
            processErr(err, ctx);
        });
    }

    async update(ctx, next) {
        let param = ctx.request.body;
        let whereParam = {
            id: param.id,
        };
        if (this.options.NeedCheckIsDelete) {
            whereParam.isDelete = 0;
        }
        await this.model.update(param, {
            where: whereParam
        }).then(data => {
            processWriteAction(data, ctx);
        }).catch(err => {
            processErr(err, ctx);
        });
    }
    // 物理删除
    async destroy(ctx, next) {
        let whereParam = {
            id: {
                [Op.in]: ctx.request.body.id,
            }
        };
        if (this.options.NeedCheckIsDelete) {
            whereParam.isDelete = 0;
        }
        await this.model.destroy({
            where: whereParam
        }).then(data => {
            processWriteAction(data, ctx);
        }).catch(err => {
            processErr(err, ctx);
        });
    }
    // 逻辑删除
    async destroyLogically(ctx, next) {
        let whereParam = {
            id: {
                [Op.in]: ctx.request.body.id,
            }
        };
        if (this.options.NeedCheckIsDelete) {
            whereParam.isDelete = 0;
        }
        await this.model.update({ isDelete: 1 }, {
            where: whereParam
        }).then(data => {
            processWriteAction(data, ctx);
        }).catch(err => {
            processErr(err, ctx);
        });
    }
}

const processErr = (err, ctx) => {
    console.log(err);
    ctx.response.body = { code: -1 };
};
const processReadAction = (data, ctx) => {
    ctx.response.body = { code: 1, data: data };
};
const processWriteAction = (data, ctx) => {
    if (data) {
        ctx.response.body = { code: 1, };
    } else {
        ctx.response.body = { code: 0, };
    }
};

module.exports = EasyControllerExample;