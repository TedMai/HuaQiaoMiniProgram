//index.js
const __API__ = require("../../services/backbone.api.js")

//获取应用实例
const app = getApp()

Page({
	data: {
		name: '',
		description: '',
		contact: '',
		longitude: 0,
		latitude: 0,
		scale: 14,
		markers: [],
		gallery: [],
		indicatorDots: true,
		autoplay: true,
		circular: true,
		interval: 5000,
		duration: 1000
		// motto: 'Hello World',
		// userInfo: {},
		// hasUserInfo: false,
		// canIUse: wx.canIUse('button.open-type.getUserInfo')
		// canIUse: false
	},
	onLoad: function () {
		var that = this;

		wx.request({
			url: __API__.getTableDetails('hospital', 26),
			data: {},
			header: {
				'content-type': 'application/json'
			},
			success: function (response) {
				console.info(response);

				var hospital = JSON.parse(response.data.hospital)[0];
				if (hospital) {
					wx.setNavigationBarTitle({
						title: hospital.name
					});
					that.data.description = hospital.description;			// 医院简介
					that.data.contact = hospital.contact;						// 联系方式
					that.data.longitude = hospital.axisX;						// 经度
					that.data.latitude = hospital.axisY;						   // 纬度
					that.data.markers.push({										   // 标记点
						// iconPath: "/resources/others.png",
						// id: 0,
						longitude: hospital.axisX,
						latitude: hospital.axisY
						// width: 50,
						// height: 50
					});
				}

				var gallery = JSON.parse(response.data.gallery);		// 图集
				if (gallery instanceof Array) {										  // 补全图片的请求地址
					that.data.gallery = gallery.map(image => {
						return {
							id: image.id,
							imageurl: __API__.getImageRequestPrefix(image.imageurl)
						}
					});
				}

				that.setData({
					contact: that.data.contact,
					description: that.data.description,
					longitude: that.data.longitude,
					latitude: that.data.latitude,
					markers: that.data.markers,
					gallery: that.data.gallery,
				});
			}
		})
		// console.info("index.js	==>		onLoad");
		// console.info(this.data.canIUse);
		// if (app.globalData.userInfo) {
		// 	this.setData({
		// 		userInfo: app.globalData.userInfo,
		// 		hasUserInfo: true
		// 	})
		// } else if (this.data.canIUse) {
		// 	// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		// 	// 所以此处加入 callback 以防止这种情况
		// 	app.userInfoReadyCallback = res => {
		// 		console.info("index.js	==>		onLoad		==>		app.userInfoReadyCallback	==>		callback");
		// 		console.info(res);
		// 		this.setData({
		// 			userInfo: res.userInfo,
		// 			hasUserInfo: true
		// 		})
		// 	}
		// } else {
		// 	console.info("index.js	==>		onLoad		==>		send getUserInfo request");
		// 	// 在没有 open-type=getUserInfo 版本的兼容处理
		// 	wx.getUserInfo({
		// 		success: res => {
		// 			app.globalData.userInfo = res.userInfo
		// 			this.setData({
		// 				userInfo: res.userInfo,
		// 				hasUserInfo: true
		// 			})
		// 		}
		// 	})
		// }
	},
    toMakeAppointment:function(){
        wx.navigateTo({
            url: '/pages/search/department/department'
        })
    }

})
