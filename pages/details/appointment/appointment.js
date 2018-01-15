// pages/details/appointment/appointment.js
const __API__ = require("../../../services/backbone.api.js");
const __APPOINTMENT_FORMAT__ = require("../../../services/appointment.service.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		appointment: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		wx.request({
			url: __API__.getTableDetails('appointment', options.rid),
			data: {},
			dataType: "json",
			header: {
				'content-type': 'application/json'
			},
			success: function (response) {
				const rawData = __APPOINTMENT_FORMAT__.formatAppointmentDetails(JSON.parse(response.data.appointment));
				if (rawData instanceof Array && rawData.length > 0) {
					that.setData({
						appointment: rawData[0]
					})
				}
			},
			fail: function (error) { console.error(error) }
		})
	},

	backToIndex: function () {
		wx.reLaunch({
			url: '/pages/index/index'
		})
	}
})