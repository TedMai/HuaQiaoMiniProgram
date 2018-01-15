// pages/me/mobile/mobile.js
const __API__ = require("../../../services/backbone.api.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		user: 33,
		message: '',
		btnText: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		wx.request({
			url: __API__.getTableDetails('user', this.data.user),
			data: {},
			dataType: 'json',
			header: { 'content-type': 'application/json' },
			success: response => {
				if (null === response.data[0].phone) {
					//  绑定
					that.data.btnText = '绑定';
				} else {
					//  解绑
					that.data.btnText = '解绑';
				}
				that.setData({
					btnText: that.data.btnText
				})
			},
			fail: error => {
				console.error(error);
			}
		});
	}

})