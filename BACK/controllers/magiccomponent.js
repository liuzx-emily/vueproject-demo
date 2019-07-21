const attributes = ['id', "parentId", "contentId", "x", "y", "width", "height", "title", "content", "backgroundType", "backgroundColor",
	"backgroundImgUrl", "borderRadius", "borderStyle", "borderColor", "borderWidth",
];



const findAll = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	const contentId = ctx.requestparam.contentId;
	let data = await models.magiccomponent.findAll({
		attributes: attributes,
		where: { contentId: contentId }
	});
	ctx.response.body = { code: 1, data: data, };
};

const saveAll = async (ctx, next) => {
	const models = ctx.xglobal.models;
	// 
	const contentId = ctx.requestparam.contentId;
	// 删除所有
	await models.magiccomponent.destroy({ where: { contentId: contentId } });
	// 存储所有
	let list = ctx.requestparam.list;
	await save(list, "0", contentId);
	ctx.response.body = { code: 1, };
};

const save = async (list, parentId, contentId) => {
	const models = ctx.xglobal.models;
	// 
	list = list || [];
	for (let i = 0; i < list.length; i++) {
		let data = list[i];
		if (!data.isDelete) {
			let param = {};
			attributes.map(key => {
				if (data[key]) {
					param[key] = data[key];
				}
			});
			const id = ctx.xtools.randomId();
			param.id = id;
			param.parentId = parentId;
			param.contentId = contentId;
			await models.magiccomponent.create(param);
			await save(data.list, id, contentId);
		}
	}
};

const save2 = async (data, parentId, contentId) => {
	const models = ctx.xglobal.models;
	// 
	let param = {};
	attributes.map(key => {
		if (data[key]) {
			param[key] = data[key];
		}
	});
	param.id = ctx.xtools.randomId();
	param.parentId = parentId;
	param.contentId = contentId;
	await models.magiccomponent.create(param);
	data.list = data.list || [];
	for (let i = 0; i < data.list.length; i++) {
		await save(data.list[i], param.id, contentId);
	}
};

module.exports = [
	{ method: 'GET', url: "/magiccomponent/list.do", function: findAll },
	{ method: 'POST', url: "/magiccomponent/saveAll.do", function: saveAll },
];