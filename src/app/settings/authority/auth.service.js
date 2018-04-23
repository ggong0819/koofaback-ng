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
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(http) {
        var _this = _super.call(this, http) || this;
        _this.jsonHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        _this.formHeaders = new http_1.Headers({ 'Content-Type': 'x-www-form-urlencoded' });
        return _this;
    }
    AuthService.prototype.retrieveAllList = function () {
        return _super.prototype.reqGet.call(this, '/authManage/listAll.ajax');
    };
    AuthService.prototype.doSearch = function (param) {
        return _super.prototype.reqPost.call(this, '/authManage/list.ajax', param, this.jsonHeaders);
    };
    AuthService.prototype.insertAuthority = function (param) {
        return _super.prototype.reqPost.call(this, '/authManage/insertAuthority.ajax', param, this.formHeaders);
    };
    AuthService.prototype.updateAuthority = function (param) {
        return _super.prototype.reqPost.call(this, '/authManage/updateAuthority.ajax', param, this.formHeaders);
    };
    AuthService.prototype.getDetail = function (authId) {
        return _super.prototype.reqGet.call(this, '/authManage/detail/' + authId + '.ajax');
    };
    return AuthService;
}(net_service_1.NetService));
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map