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
    return domain + api + '/table/' + name + '/relatives/' + id;
}

module.exports = {
    getTableList: getTableList,
    getTableDetails: getTableDetails,
    getImageRequestPrefix: getImageRequestPrefix,
    queryRelatives: queryRelatives
}