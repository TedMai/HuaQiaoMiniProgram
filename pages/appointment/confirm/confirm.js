// pages/appointment/confirm/confirm.js
const __API__ = require("../../../services/backbone.api.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		message: '',
		mobile: '',
		pid: 0,
		schedule: 0,
		requestId: '',
		bizId: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);

		this.setData({
			mobile: options.phone,
			pid: options.pid,
			schedule: options.schedule
		});
	},

	submitAppointment: function (e) {
		const that = this;

		console.log("====>	submitAppointment");
		console.log(e);
		console.log(that.data);

		wx.request({
			url: __API__.insert('appointment'),
			method: 'POST',
			data: {
				schedule: that.data.schedule,
				patient: that.data.pid,
				requestId: that.data.requestId,
				bizId: that.data.bizId,
				phone: that.data.mobile,
				verificationCode: e.detail.verificationCode
			},
			dataType: 'json',
			header: {
				'content-type': 'application/json'
			},
			success: function (response) {
				console.log(response);
				if (response.data.code === 0) {
					wx.reLaunch({
						url: '/pages/details/appointment/appointment',
					});
				} else if (response.data.code === -300) {
					that.setData({
						message: response.data.msg
					});
				}
			},
			fail: function (error) {
				console.error(error);
			}
		});
	},

	/**
	 * 验证码输入框获得焦点时，清空错误提示信息
	 */
	verificationCodeInputFocus: function (e) {
		this.setData({
			message: ''
		});
	},

	/**
	 * 收到验证码发送完成的消息通知
	 */
	onVerificationCodeSent: function (e) {
		console.log(e);
		if (e.detail.Code === "OK") {
			/**
			 * 如果发送成功，记录requestId及bizId
			 */
			this.data.requestId = e.detail.RequestId;
			this.data.bizId = e.detail.BizId;
			this.data.message = '';
		} else {
			this.data.message = e.detail.Message;
		}
		this.setData({
			message: this.data.message
		});
	}
})