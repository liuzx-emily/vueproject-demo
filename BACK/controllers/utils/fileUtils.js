const fs = require("fs");

const getFileRecord = async (ctx, { fileIds, fileId }) => {
	const models = ctx.xglobal.models;
	const Op = ctx.xglobal.Op;
	//
	if (fileIds) {
		const recordList = await models.file.findAll({
			where: {
				id: {
					[Op.in]: fileIds,
				},
			}
		});
		return recordList;
	} else {
		const record = await models.file.findOne({ where: { id: fileId } });
		return record;
	}
};

const deleteFile = async (ctx, fileIds) => {
	const models = ctx.xglobal.models;
	const Op = ctx.xglobal.Op;
	//
	// 删除物理文件
	const fileRecords = await getFileRecord(ctx, { fileIds });
	fileRecords.forEach(file => { fs.unlinkSync(file.path); });
	// 删除表记录
	await models.file.destroy({
		where: {
			id: {
				[Op.in]: fileIds,
			},
		}
	});
};

module.exports = { getFileRecord, deleteFile };