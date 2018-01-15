// pages/appointment/init/init.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		departmentName: '',
		doctorName: '',
		schedule: {},
		patient: {},
		noticeIconPath: '../../../icons/common/notice.png'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.info(options);

		this.setData({
			departmentName: options.departmentName,
			doctorName: options.doctorName,
			schedule: JSON.parse(options.schedule)
		});

		wx.removeStorage({
			key: 'patientSelected',
			success: function (res) { }
		})
	},

	/**
	   * 生命周期函数--监听页面显示
	   */
	onShow: function () {
		var that = this;

		wx.getStorage({
			key: 'patientSelected',
			success: function (res) {
				that.setData({
					patient: res.data
				});
			}
		})
	},

	toPatientList: function (e) {
		wx.getStorage({
			key: 'user',
			success: function (res) {
				wx.navigateTo({
					url: '/pages/list/patient/patient?userid=' + res.data
				})
			}
		});
	},

	toConfirmAppointment: function (e) {
		const that = this;

		wx.getStorage({
			key: 'patientSelected',
			success: function (res) {
				wx.navigateTo({
					url: '/pages/appointment/confirm/confirm?pid=' + that.data.patient.pid
					+ '&phone=' + that.data.patient.phone
					+ '&schedule=' + JSON.stringify(that.data.schedule)
				});
			},
			fail: function (err) {
				wx.showToast({
					title: '请选择就诊人',
					image: that.data.noticeIconPath,
					duration: 3000
				})
			}
		});
	}
})