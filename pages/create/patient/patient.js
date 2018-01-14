// pages/create/patient/patient.js
const __API__ = require("../../../services/backbone.api.js")
const __VALIDATOR__ = require("../../../services/validator.service.js");

Page({

	/**
	 * 页面的初始数据
	 */
    data: {
        noticeIconPath: '../../../icons/common/notice.png'
    },

	/**
	 * 生命周期函数--监听页面加载
	 */
    onLoad: function (options) {

    },

    onSubmitNewPatient: function (e) {
        var that = this;
        
        wx.getStorage({
            key: 'user',
            success: function (res) {
                console.log(res);
                const newPatient = {
                    pid: 0,
                    name: e.detail.value.name,
                    sex: parseInt(e.detail.value.sex),
                    birthday: '',
                    identity: e.detail.value.identity,
                    phone: e.detail.value.phone,
                    address: '',
                    isDefault: e.detail.value.isDefault,
                    uid: res.data
                };

                console.log(newPatient);
                that.saveNewPatient(newPatient);
            },
        })
    },

    saveNewPatient: function (newPatient) {
        const that = this;

        if (!__VALIDATOR__.IdentityValidator(newPatient.identity)) {
            wx.showToast({
                title: '身份证输入有误',
                image: that.data.noticeIconPath,
                duration: 3000
            })
        }
        else if (!__VALIDATOR__.MobilePhoneValidator(newPatient.phone)) {
            wx.showToast({
                title: '手机号输入有误',
                image: that.data.noticeIconPath,
                duration: 3000
            })
        }
        else {
            wx.request({
                url: __API__.insert("patient"),
                method: 'POST',
                data: {
                    name: newPatient.name,
                    sex: newPatient.sex,
                    identity: newPatient.identity,
                    phone: newPatient.phone,
                    address: newPatient.address,
                    isDefault: newPatient.isDefault,
                    uid: newPatient.uid
                },
                dataType: 'json',
                header: {
                    'content-type': 'application/json'
                },
                success: function (response) {
                    console.log(response);
                    newPatient.pid = response.data.msg.insertId;
                    wx.setStorage({
                        key: "patientSelected",
                        data: newPatient,
                        success: function (result) {
                            wx.navigateBack({
                                // 回退
                            });
                        }
                    });
                },
                fail: function (error) {
                    console.log(error);
                }
            });
        }	/** end of if */
    }/** end of function */
})