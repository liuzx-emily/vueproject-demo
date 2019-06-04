const name = "file";

const Op = require('sequelize').Op;
const models = require("../../utils/scanModels");

const MainModel = models[name];

const fs = require("fs");
const path = require("path");

const getFileRecord = async ({ fileIds, fileId }) => {
    if (fileIds) {
        const recordList = await MainModel.findAll({
            where: {
                id: {
                    [Op.in]: fileIds,
                },
            }
        });
        return recordList;
    } else {
        const record = await MainModel.findOne({ where: { id: fileId } });
        return record;
    }
};

const deleteFile = async (fileIds) => {
    // 删除物理文件
    const fileRecords = await getFileRecord({ fileIds });
    fileRecords.forEach(file => { fs.unlinkSync(file.path); });
    // 删除表记录
    await MainModel.destroy({
        where: {
            id: {
                [Op.in]: fileIds,
            },
        }
    });
};

module.exports = { getFileRecord, deleteFile };