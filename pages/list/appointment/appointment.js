// pages/list/appointment/appointment.js
const __API__ = require("../../../services/backbone.api.js");
const __APPOINTMENT_FORMAT__ = require("../../../services/appointment.service.js");

Page({

    /**
     * 页面的初始数据
     */
	data: {
		appointments: []
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		var that = this;

		wx.request({
			url: __API__.queryRelatives('appointment', options.userid),
			data: {},
			dataType: "json",
			header: {
				'content-type': 'application/json'
			},
			success: function (response) {
				that.setData({
					appointments: __APPOINTMENT_FORMAT__.formatAppointmentDetails(JSON.parse(response.data.appointments))
				});
			},
			fail: function (error) { console.error(error) }
		});
	},

	toAppointmentDetails: function (e) {
		wx.navigateTo({
			url: '/pages/details/appointment/appointment?rid=' + e.currentTarget.dataset.appointment
		});
	}
})