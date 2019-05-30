import _ from 'lodash';

export default {
    // 保留几位小数？
    accurateToDecimalPlace(value, len = 2) {
        // "0.72459" => 0.72459
        value = parseFloat(value);
        // 0.72459 => "0.72"
        value = value.toFixed(len);
        // "0.72" => 0.72
        value = parseFloat(value);
        return value;
    },
    getWindowSize() {
        return {
            width: Math.max(
                document.documentElement.clientWidth,
                window.innerWidth
            ),
            height: Math.max(
                document.documentElement.clientHeight,
                window.innerHeight
            )
        }
    },
    checkIsNull(value) {
        if (value === undefined || value === null || value === "") {
            return true;
        } else {
            return false;
        }
    },
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            //用decodeURI来解码
            return decodeURI(r[2]);
        } else {
            return null;
        }
    },
    formatDate(timestamp, pattern) {
        if (!timestamp) {
            return "";
        }
        var oDate = new Date(parseInt(timestamp));
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
    guid() {
        var num = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            num += n;
        }
        return num;
    },
    arrayToTree(dataArr, param) {
        param = param || {};
        const before_idkey = param.before_idkey || "id";
        const before_parentkey = param.before_parentkey || "parentId";
        const after_childkey = param.after_childkey || "child";
        let tree = dataArr.filter((father) => {
            //循环所有项
            let branchArr = dataArr.filter((child) => {
                //返回每一项的子级数组        
                return father[before_idkey] == child[before_parentkey]
            });
            if (branchArr.length > 0) {
                //如果存在子级，则给父级添加一个child属性，并赋值        
                father[after_childkey] = branchArr;
            }
            //返回没有父级的
            return !(dataArr.some(function(item) {
                return item[before_idkey] === father[before_parentkey];
            }));
        });
        //返回树形数据
        return tree;
    },
    getBetweenDays(day1, day2, pattern) {
        if (pattern == "timestamp") {
            // 获取输入日期的毫秒数
            var d1Ms = day1;
            var d2Ms = day2;
        } else {
            // 获取入参字符串形式日期的Date型日期
            var d1 = day1.getDate();
            var d2 = day2.getDate();
            // 获取输入日期的毫秒数
            var d1Ms = d1.getTime();
            var d2Ms = d2.getTime();
        }
        var dayMilliSeconds = 1000 * 60 * 60 * 24;

        // 定义返回值
        var ret;
        // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
        // 每次循环结束，给d1Ms 增加一天
        for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
            // 如果ret为空，则无需添加","作为分隔符
            if (!ret) {
                ret = this.formatDate(d1Ms);
            } else {
                ret = ret + "," + this.formatDate(d1Ms);
            }
        }
        return ret.split(","); // 或可换为return ret;
    },
    getIconByExt: (ext) => {
        ext = ext.toLowerCase();
        var type;
        if (ext === "xlsx" || ext === "xls" || ext === "xlsm" || ext === "xlsb") {
            type = "excel";
        } else if (ext === "doc" || ext === "docx") {
            type = "word";
        } else if (ext === "ppt" || ext === "pptx") {
            type = "powerpoint";
        } else if (ext === "bmp" || ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif" || ext === "svg") {
            type = "picture";
        } else if (ext === "rm" || ext === "rmvb" || ext === "mov" || ext === "wmv" || ext === "avi" || ext === "flv" || ext === "mp4" || ext === "avi" || ext === "amv" || ext === "3gp") {
            type = "movie";
        } else if (ext === "pdf") {
            type = "pdf";
        } else if (ext === "mp3" || ext === "wma" || ext === "wav") {
            type = "sound";
        } else if (ext === "txt") {
            type = "text";
        } else if (ext === "zip" || ext === "rar" || ext === "7z") {
            type = "zip";
        } else {
            // 和大家不一样，要特殊return
            return "fa-file";
        }
        return "fa-file-" + type + "-o";
    },
    getFileSize(size) {
        size = parseInt(size);
        return (size < 1024 && "1KB") ||
            (size > 1024 * 1024 && Math.round(size / 1024 / 1024) + "MB") ||
            (Math.round(size / 1024) + "KB");
    },
    checkBtn(store, code) {
        var arr = store.state.permissionBtns;
        return _.indexOf(arr, code) != -1;
    },

    // 打开"删除"询问框，确认后删除（可以批量）
    openConfirm(params) {
        let { ids, url, refreshFunc, context, } = params;
        context.$confirm('您确认要删除数据吗？', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            context.loading = true;
            context.xAxios({
                method: 'post',
                url: BASE_PATH + url,
                data: { id: ids }
            }).then((response) => {
                const res = response.data;
                if (res.code == 1) {
                    context.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                    // 刷新
                    refreshFunc && refreshFunc();
                }
                context.loading = false;
            });
        }).catch(error => {});
    },
    // 对于el-input-number组件，null值会显示为0。所以要手动把null改为undefined，这样就是空了。
    processForElementNumberInput(data, keyArr) {
        var processObj = (obj) => {
            let res = _.cloneDeep(obj);
            _.forEach(keyArr, (key) => {
                if (res[key] === null || res[key] === "") {
                    res[key] = undefined;
                }
            });
            return res;
        };
        // 区分数组和对象
        if (Array.isArray(data)) {
            // 是数组
            return _.map(data, (item) => {
                return processObj(item);
            });
        } else {
            return processObj(data);
        }
    }
};