const __DATETIME_FORMAT__ = require("./datetime.service.js");

const formatAppointmentDetails = appointments => {
	return appointments.map(item => {
		/**
		 * 时间格式转换为日期
		 */
		item.appointment = __DATETIME_FORMAT__.formatTime(new Date(item.appointment));
		item.visiting = __DATETIME_FORMAT__.formatDate(new Date(item.visiting));
		/**
		 * 时间段转换为上/下午
		 */
		if (item.section === 0) {
			item.section = '上午';
		} else {
			item.section = '下午';
		}
		/**
		 * 订单状态
		 */
		switch (item.status) {
			case 0:			// 	预约成功
				item.status = '	预约成功'
				break;
			case 1:			// 	已取消
				item.status = '	已取消'
				break;
			case 2:			// 	已就诊
				item.status = '	已就诊'
				break;
			case 3:			// 	已失效
				item.status = '	已失效'
				break;
			default:
				break;
		}
		return item;
	});
}

module.exports = {
	formatAppointmentDetails: formatAppointmentDetails
}