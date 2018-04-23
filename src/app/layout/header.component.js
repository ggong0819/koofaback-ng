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
var forms_1 = require("@angular/forms");
var auth_service_1 = require("../services/auth.service");
var user_service_1 = require("../settings/user/user.service");
var config_1 = require("../config/config");
var component_1 = require("../common/component");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var HeaderComponent = (function (_super) {
    __extends(HeaderComponent, _super);
    function HeaderComponent(authService, userService, fb) {
        var _this = _super.call(this) || this;
        _this.authService = authService;
        _this.userService = userService;
        _this.fb = fb;
        _this.passwordForm = _this.fb.group({
            userId: [''],
            currentPassword: [""],
            newPassword: [""],
            cfrmPassword: ["",]
        });
        var userData = localStorage.getItem(config_1.config.localStorageUserInfoKey);
        if (userData) {
            _this.userInfo = JSON.parse(userData);
            if (_this.userInfo && _this.userInfo.menuList) {
                _this.passwordForm.controls['userId'].setValue(_this.userInfo.userId);
            }
        }
        return _this;
    }
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
    };
    HeaderComponent.prototype.initModalData = function () {
        this.passwordForm.reset();
    };
    HeaderComponent.prototype.changePassword = function () {
        var _this = this;
        var regExp = new RegExp('^[a-zA-Z0-9]+$');
        if ('' == this.passwordForm.controls.currentPassword.value) {
            alert('현재 비밀번호를 입력해주세요.');
            return;
        }
        if ('' == this.passwordForm.controls.newPassword.value || '' == this.passwordForm.controls.cfrmPassword.value) {
            alert('새로운 비밀번호를 입력해주세요.');
            return;
        }
        if (regExp.test(this.passwordForm.controls.newPassword.value) || this.passwordForm.controls.cfrmPassword.value.length < 8) {
            alert('비밀번호에 특수문자 포함 8자 이상 입력해주세요.');
            return;
        }
        if (this.passwordForm.controls.newPassword.value !== this.passwordForm.controls.cfrmPassword.value) {
            alert('변경할 비밀번호가 일치하지 않습니다.');
            return;
        }
        var observable = this.userService.changeUserPassword(this.passwordForm.value);
        observable.subscribe(function (response) {
            if (response.success) {
                _this.passwordForm.reset();
                alert("비밀번호가 변경되었습니다.");
                _this.passwordChangeModal.hide();
            }
            else {
                alert(response.errorMsg);
            }
        }, function (error) {
            if (error) {
                // console.log("Error happened" , error);
                alert("저장에 실패하였습니다.\n" + error);
            }
        }, function () {
            // console.log("the subscription is completed")
        });
    };
    return HeaderComponent;
}(component_1.CommonComponent));
__decorate([
    core_1.ViewChild('passwordChangeModal'),
    __metadata("design:type", ngx_bootstrap_1.ModalDirective)
], HeaderComponent.prototype, "passwordChangeModal", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'top-header',
        templateUrl: 'header.component.html',
        providers: [auth_service_1.AuthService, user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        forms_1.FormBuilder])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map