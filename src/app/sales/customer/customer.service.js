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
var CustomerService = (function (_super) {
    __extends(CustomerService, _super);
    function CustomerService(http) {
        var _this = _super.call(this, http) || this;
        _this.jsonHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        _this.formHeaders = new http_1.Headers({ 'Content-Type': 'x-www-form-urlencoded' });
        return _this;
    }
    CustomerService.prototype.search = function (param) {
        return _super.prototype.reqPost.call(this, '/customer/list.ajax', param, this.jsonHeaders);
    };
    CustomerService.prototype.updateCustomer = function (param) {
        return _super.prototype.reqPostPart.call(this, '/customer/update.ajax', param, this.formHeaders);
    };
    CustomerService.prototype.getDetail = function (customerId) {
        return _super.prototype.reqGet.call(this, '/customer/detail/' + customerId + '.ajax');
    };
    CustomerService.prototype.registCustomer = function (param) {
        return _super.prototype.reqPostPart.call(this, '/customer/regist.ajax', param, this.formHeaders);
    };
    CustomerService.prototype.getAllCustomerList = function () {
        return _super.prototype.reqPost.call(this, '/customer/allList.ajax', null, this.jsonHeaders);
    };
    CustomerService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        if (currentCustomer && currentCustomer.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentCustomer.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return CustomerService;
}(net_service_1.NetService));
CustomerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map