const __API__ = require("./backbone.api.js");

const checkIn = () => {
    console.log("login.service.js =====> checkIn");
    wx.login({
        success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
                url: __API__.knock(res.code),
                method: 'GET',
                data: {},
                header: {
                    'content-type': 'application/json'
                },
                success: function (response) {
                    console.log(response);
                    // 出于简单，暂时使用用户的uid作为唯一标识
                    // TODO: 为安全性考虑，尽快使用session_key机制
                    if (response.data.code === 0) {
                        if (response.data.msg instanceof Array && response.data.msg.length > 0) {
                            wx.setStorage({
                                key: 'user',
                                data: response.data.msg[0].uid
                            });
                        } else {
                            wx.setStorage({
                                key: 'user',
                                data: response.data.msg.insertId
                            });
                        }
                    }
                }
            });
        }
    });
}

const saveUserInfo = userinfo => {
    console.log("login.service.js =====> saveUserInfo");
    wx.getStorage({
        key: 'user',
        success: function (res) {
            wx.request({
                url: __API__.login('wechat', 'weChatLogin'),
                method: 'POST',
                data: {
                    uid: res.data,
                    userInfo: userinfo
                },
                dataType: 'json',
                header: {
                    'content-type': 'application/json'
                },
                success: function (response) {
                    console.log(response);
                },
                fail: function (error) {
                    console.error(error);
                }
            });
        }
    });
}

module.exports = {
    checkIn: checkIn,
    saveUserInfo: saveUserInfo
}