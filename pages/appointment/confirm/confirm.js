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
        schedule: 0
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
        console.log(e);

        const that = this;

        wx.request({
            url: __API__.insert('appointment'),
            method: 'POST',
            data: {
                schedule: that.data.schedule,
                patient: that.data.pid,
                requestId: '',
                bizId: '',
                phone: that.data.phone,
                verificationCode: e.detail.value.verficationCode
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

    verificationCodeInputFocus: function (e) {
        this.setData({
            message: ''
        });
    }
})