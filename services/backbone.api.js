const domain = "https://www.thinmelon.cc/";
const api = "backbone/";

const getHospitalDetails = function (tableName, id) {
	return domain + api + 'table/' + tableName + '/id/' + id;

}

const getImageRequestPrefix = function (filePath) {
	return domain + api + 'image/screenshot/' + filePath;
}

module.exports = {
	getHospitalDetails: getHospitalDetails,
	getImageRequestPrefix: getImageRequestPrefix
}