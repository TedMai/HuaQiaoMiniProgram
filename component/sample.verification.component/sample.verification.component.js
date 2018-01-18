// component/sample.verification.component/sample.verification.component.js
const __API__ = require("../../services/backbone.api.js");
const __VALIDATOR__ = require("../../services/validator.service.js");
const __INTERVAL_SECONDS__ = 60;

Component({

	properties: {
		userId: {
			type: Number,
			value: 0
		},
		btnSmsText: {
			type: String,
			value: ''
		},
		btnSubmitText: {
			type: String,
			value: ''
		}
	},
	data: {
		message: '',
		mobile: '',
		hasSent: false,
		timerId: 0,
		requestId: '',
		bizId: '',
		countDownSeconds: __INTERVAL_SECONDS__
	},
	/**
		 * 组件生命周期函数
		 * 在组件实例进入页面节点树时执行
		 * 注意此时不能调用 setData
		 */
	created: function () {
		console.log("======= created =======");
	},
	/**
	 * 组件生命周期函数
	 * 在组件实例进入页面节点树时执行
	 */
	attached: function () {
		console.log("======= attached =======");
	},
	/**
	 * 组件生命周期函数
	 * 在组件布局完成后执行
	 * 此时可以获取节点信息（使用 SelectorQuery ）
	 */
	ready: function () {
		console.log("======= ready =======");
	},
	/**
	 * 组件生命周期函数
	 * 在组件实例被移动到节点树另一个位置时执行
	 */
	moved: function () {
		console.log("======= moved =======");
	},
	/**
	 * 组件生命周期函数
	 * 在组件实例被从页面节点树移除时执行
	 */
	detached: function () {
		console.log("======= detached =======");
		this._clearTimer();
	},
	/**
	 * 组件方法
	 * 包括事件响应函数和任意的自定义方法
	 * 生命周期函数无法在组件方法中通过 this 访问到
	 */
	methods: {
		/**
		 *  触发验证码发送
		 */
		triggerSms: function () {
			var that = this;
			/**
			 * 验证手机号有效性
			 */
			if (__VALIDATOR__.MobilePhoneValidator(this.data.mobile)) {
				this.data.hasSent = true;

				wx.request({
					url: __API__.sendSms(this.data.mobile, 0),
					method: 'GET',
					data: {},
					dataType: 'json',
					header: {
						'content-type': 'application/json'
					},
					success: function (response) {
						if (response.data.Code === 'OK') {
							that._countDown();
							//  记录 RequestId 及 BizId
							that.setData({
								requestId: response.data.RequestId,
								bizId: response.data.BizId,
								message: ''
							});
						} else {
							that.setData({
								message: response.data.Message
							})
						}
					},
					fail: function (error) {
						that.setData({
							message: '请检查网络连接'
						})
					}
				});
			} else {
				this.setData({
					message: '请输入正确的手机号码'
				})
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
					that.properties.btnSmsText = '重发';
				} else {
					that.properties.btnSmsText = that.data.countDownSeconds + '秒';
				}

				that.setData({
					btnSmsText: that.properties.btnSmsText
				})
			}, 1000);
		},

		/**
		 * 清除计时器
		 * 内部方法建议以下划线开头
		 */
		_clearTimer: function () {
			clearInterval(this.data.timerId);
		},

		mobileInputEvent: function (e) {
			this.data.mobile = e.detail.value;
		},

		/**
		 * 验证码输入框获得焦点时，清空错误提示信息
		 */
		inputFocusEvent: function (e) {
			this.setData({
				message: ''
			});
		},

		combineMobile: function (e) {
			const that = this;

			wx.request({
				url: __API__.update('user', this.properties.userId),
				method: 'POST',
				data: {
					requestId: that.data.requestId,
					bizId: that.data.bizId,
					phone: that.data.mobile,
					verificationCode: e.detail.value.verificationCode
				},
				dataType: 'json',
				header: {
					'content-type': 'application/json'
				},
				success: response => {
					if (response.data.code === 0) {
						wx.showToast({
							title: '关联成功',
							complete: () => {
								setTimeout(() => { wx.navigateBack({}); }, 2000);
							}
						})
					} else if (response.data.code === -100 && response.data.msg.errno === 1062) {
						that.setData({
							message: '该手机号码已注册!'
						})
					}
				},
				fail: error => { console.error(error) }
			});
		}
	}

})