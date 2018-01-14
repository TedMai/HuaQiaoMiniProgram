// pages/me/profile/profile.js
//获取应用实例
const __APP__ = getApp();
const __LOGIN__ = require("../../../services/login.service.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        if (__APP__.globalData.userInfo) {
            console.log("profile.js ==> onLoad | globalData");
            this.checkIn(__APP__.globalData.userInfo);
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            __APP__.userInfoReadyCallback = res => {
                console.log("profile.js ==> onLoad | userInfoReadyCallback");
                that.checkIn(res.userInfo);
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            console.log("profile.js ==> onLoad | wx.getUserInfo");
            wx.getUserInfo({
                success: res => {
                    __APP__.globalData.userInfo = res.userInfo
                    that.checkIn(res.userInfo);
                }
            })
        }
    },

    getUserInfo: function (e) {
        console.log("profile.js ==> getUserInfo");
        console.log(e)
        __APP__.globalData.userInfo = e.detail.userInfo
        this.checkIn(e.detail.userInfo);
    },

    checkIn: function (userInfo) {
        __LOGIN__.saveUserInfo(userInfo);
        this.setData({
            userInfo: userInfo,
            hasUserInfo: true
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

    toAppointmentHistory: function (e) {
        wx.getStorage({
            key: 'user',
            success: function (res) {
                wx.navigateTo({
                    url: '/pages/list/appointment/appointment?userid=' + res.data
                })
            }
        })
    }
})