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
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(http) {
        var _this = _super.call(this, http) || this;
        _this.jsonHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        _this.formHeaders = new http_1.Headers({ 'Content-Type': 'x-www-form-urlencoded' });
        _this.statusList = [
            { value: '0', name: '재직 중', checked: true },
            { value: '1', name: '퇴사', checked: true },
            { value: '2', name: '사용중지', checked: true },
            { value: '3', name: '승인대기', checked: true }
        ];
        return _this;
    }
    UserService.prototype.search = function (param) {
        return _super.prototype.reqPost.call(this, '/userMng/list.ajax', param, this.jsonHeaders);
    };
    UserService.prototype.updateUser = function (param) {
        return _super.prototype.reqPost.call(this, '/userMng/updateUser.ajax', param, this.formHeaders);
    };
    UserService.prototype.getDetail = function (userId) {
        return _super.prototype.reqGet.call(this, '/userMng/detail/' + userId + '.ajax');
    };
    UserService.prototype.checkDuplication = function (param) {
        return _super.prototype.reqPost.call(this, '/userMng/checkDuplication.ajax', param, this.jsonHeaders);
    };
    UserService.prototype.registUser = function (param) {
        return _super.prototype.reqPut.call(this, '/userMng/regist.ajax', param, this.formHeaders);
    };
    UserService.prototype.login = function (param) {
        return _super.prototype.reqPost.call(this, '/userMng/login.ajax', param, this.formHeaders);
    };
    UserService.prototype.getUserInfoById = function (id) {
        return _super.prototype.reqGet.call(this, '/userMng/info/' + id + '.ajax');
    };
    UserService.prototype.getLoginLog = function (param) {
        return _super.prototype.reqPost.call(this, '/userMng/loginLog.ajax', param, this.jsonHeaders);
    };
    UserService.prototype.changeUserPassword = function (param) {
        return _super.prototype.reqPost.call(this, '/userMng/changePassword.ajax', param, this.jsonHeaders);
    };
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return UserService;
}(net_service_1.NetService));
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map