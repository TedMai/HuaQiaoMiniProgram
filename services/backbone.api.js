const domain = "https://www.thinmelon.cc/";
const api = "backbone/";

const getTableDetails = function (tableName, id) {
	return domain + api + 'table/' + tableName + '/id/' + id;
}

const getTableList = function (tableName) {
	return domain + api + 'table/' + tableName;
}

const getImageRequestPrefix = function (filePath) {
	return domain + api + 'image/screenshot/' + filePath;
}

const queryRelatives = function (name, id) {
	return domain + api + 'table/' + name + '/relatives/' + id;
}

const insert = function (name) {
	return domain + api + 'table/' + name;
}

const update = function (name, id) {
	return domain + api + 'table/' + name + '?id=' + id;
}

const knock = function (code) {
	return domain + api + 'knock/' + code;
}

const login = function (type, action) {
	return domain + api + 'login/type/' + type + '/action/' + action;
}

/**
 * 发送Sms
 * 	传入参数
 * 		--		phone: 接收的手机号码
 * 		--		type: 短信类型 
 * 					0 - 验证码
 * 					1 - 确认短信
 */
const sendSms = function (phone, type) {
	return domain + api + '/sms/' + phone + '/type/' + type;
}

module.exports = {
	getTableList: getTableList,
	getTableDetails: getTableDetails,
	getImageRequestPrefix: getImageRequestPrefix,
	queryRelatives: queryRelatives,
	insert: insert,
	update: update,
	sendSms: sendSms,
	knock: knock,
	login: login
}