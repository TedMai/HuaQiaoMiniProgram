// pages/appointment/confirm/confirm.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mobile: '18159393355'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	submitAppointment: function (e) {
		wx.redirectTo({
			url: '/pages/details/appointment/appointment',
		})
	}
})