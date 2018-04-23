"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var net_service_1 = require("../../services/net.service");
var CodeService = (function (_super) {
    __extends(CodeService, _super);
    function CodeService(http) {
        var _this = _super.call(this, http) || this;
        _this.jsonHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        _this.formHeaders = new http_1.Headers({ 'Content-Type': 'x-www-form-urlencoded' });
        return _this;
    }
    /**
     * 코드 리스트 요청
     * @param param
     */
    CodeService.prototype.codeList = function (param) {
        return _super.prototype.reqPost.call(this, '/code/codeList.ajax', param, this.jsonHeaders);
    };
    /**
     * 베이스 코드 추가
     * @param param
     */
    CodeService.prototype.insertCommonCode = function (param) {
        return _super.prototype.reqPost.call(this, '/code/insertCommonCode.ajax', param, this.jsonHeaders);
    };
    /**
     * 베이스 코드 상세 정보
     * @param param
     */
    CodeService.prototype.getCodeInfo = function (param) {
        return _super.prototype.reqPost.call(this, '/code/getCodeInfo.ajax', param, this.jsonHeaders);
    };
    /**
     * 코드 정보 업데이트
     * @param param
     */
    CodeService.prototype.updateCommonCode = function (param) {
        return _super.prototype.reqPost.call(this, '/code/updateCommonCode.ajax', param, this.jsonHeaders);
    };
    /**
     * 상세 코드 리스트 요청
     * @param param
     */
    CodeService.prototype.selectChildCodeList = function (param) {
        return _super.prototype.reqPost.call(this, '/code/codeDetailList.ajax', param, this.jsonHeaders);
    };
    /**
     * 상세코드 정보 요청
     * @param param
     */
    CodeService.prototype.selectChildCodeInfo = function (param) {
        return _super.prototype.reqPost.call(this, '/code/CodeDetailInfo.ajax', param, this.jsonHeaders);
    };
    /**
     * 상세코드 추가 요청
     * @param param
     */
    CodeService.prototype.insertChildCode = function (param) {
        return _super.prototype.reqPost.call(this, '/code/insertCodeDetail.ajax', param, this.jsonHeaders);
    };
    /**
     * 상세코드 정보 수정
     * @param param
     */
    CodeService.prototype.updateChildCode = function (param) {
        return _super.prototype.reqPost.call(this, '/code/updateCodeDetail.ajax', param, this.jsonHeaders);
    };
    return CodeService;
}(net_service_1.NetService));
CodeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CodeService);
exports.CodeService = CodeService;
//# sourceMappingURL=code.service.js.map