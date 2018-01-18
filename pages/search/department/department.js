// pages/search/department/department.js
const __API__ = require("../../../services/backbone.api.js")

Page({

    /**
     * 页面的初始数据
     */
	data: {
		departments: [],
		superiorDepartments: [],
		subordinateDepartments: []
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		var that = this;

		wx.request({
			url: __API__.getTableList("department"),
			data: {},
			header: {
				'content-type': 'application/json'
			},
			success: function (response) {
				if (response.data instanceof Array) {
					// 成功返回 - 初始化
					that.data.departments = response.data;
					response.data.map(item => {
						// 父科室
						if (item.parent === 0) {
							that.data.superiorDepartments.push({
								id: item.did,
								name: item.name,
								backgroundColor: ''
							});
						}
					});
					// 默认显示父科室数组内第一个元素下的所有子科室，如果有
					if (that.data.superiorDepartments.length > 0) {
						that.initOrdinateDepartments(that.data.superiorDepartments[0].id);
					}
					// setData
					that.setData({
						departments: that.data.departments,
						superiorDepartments: that.data.superiorDepartments
					});
				}
			}
		});
	},

	/**
	 * 初始化子科室数组
	 */
	initOrdinateDepartments: function (targetId) {
		// 初始化 - 清空数组
		this.data.subordinateDepartments.splice(0, this.data.subordinateDepartments.length);
		// 设置父科室项目背景色
		this.data.superiorDepartments.map(item => {
			if (item.id === targetId) {
				item.backgroundColor = '#ccc';
			} else {
				item.backgroundColor = 'white';
			}
		});
		// 初始化子科室数组
		this.data.departments.map(item => {
			if (item.parent === targetId) {
				this.data.subordinateDepartments.push({
					id: item.did,
					name: item.name
				});
			}
		});
		// setData
		this.setData({
			superiorDepartments: this.data.superiorDepartments,
			subordinateDepartments: this.data.subordinateDepartments
		});
	},

	/**
	 * 显示当前选中科室下的所有子科室
	 */
	toShowOrdinateDepartments: function (e) {
		this.initOrdinateDepartments(e.currentTarget.dataset.departmentid);
	},

	/**
	 * 跳转 - 当前科室下的所有医生列表
	 */
	toShowDoctorList: function (e) {
		wx.navigateTo({
			url: '/pages/list/doctor/doctor?department=' + JSON.stringify(e.currentTarget.dataset.department)
		})
	}
})