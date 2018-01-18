// pages/list/patient/patient.js
const __API__ = require("../../../services/backbone.api.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		patientId: 0,
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
	},

	deletePatient: function (e) {
		if (this.data.patientId !== 0) {
			wx.request({
				url: __API__.getTableDetails('patient', this.data.patientId),
				method: 'POST',
				data: {},
				dataType: 'json',
				header: { 'content-type': 'application/json' },
				success: response => {
					console.log(response);
					wx.removeStorage({
						key: 'patientSelected',
						success: function (res) { },
					});
					wx.showToast({
						title: '成功删除',
						complete: () => {
							setTimeout(() => { wx.navigateBack({}); }, 2000)
						}
					});
				}
			})/** end of wx.request */
		}
	},

	/**
	 * 事件 - 单选组件
	 */
	radioChanged: function (e) {
		console.log(e);
		this.data.patientId = e.detail.value;
	},

	confirmPatientSelected: function (e) {
		var that = this;
		if (this.data.patientId !== 0) {
			wx.request({
				url: __API__.getTableDetails('patient', this.data.patientId),
				data: {},
				dataType: 'json',
				header: { 'content-type': 'application/json' },
				success: response => {
					console.log(response);
					if (response.data instanceof Array && response.data.length > 0) {
						wx.setStorage({
							key: "patientSelected",
							data: response.data[0],
							success: function (result) {
								wx.navigateBack({
									// 回退
								});
							}
						});
					}
				}
			})	/** end of wx.request */
		}
	}
})