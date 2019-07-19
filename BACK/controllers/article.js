const name = "article";
const attributes = ["id", "title", "publisher", "publishTime", "content", "state", "reason"];

const uuid = require("uuid/v4");
const models = require("../utils/scanModels");
const fileUtils = require("./utils/fileUtils.js");

const getStr = (strparams) => {
	return str = `
		SELECT
			${strparams.str_attriutes}
		FROM
			t_article t
		${strparams.str_where}
		ORDER BY t.publishTime DESC
		${strparams.str_paging}
	`;
};


const findAll = async (ctx, nect) => {
	const Op = ctx.Op;
	// ---------------------------------------------- whereParam
	let whereParam = { isDelete: 0, };
	if (ctx.requestparam.title) {
		whereParam.title = {
			[Op.like]: '%' + ctx.requestparam.title + '%',
		};
	}
	if (ctx.requestparam.publisher) {
		whereParam.publisher = {
			[Op.like]: '%' + ctx.requestparam.publisher + '%',
		};
	}
	if (ctx.requestparam.startTime) {
		whereParam.publishTime = whereParam.publishTime || {};
		whereParam.publishTime[Op.gte] = ctx.requestparam.startTime;
	}
	if (ctx.requestparam.endTime) {
		whereParam.publishTime = whereParam.publishTime || {};
		whereParam.publishTime[Op.lte] = ctx.requestparam.endTime;
	}
	if (ctx.requestparam.state && ctx.requestparam.state != "-1") {
		whereParam.state = ctx.requestparam.state;
	}
	let { data, count } = await ctx.rawquery_tablewithpaging({ ctx, whereParam, attributes, getStr, });
	ctx.response.body = { code: 1, data: data, count: count, };
};

const findByPk = async (ctx, next) => {
	const articleId = ctx.requestparam.id;
	let whereParam = { isDelete: 0, id: articleId };
	let data = await ctx.rawquery_id({ ctx, whereParam, attributes, getStr, });
	// 取附件
	const str_file = `
    SELECT
        tf.id,
        tf.name
    FROM
        t_file tf
        LEFT JOIN t_article_file taf ON tf.id = taf.fileId 
    WHERE
        taf.articleId = "${articleId}"`;
	let fileList = await ctx.sequelize.query(str_file, { type: ctx.sequelize.QueryTypes.SELECT });
	data.fileList = fileList;
	ctx.response.body = { code: 1, data: data, };
};

const create = async (ctx, next) => {
	// 取参数
	const articleId = uuid();
	let param = ctx.requestparam;
	param.id = articleId;
	await models.article.create(param);
	// 存附件
	const fileList = param.fileList;
	if (fileList) {
		const bulkCreateList = fileList.map(fileId => {
			return {
				articleId: articleId,
				fileId: fileId
			}
		})
		await models.article_file.bulkCreate(bulkCreateList);
	}
	ctx.response.body = { code: 1, };
};


const update = async (ctx, next) => {
	let param = ctx.requestparam;
	const articleId = param.id;
	let whereParam = { isDelete: 0, id: articleId, };
	await models.article.update(param, { where: whereParam });
	// 存附件
	await models.article_file.destroy({ where: { articleId: articleId } });
	const fileList = param.fileList;
	if (fileList) {
		const bulkCreateList = fileList.map(fileId => {
			return {
				articleId: articleId,
				fileId: fileId
			}
		})
		await models.article_file.bulkCreate(bulkCreateList);
	}
	ctx.response.body = { code: 1, };
};

const destroyLogically = async (ctx, next) => {
	const Op = ctx.Op;
	const articleIds = ctx.requestparam.ids;
	let whereParam = {
		id: {
			[Op.in]: articleIds,
		},
		isDelete: 0
	};
	await models.article.update({ isDelete: 1 }, { where: whereParam });
	// 删附件
	const fileIds = await models.article_file.findAll({
		where: {
			articleId: {
				[Op.in]: articleIds,
			},
		}
	}).map(file => file.fileId);
	await fileUtils.deleteFile(fileIds);
	// 删关联表
	await models.article_file.destroy({
		where: {
			articleId: {
				[Op.in]: articleIds,
			},
		}
	});
	ctx.response.body = { code: 1, };
};

const audit = async (ctx, next) => {
	let params = ctx.requestparam;
	let state = params.audit ? 3 : 4;
	let reason = params.audit ? "" : params.reason;
	await models.article.update({ state: state, reason: reason }, { where: { id: params.id } });
	ctx.response.body = { code: 1, };
};

module.exports = [
	{ method: 'POST', url: `/${name}/audit.do`, function: audit },
	// 
	{ method: 'GET', url: `/${name}/list.do`, function: findAll },
	{ method: 'GET', url: `/${name}/detail.do`, function: findByPk },
	{ method: 'POST', url: `/${name}/add.do`, function: create },
	{ method: 'POST', url: `/${name}/edit.do`, function: update },
	{ method: 'POST', url: `/${name}/delete.do`, function: destroyLogically },
];