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
var router_1 = require("@angular/router");
var common_code_item_1 = require("./common-code.item");
var net_service_1 = require("./net.service");
var config_1 = require("../config/config");
var CommonCodeResolver = (function () {
    function CommonCodeResolver(netService, router) {
        this.netService = netService;
        this.router = router;
    }
    CommonCodeResolver.prototype.resolve = function (route, state) {
        var localCommonCode = localStorage.getItem(config_1.config.localStorageCommonCodeKey);
        if (undefined !== localCommonCode && null !== localCommonCode) {
            var commonCode = new common_code_item_1.CommonCodeItem();
            commonCode.setCodeDataFromJson(JSON.parse(localCommonCode));
            return Promise.resolve(commonCode);
        }
        else {
            return this.netService.reqGetPromise('/code/allCodeList.ajax')
                .then(function (res) {
                var commonCode = new common_code_item_1.CommonCodeItem();
                console.log(res);
                console.log(res.result);
                //아래 공통 코드 추가/삭제/수정시 common.service.ts에도 같이 수정해야 합니다.
                for (var _i = 0, _a = res.result; _i < _a.length; _i++) {
                    var base = _a[_i];
                    switch (base.codeId) {
                        case '10012':
                            commonCode.setLocationCodeList(base.childCodeList);
                            break;
                        case '10007':
                            commonCode.setWorkTypeCodeList(base.childCodeList);
                            break;
                        case '10010':
                            commonCode.setTargetCodeList(base.childCodeList);
                            break;
                        case '10008':
                            commonCode.setCustomerTypeCodeList(base.childCodeList);
                            break;
                        case '10009':
                            commonCode.setSubjectCodeList(base.childCodeList);
                            break;
                        case '10011':
                            commonCode.setTimesCodeList(base.childCodeList);
                            break;
                    }
                }
                localStorage.setItem(config_1.config.localStorageCommonCodeKey, JSON.stringify(commonCode));
                return Promise.resolve(commonCode);
            }, function (err) {
                if (err) {
                    alert("코드 가져오기를 실패 하였습니다.");
                }
                return null;
            });
        }
    };
    return CommonCodeResolver;
}());
CommonCodeResolver = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [net_service_1.NetService, router_1.Router])
], CommonCodeResolver);
exports.CommonCodeResolver = CommonCodeResolver;
//# sourceMappingURL=common-resolver.service.js.map