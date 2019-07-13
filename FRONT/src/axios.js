import Vue from 'vue';
import axios from 'axios';
import {
	Message
} from 'element-ui'

axios.interceptors.request.use(
	config => {
		// 对IE内核，要加上时间戳，防止请求被缓存
		// config.url += '?timestamp=' + new Date().getTime();

		// 自定义配置项：xJsonData 发送json格式的数据【修改method、headers、JSON化数据】
		if (config.xJsonData) {
			config.method = "post";
			config.headers["Content-Type"] = 'application/json;charset=UTF-8';
			config.data = JSON.stringify(config.data);
		}
		// 自定义配置项：xDonotNeedLoginCheck 该请求不需要登录
		if (config.xDonotNeedLoginCheck) {
			console.log(config.url + "该请求不需要登录");
		} else {
			// 在360安全模式下， Vuecookies会报错。没发现原因，不用cookie了，改用localStorage
			/*let token = localStorage.getItem("token");
			if (token) {
			    config.headers["token"] = token;
			} else {
			    tokenInvalid();
			}*/
		}
		return config;
	}, err => {
		/*Message({
		    message: "请求失败了！(request出错)",
		    type: 'error'
		});*/
		return Promise.reject(err);
	}
)

axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			const code = response.data.code;
			/*if (code == 3) {
			    // 重名
			    Message({
			        message: "请求失败，存在重名！",
			        type: 'error'
			    });
			    return Promise.reject();
			} else if (code == 9) {
			    // 名称为空
			    Message({
			        message: "请求失败，名称不能为空！",
			        type: 'error'
			    });
			    return Promise.reject();
			} else if (code == 401) {
			    // token失效（这里的401是后端自己定义的code值，不是http状态码）
			    tokenInvalid();
			    return Promise.reject();
			}*/
			return response.data;
		}
	},
	err => {
		/*switch (err.response.status) {
		    case 404:
		        Message({
		            message: "您访问的资源不存在！",
		            type: 'error'
		        });
		        break;
		    case 500:
		        Message({
		            message: "服务器内部错误！",
		            type: 'error'
		        });
		        break;
		    default:
		        Message({
		            message: "请求失败了！(response出错)",
		            type: 'error'
		        });
		        break;
		}*/
		return Promise.reject(err);
	}
)

function tokenInvalid() {
	/*Message({
	    message: "登录超时！请重新登录！",
	    type: 'error'
	});
	setTimeout(() => window.location.href = "./login.html", 1000);*/
}

export default axios;