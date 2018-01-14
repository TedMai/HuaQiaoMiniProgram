//app.js
const __LOGIN__ = require("/services/login.service.js")

App({
    onLaunch: function () {
        // 登录
        __LOGIN__.checkIn();
        
        // 获取用户信息
        wx.getSetting({
            success: res => {
                console.info("app.js	==>		wx.getSetting	==>		callback");
                console.info(res);
                if (res.authSetting['scope.userInfo']) {
					/**
					 * 获取用户信息
					 * withCredentials 为 true 时，需要先调用 wx.login 接口
					 * 需要用户授权 scope.userInfo
					 * 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					 */
                    wx.getUserInfo({
                        success: res => {
                            console.info("app.js	==>		wx.getSetting	==>		callback	==>		getUserInfo		==>		callback");
                            console.log(res.userInfo);
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})