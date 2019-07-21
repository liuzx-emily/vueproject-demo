const getLevelOneList = async (ctx, next) => {
	const models = ctx.xglobal.models;
	//
	let result = await models.district.findAll({ where: { parentId: 0 } });
	ctx.response.body = { code: 1, data: result, };
};

const getByParentCode = async (ctx, next) => {
	const models = ctx.xglobal.models;
	//
	let parentCode = ctx.requestparam.parentCode;
	let parentEle = await models.district.findOne({ where: { code: parentCode } });
	let parentId = parentEle.id;
	let result = await models.district.findAll({ where: { parentId: parentId } });
	ctx.response.body = { code: 1, data: result, };
};

const getByParentName = async (ctx, next) => {
	const models = ctx.xglobal.models;
	//
	let parentName = ctx.requestparam.parentName;
	let parentEle = await models.district.findOne({ where: { name: parentName } });
	let parentId = parentEle.id;
	let result = await models.district.findAll({ where: { parentId: parentId } });
	ctx.response.body = { code: 1, data: result, };
};

module.exports = [
	{ method: 'GET', url: "/district/getLevelOneList.do", function: getLevelOneList },
	{ method: 'GET', url: "/district/getByParentCode.do", function: getByParentCode },
	{ method: 'GET', url: "/district/getByParentName.do", function: getByParentName },
]