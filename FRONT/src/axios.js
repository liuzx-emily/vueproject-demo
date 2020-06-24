import { vm } from '@/main'
import axios from 'axios';
import { Message } from 'element-ui'



axios.interceptors.request.use(
  config => {
    return config;
  }, err => {
    return Promise.reject(err);
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const code = response.data.code;
      if (code === -9) {
        vm.$router.push({ path: "/login", query: { errorMsg: 1 } })
        return Promise.reject(new Error('没登录！'));
      } else {
        return response.data;
      }
    }
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 404:
          Message({ message: "您访问的资源不存在！", type: 'error' });
          break;
        case 500:
          Message({ message: "服务器内部错误！", type: 'error' });
          break;
        default:
          Message({ message: "请求失败了！错误码：", type: 'error' });
          break;
      }
      return Promise.reject(err);
    }
  }
)

export default axios;