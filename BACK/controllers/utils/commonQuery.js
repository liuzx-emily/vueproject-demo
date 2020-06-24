const sequelize = require("../../initialization/connectDatabase");

const query = async (str) => {
  return await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
};

const rawquery = async (params, skeleton, { isCount, isOne } = {}) => {
  let str_attriutes = getStr_attriutes(params.attributes);
  let str_where = getStr_where(params.whereParam);
  let str_paging = getStr_paging(params.pagingParam);
  if (isCount) {
    let str_attriutes = "count(*)";
    let str = skeleton({ str_attriutes, str_where, str_paging: "" });
    let result = await query(str);
    return result[0][str_attriutes];
  } else if (isOne) {
    let str = skeleton({ str_attriutes, str_where, str_paging });
    let result = await query(str);
    return result[0];
  } else {
    let str = skeleton({ str_attriutes, str_where, str_paging });
    let result = await query(str);
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

const getStr_attriutes = (attributesList) => {
  return attributesList.map(attribute => `t.${attribute}`).join(",");
};

const getStr_where = (whereParam) => {
  let arr_where = [];
  for (let prop in whereParam) {
    let value = whereParam[prop];
    if (typeof value == 'object') {
			/*注意：
			Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
			但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
			*/
      let symbolList = Object.getOwnPropertySymbols(value);
      symbolList.forEach(symbol => {
        // nodejs 不支持 symbol.description，只能用 toString 判断
        switch (symbol.toString()) {
          case "Symbol(not)":
            arr_where.push(`t.${prop} != '${value[symbol]}'`);
            break;
          case "Symbol(like)":
            arr_where.push(`t.${prop} LIKE '${value[symbol]}'`);
            break;
          case "Symbol(gte)":
            arr_where.push(`t.${prop} >= '${value[symbol]}'`);
            break;
          case "Symbol(lte)":
            arr_where.push(`t.${prop} <= '${value[symbol]}'`);
            break;
        }
      });
    } else {
      arr_where.push(`t.${prop}='${value}'`);
    }
  }
  let str_where = arr_where.length > 0 ? (" WHERE " + arr_where.join(" and ")) : "";
  return str_where;
}

const getStr_paging = (pagingParam) => {
  let str_paging = "";
  if (pagingParam) {
    let page = parseInt(pagingParam.page);
    let row = parseInt(pagingParam.row);
    str_paging = `LIMIT ${(page - 1) * row},${row}`;
  }
  return str_paging;
}

module.exports = {
  query,
  detail: rawquery_one,
  list: rawquery_list,
  listwithpaging: rawquery_listwithpaging,
};