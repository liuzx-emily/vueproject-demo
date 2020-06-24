const tools = {
	formattingDate(timestamp, pattern) {
		if (!timestamp) {
			return "";
		}
		var oDate = new Date(+timestamp);
		if (pattern === undefined || pattern == 1) {
			pattern = "yyyy-MM-dd";
		} else if (pattern == 2) {
			pattern = "yyyy-MM-dd hh:mm:ss";
		}
		pattern = pattern.replace(/yyyy/i, oDate.getFullYear());
		pattern = pattern.replace(/yy/gi, (oDate.getYear() % 100) > 9 ? (oDate.getYear() % 100).toString() : '0' + (oDate.getYear() % 100));
		var month = oDate.getMonth() + 1;
		pattern = pattern.replace(/MM/, month > 9 ? month.toString() : '0' + month);
		pattern = pattern.replace(/M/g, month);
		pattern = pattern.replace(/w|W/g, '日一二三四五六' [oDate.getDay()]);
		var date = oDate.getDate();
		pattern = pattern.replace(/dd/i, date > 9 ? date.toString() : '0' + date);
		pattern = pattern.replace(/d/gi, date);
		var hour = oDate.getHours();
		pattern = pattern.replace(/hh/i, hour > 9 ? hour.toString() : '0' + hour);
		pattern = pattern.replace(/h/ig, hour);
		var minute = oDate.getMinutes();
		pattern = pattern.replace(/mm/, minute > 9 ? minute.toString() : '0' + minute);
		pattern = pattern.replace(/m/g, minute);
		var second = oDate.getSeconds();
		pattern = pattern.replace(/ss/i, second > 9 ? second.toString() : '0' + second);
		pattern = pattern.replace(/s/ig, second);
		return pattern;
	},
	arrayToTree(dataArr, param) {
		param = param || {};
		const before_idkey = param.id || "id";
		const before_parentkey = param.parentId || "parentId";
		const after_childkey = param.children || "child";
		let tree = dataArr.filter((father) => {
			let branchArr = dataArr.filter((child) => {
				return father[before_idkey] == child[before_parentkey]
			});
			if (branchArr.length > 0) {
				father[after_childkey] = branchArr;
			}
			return !(dataArr.some(function(item) {
				return item[before_idkey] === father[before_parentkey];
			}));
		});
		return tree;
	},
	// 生成uuid（默认32位）
	uuid: (len = 32) => {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [];
		var i;
		if (len) {
			for (i = 0; i < len; i++) {
				uuid[i] = chars[0 | Math.random() * chars.length];
			}
		} else {
			var r;
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	},
};
export default tools;