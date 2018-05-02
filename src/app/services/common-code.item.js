"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonCodeItem = (function () {
    function CommonCodeItem() {
        this.locationCodeList = null; //지역 코드 10004
        this.type1CodeList = null; //1차구분 코드 10003
        this.type2CodeList = null; //2차구분 코드 10004
        this.targetCodeList = null; //대상 코드 10004
        this.userList = null; //쿠퍼 유저 리스트
    }
    CommonCodeItem.prototype.getLocationCodeList = function () {
        return this.locationCodeList;
    };
    CommonCodeItem.prototype.setLocationCodeList = function (param) {
        this.locationCodeList = param;
    };
    CommonCodeItem.prototype.getType1CodeList = function () {
        return this.type1CodeList;
    };
    CommonCodeItem.prototype.setType1CodeList = function (param) {
        this.type1CodeList = param;
    };
    CommonCodeItem.prototype.getType2CodeList = function () {
        return this.type2CodeList;
    };
    CommonCodeItem.prototype.setType2CodeList = function (param) {
        this.type2CodeList = param;
    };
    CommonCodeItem.prototype.getTargetCodeList = function () {
        return this.targetCodeList;
    };
    CommonCodeItem.prototype.setTargetCodeList = function (param) {
        this.targetCodeList = param;
    };
    CommonCodeItem.prototype.getUserList = function () {
        return this.userList;
    };
    CommonCodeItem.prototype.setUserList = function (param) {
        this.userList = param;
    };
    CommonCodeItem.prototype.setCodeDataFromJson = function (jsonData) {
        this.locationCodeList = jsonData.locationCodeList;
        this.type1CodeList = jsonData.type1CodeList;
        this.type2CodeList = jsonData.type2CodeList;
        this.targetCodeList = jsonData.targetCodeList;
        this.userList = jsonData.userList;
    };
    return CommonCodeItem;
}());
exports.CommonCodeItem = CommonCodeItem;
//# sourceMappingURL=common-code.item.js.map