// component/btn.verification.component/btn.verification.component.js
const __API__ = require("../../services/backbone.api.js");
const __VALIDATOR__ = require("../../services/validator.service.js");
const __INTERVAL_SECONDS__ = 60;

Component({
	properties: {
		btnText: {
			type: String,
			value: '发送'
		},
		mobile: {
			type: String,
			value: ''
		}
	},
	data: {
		hasSent: false,
		timerId: 0,
		countDownSeconds: __INTERVAL_SECONDS__
	},
	/**
		 * 组件生命周期函数
		 * 在组件实例进入页面节点树时执行
		 * 注意此时不能调用 setData
		 */
	created: function () {
	},
	/**
	 * 组件生命周期函数
	 * 在组件实例进入页面节点树时执行
	 */
	attached: function () {
	},
	/**
	 * 组件生命周期函数
	 * 在组件布局完成后执行
	 * 此时可以获取节点信息（使用 SelectorQuery ）
	 */
	ready: function () {
	},
	/**
	 * 组件生命周期函数
	 * 在组件实例被移动到节点树另一个位置时执行
	 */
	moved: function () {
	},
	/**
	 * 组件生命周期函数
	 * 在组件实例被从页面节点树移除时执行
	 */
	detached: function () {
		this._clearTimer();
	},
	/**
	 * 组件方法
	 * 包括事件响应函数和任意的自定义方法
	 * 生命周期函数无法在组件方法中通过 this 访问到
	 */
	methods: {
		/**
		 * 
		 */
		triggerSms: function () {
			var that = this;

			if (__VALIDATOR__.MobilePhoneValidator(this.properties.mobile)) {
				this.data.hasSent = true;

				wx.request({
					url: __API__.sendSms(this.properties.mobile, 0),
					method: 'GET',
					data: {},
					dataType: 'json',
					header: {
						'content-type': 'application/json'
					},
					success: function (response) {
						if (response.data.Code === 'OK') {
							that._countDown();
						}
						that.triggerEvent('sendVerificationCode', response.data);
					},
					fail: function (error) {
						that.triggerEvent('sendVerificationCode', {
							Code: 'Failed',
							Message: '网络出现错误'
						});
					}
				});
			} else {
				this.triggerEvent('sendVerificationCode', {
					Code: 'Failed',
					Message: '请输入正确的手机号码'
				});
			}
		},

		/**
		 * 倒计时
		 */
		_countDown: function () {
			var that = this;

			this._clearTimer();
			this.data.timerId = setInterval(() => {
				that.data.countDownSeconds--;
				if (that.data.countDownSeconds <= 0) {
					that._clearTimer();
					that.data.countDownSeconds = __INTERVAL_SECONDS__;
					that.data.hasSent = false;
					that.properties.btnText = '重发';
				} else {
					that.properties.btnText = that.data.countDownSeconds + '秒';
				}

				that.setData({
					btnText: that.properties.btnText
				})
			}, 1000);
		},

		/**
		 * 清除计时器
		 * 内部方法建议以下划线开头
		 */
		_clearTimer: function () {
			clearInterval(this.data.timerId);
		}
	}
})