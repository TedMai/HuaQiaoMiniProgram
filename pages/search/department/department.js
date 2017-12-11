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
                console.info(response);
                if (response.data instanceof Array) {
                    that.data.departments = response.data;
                    response.data.map(item => {
                        if (item.parent === 0) {
                            that.data.superiorDepartments.push({
                                id: item.did,
                                name: item.name
                            });
                        }
                    });
                    that.setData({
                        departments: that.data.departments,
                        superiorDepartments: that.data.superiorDepartments
                    });
                }
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

    },

    toShowOrdinateDepartments: function (e) {
        this.data.subordinateDepartments.splice(0, this.data.subordinateDepartments.length);
        this.data.departments.map(item => {
            if (item.parent === e.currentTarget.dataset.departmentid) {
                this.data.subordinateDepartments.push({
                    id: item.did,
                    name: item.name
                });
            }
        });
        console.info(this.data.subordinateDepartments);
        this.setData({
            subordinateDepartments: this.data.subordinateDepartments
        });
    },

    toShowDoctorList: function(e) {
        wx.navigateTo({
            url: '/pages/list/doctor/doctor'
        })
    }
})