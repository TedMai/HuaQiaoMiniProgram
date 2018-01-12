// pages/details/appointment/appointment.js
const __DATETIME_FORMAT__ = require("../../../services/datetime.service.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		departmentName: '',
		doctorName: '',
		appointmentId: '',
		appointmentDatetime: '',
		patient: {},
		schedule: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;

		console.log(options);

		this.setData({
			departmentName: options.departmentName,
			doctorName: options.doctorName,
			appointmentId: options.rid,
			appointmentDatetime: __DATETIME_FORMAT__.formatTime(new Date(options.appintment)),
			schedule: JSON.parse(options.schedule)
		});

		wx.getStorage({
			key: 'patientSelected',
			success: function (res) {
				that.setData({
					patient: res.data
				});
			}
		});
	},

	backToIndex: function () {
		wx.reLaunch({
			url: '/pages/index/index'
		})
	}
})