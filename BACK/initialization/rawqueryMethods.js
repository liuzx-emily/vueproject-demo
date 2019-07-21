const sequelize = require("./connectDatabase");

const rawqueryUtils = require("./utils/rawqueryUtils");

const basequery = async (str) => {
	return await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
};
const rawquery = async (params, getStr, { isCount, isOne } = {}) => {
	let { str_attriutes, str_where, str_paging } = rawqueryUtils.getStr(params);
	if (isCount) {
		let str_attriutes = "count(*)";
		let str = getStr({ str_attriutes, str_where, str_paging: "" });
		let result = await basequery(str);
		return result[0][str_attriutes];
	} else if (isOne) {
		let str = getStr({ str_attriutes, str_where, str_paging });
		let result = await basequery(str);
		return result[0];
	} else {
		let str = getStr({ str_attriutes, str_where, str_paging });
		let result = await basequery(str);
		return JSON.parse(JSON.stringify(result));
	}
};
const rawquery_one = async (params, getStr) => {
	let data = await rawquery(params, getStr, { isOne: true });
	return data;
};
const rawquery_list = async (params, getStr) => {
	let data = await rawquery(params, getStr);
	return data;
};
const rawquery_listwithpaging = async (params, getStr) => {
	let data = await rawquery(params, getStr);
	let count = await rawquery(params, getStr, { isCount: true });
	return { data, count };
};


module.exports = {
	basequery,
	rawquery,
	rawquery_one,
	rawquery_list,
	rawquery_listwithpaging,
};