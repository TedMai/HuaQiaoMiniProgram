/**
 * 手机号码验证
 * @param phone
 * @returns {boolean}
 * @constructor
 */
const MobilePhoneValidator = phone => {
	const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
	return phoneReg.test(phone);
}

/**
 * 一致性验证
 * @param str1
 * @param str2
 * @returns {boolean}
 * @constructor
 */
const ConsistenceValidator = (str1, str2) => {
	return str1 === str2;
}

/**
 * 身份证验证
 * @param identity
 * @returns {boolean}
 * @constructor
 */
const IdentityValidator = identity => {
	const identityReg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
	return identityReg.test(identity);
}

module.exports = {
	MobilePhoneValidator: MobilePhoneValidator,
	ConsistenceValidator: ConsistenceValidator,
	IdentityValidator: IdentityValidator
}