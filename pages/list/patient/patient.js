// pages/list/patient/patient.js
const __API__ = require("../../../services/backbone.api.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		patients: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		wx.request({
			url: __API__.queryRelatives('patient', options.userid),
			data: {},
			header: {
				'content-type': 'application/json'
			},
			success: function (response) {
				// 	初始化
				const rawData = JSON.parse(response.data.patients);
				if (rawData instanceof Array && rawData.length > 0) {
					that.setData({
						patients: rawData
					});
				}
			}
		});
	},

	/**
	 *  事件	- 点击选择
	 */
	onPatientSelected: function (e) {
		wx.setStorage({
			key: "patientSelected",
			data: e.currentTarget.dataset.patient,
			success: function (result) {
				wx.navigateBack({
					// 回退
				});
			}
		});
	},

	/**
		 *  事件	- 新增就诊人
		 */
	addPatient: function (e) {
		wx.redirectTo({
			url: '/pages/create/patient/patient'
		})
	}
})