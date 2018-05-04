"use strict";
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
var net_service_1 = require("./net.service");
var auth_service_1 = require("./auth.service");
var common_code_item_1 = require("./common-code.item");
var router_1 = require("@angular/router");
var config_1 = require("../config/config");
/**
 * 전역에서 공통으로 사용할 싱글톤 서비스
 */
var CommonService = (function () {
    function CommonService(netService, authService, route) {
        this.netService = netService;
        this.authService = authService;
        this.route = route;
        this.commonCode = new common_code_item_1.CommonCodeItem();
        if (authService.isLogin()) {
            this.refreshCodeData();
        }
    }
    CommonService.prototype.refreshCodeData = function () {
        var _this = this;
        this.netService.reqGet('/code/allCodeList.ajax')
            .subscribe(function (res) {
            //아래 공통 코드 추가/삭제/수정시 common-resolver.service.ts에도 같이 수정해야 합니다.
            for (var _i = 0, _a = res.result; _i < _a.length; _i++) {
                var base = _a[_i];
                switch (base.codeId) {
                    case '10012':
                        _this.commonCode.setLocationCodeList(base.childCodeList);
                        break;
                    case '10007':
                        _this.commonCode.setWorkTypeCodeList(base.childCodeList);
                        break;
                    case '10010':
                        _this.commonCode.setTargetCodeList(base.childCodeList);
                        break;
                    case '10008':
                        _this.commonCode.setCustomerTypeCodeList(base.childCodeList);
                        break;
                    case '10009':
                        _this.commonCode.setSubjectCodeList(base.childCodeList);
                        break;
                    case '10011':
                        _this.commonCode.setTimesCodeList(base.childCodeList);
                        break;
                }
            }
            localStorage.setItem(config_1.config.localStorageCommonCodeKey, JSON.stringify(_this.commonCode));
        }, function (err) {
            if (err) {
                alert("코드 가져오기를 실패 하였습니다.");
            }
        });
    };
    return CommonService;
}());
CommonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [net_service_1.NetService,
        auth_service_1.AuthService,
        router_1.ActivatedRoute])
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map