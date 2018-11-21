"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonCodeItem = (function () {
    function CommonCodeItem() {
        this.locationCodeList = null; //지역 코드 10012
        this.workTypeCodeList = null; //업무구분 코드 10007
        this.targetCodeList = null; //대상 코드 10010
        this.workUserList = null; //업무 담당자 리스트 (코드 없음)
        this.customerTypeCodeList = null; //기관유형 코드 10008
        this.subjectCodeList = null; //목적/주제 코드 10009
        this.timesCodeList = null; //회차 코드 10011
    }
    CommonCodeItem.prototype.getLocationCodeList = function () {
        return this.locationCodeList;
    };
    CommonCodeItem.prototype.setLocationCodeList = function (param) {
        this.locationCodeList = param;
    };
    CommonCodeItem.prototype.getWorkTypeCodeList = function () {
        return this.workTypeCodeList;
    };
    CommonCodeItem.prototype.setWorkTypeCodeList = function (param) {
        this.workTypeCodeList = param;
    };
    CommonCodeItem.prototype.getTargetCodeList = function () {
        return this.targetCodeList;
    };
    CommonCodeItem.prototype.setTargetCodeList = function (param) {
        this.targetCodeList = param;
    };
    CommonCodeItem.prototype.getWorkUserList = function () {
        return this.workUserList;
    };
    CommonCodeItem.prototype.setWorkUserList = function (param) {
        this.workUserList = param;
    };
    CommonCodeItem.prototype.getCustomerTypeCodeList = function () {
        return this.customerTypeCodeList;
    };
    CommonCodeItem.prototype.setCustomerTypeCodeList = function (param) {
        this.customerTypeCodeList = param;
    };
    CommonCodeItem.prototype.getSubjectCodeList = function () {
        return this.subjectCodeList;
    };
    CommonCodeItem.prototype.setSubjectCodeList = function (param) {
        this.subjectCodeList = param;
    };
    CommonCodeItem.prototype.getTimesCodeList = function () {
        return this.timesCodeList;
    };
    CommonCodeItem.prototype.setTimesCodeList = function (param) {
        this.timesCodeList = param;
    };
    CommonCodeItem.prototype.setCodeDataFromJson = function (jsonData) {
        this.locationCodeList = jsonData.locationCodeList;
        this.workTypeCodeList = jsonData.workTypeCodeList;
        this.targetCodeList = jsonData.targetCodeList;
        this.workUserList = jsonData.workUserList;
        this.customerTypeCodeList = jsonData.customerTypeCodeList;
        this.subjectCodeList = jsonData.subjectCodeList;
        this.timesCodeList = jsonData.timesCodeList;
    };
    return CommonCodeItem;
}());
exports.CommonCodeItem = CommonCodeItem;
//# sourceMappingURL=common-code.item.js.map