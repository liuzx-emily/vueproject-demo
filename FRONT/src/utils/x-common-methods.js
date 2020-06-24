import { Loading, MessageBox, Message } from 'element-ui';
import xaxios from '@/axios.js'
const commonMethods = {
	openConfirm(params) {
		let { confirmFunc, msg } = params;
		MessageBox.confirm(msg, '', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			customClass: 'general-confirm-box'
		}).then(() => {
			confirmFunc();
		}).catch(err => {
			console.log(err);
		});
	},
	// 打开"删除"询问框
	openConfirm_delete(params) {
		let { url, data, refreshFunc, comfirmMessage, successMsg } = params;
		const confirmFunc = () => {
			let loadingInstance = Loading.service({
				fullscreen: true,
				lock: true,
				background: 'rgba(0, 0, 0, 0.2)',
			});
			xaxios({
				method: 'post',
				url: url,
				data: data
			}).then(res => {
				if (res.code == 1) {
					Message({ type: 'success', message: successMsg || '删除成功！' });
					// 刷新
					refreshFunc && refreshFunc();
				} else {
					Message({ message: res.message, type: 'error', });
				}
				loadingInstance.close();
			})
		};
		commonMethods.openConfirm({
			confirmFunc,
			msg: comfirmMessage || `您确认要删除吗？`
		});
	},
};
export default commonMethods;