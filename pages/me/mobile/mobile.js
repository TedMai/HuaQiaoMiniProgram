// pages/me/mobile/mobile.js
const __API__ = require("../../../services/backbone.api.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isBinding: false,
		mobile: '',
		message: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		wx.getStorage({
			key: 'user',
			success: function (res) {
				wx.request({
					url: __API__.getTableDetails('user', res.data),
					data: {},
					dataType: 'json',
					header: { 'content-type': 'application/json' },
					success: response => {
						if (null === response.data[0].phone) {
							//  绑定
							that.data.isBinding = false;
						} else {
							//  解绑
							that.data.mobile = response.data[0].phone;
							that.data.isBinding = true;
						}
						that.setData({
							mobile: that.data.mobile,
							isBinding: that.data.isBinding
						})
					},
					fail: error => {
						console.error(error);
					}
				}); /** end of wx.request */
			}
		});	/** end of wx.getStorage */
	}

})