"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonCodeItem = (function () {
    function CommonCodeItem() {
        this.locationCodeList = null; //지역 코드 10001
    }
    CommonCodeItem.prototype.getLocationCodeList = function () {
        return this.locationCodeList;
    };
    CommonCodeItem.prototype.setLocationCodeList = function (param) {
        this.locationCodeList = param;
    };
    CommonCodeItem.prototype.setCodeDataFromJson = function (jsonData) {
        this.locationCodeList = jsonData.locationCodeList;
        // this.subjectCodeList = jsonData.subjectCodeList;
        // this.termCodeList = jsonData.termCodeList;
        // this.companyCodeList = jsonData.companyCodeList;
        // this.levelCodeList = jsonData.levelCodeList;
        // this.componentCodeList = jsonData.componentCodeList;
        // this.serviceCodeList = jsonData.serviceCodeList;
        // this.typeCodeList = jsonData.typeCodeList;
        // this.eduDataCodeList = jsonData.eduDataCodeList;
        // this.existExpectCodeList = jsonData.existExpectCodeList;
        // this.conceptTreeCodeList = jsonData.conceptTreeCodeList;
        // this.studyFormCodeList = jsonData.studyFormCodeList;
        // this.linkedGradeCodeList = jsonData.linkedGradeCodeList;
        // this.studyContentsKindList = jsonData.studyContentsKindList;
        // this.studyContentLabelList = jsonData.studyContentLabelList;
        // this.korWordTypeCodeList = jsonData.korWordTypeCodeList;
        // this.subjKorThemeCodeList = jsonData.subjKorThemeCodeList;
        // this.subjEngThemeCodeList = jsonData.subjEngThemeCodeList;
        // this.studyOfferList = jsonData.studyOfferList;
        // this.textBookPubCodeList = jsonData.textBookPubCodeList;
        // this.evalOrderCodeList = jsonData.evalOrderCodeList;
        // this.evalLevelCodeList = jsonData.evalLevelCodeList;
    };
    return CommonCodeItem;
}());
exports.CommonCodeItem = CommonCodeItem;
//# sourceMappingURL=common-code.item.js.map