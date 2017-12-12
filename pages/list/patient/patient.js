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
				console.info(response.data.doctors);

				that.setData({
					patients: JSON.parse(response.data.doctors)
				});
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})