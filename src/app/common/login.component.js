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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var user_service_1 = require("../settings/user/user.service");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var component_1 = require("../common/component");
var auth_service_1 = require("../services/auth.service");
var LoginComponent = (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(userService, route, router, fb, sanitizer, authService) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.sanitizer = sanitizer;
        _this.authService = authService;
        _this.alertModalMsg = "";
        _this.loginForm = _this.fb.group({
            loginId: [_this.savedLoginId, [forms_1.Validators.required]],
            password: ["", forms_1.Validators.required],
            name: ["", forms_1.Validators.required],
            nickName: ["", forms_1.Validators.required],
            cfrmPassword: ["", forms_1.Validators.required]
            //  email: ["", [Validators.required,emailValidator]],
        });
        _this.userRegForm = _this.fb.group({
            loginId: ["", [forms_1.Validators.required]],
            password: ["", forms_1.Validators.required],
            name: ["", forms_1.Validators.required],
            nickName: ["", forms_1.Validators.required],
            cfrmPassword: ["", forms_1.Validators.required]
            //  email: ["", [Validators.required,emailValidator]],
        });
        return _this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        reloadHeight();
        if (localStorage.getItem('savedLoginId') && 'null' != localStorage.getItem('savedLoginId')) {
            this.savedLoginId = localStorage.getItem('savedLoginId');
            this.loginForm.controls['loginId'].setValue(this.savedLoginId);
        }
    };
    LoginComponent.prototype.doLogin = function () {
        var formData = this.loginForm.value;
        var saveIdCheckbox = document.getElementById('saveId');
        if (saveIdCheckbox.checked) {
            localStorage.setItem('savedLoginId', this.loginForm.controls.loginId.value);
        }
        this.authService.login(formData);
    };
    LoginComponent.prototype.doRegist = function () {
        var _this = this;
        if (!this.checkedDuplication) {
            alert('아이디 중복검사를 진행해주세요.');
            return false;
        }
        var regExp = new RegExp('^[a-zA-Z0-9]+$');
        if (regExp.test(this.userRegForm.controls.password.value) || this.userRegForm.controls.password.value.length < 8) {
            alert('비밀번호에 특수문자 포함 8자 이상 입력해주세요.');
            return false;
        }
        if (this.userRegForm.controls.password.value !== this.userRegForm.controls.cfrmPassword.value) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        var formData = this.userRegForm.value;
        var observable = this.userService.registUser(formData);
        observable.subscribe(function (response) {
            // console.log("successResponse:", response);
            if (response.success) {
                _this.userRegForm.reset();
                alert("등록되었습니다.\n관리자 승인을 기다려 주세요.");
            }
            else {
                alert(response.errorMsg);
            }
        }, function (error) {
            console.log("Error happened" + error);
            alert('등록에 실패하였습니다. ');
        }, function () { console.log("the subscription is completed"); });
    };
    LoginComponent.prototype.saveLoginId = function (event) {
        var saveValue;
        if (event.target.checked) {
            saveValue = this.loginForm.controls.loginId.value;
        }
        else {
            saveValue = '';
        }
        localStorage.setItem('savedLoginId', saveValue);
    };
    LoginComponent.prototype.getUserInfo = function (value) {
        var _this = this;
        if (value) {
            var result = this.userService.getUserInfoById(value);
            result.subscribe(function (response) {
                // console.log("successResponse:"+response.result);
                _this.user = response;
            }, function (error) { console.log("Error happened" + error); }, function () { console.log("the subscription is completed"); });
        }
        else {
            this.route.params
                .switchMap(function (params) { return _this.userService.getUserInfoById(+params['id']); })
                .subscribe(function (response) { return _this.user = response; });
        }
    };
    LoginComponent.prototype.goHome = function () {
        this.router.navigateByUrl('/');
    };
    LoginComponent.prototype.checkDuplication = function () {
        var _this = this;
        if ('' == this.userRegForm.controls.loginId.value) {
            alert('ID를 입력해주세요.');
            return false;
        }
        var param = { 'loginId': this.userRegForm.controls.loginId.value };
        this.userService.checkDuplication(param).subscribe(function (response) {
            if (!response.result.duplicate) {
                _this.checkedDuplication = true;
                alert("사용 가능한 아이디 입니다. ");
            }
            else {
                alert("이미 사용중인 아이디 입니다. ");
            }
        }, function (error) {
            if (error) {
                // console.log("Error happened" , error);
                alert("중복확인에 실패하였습니다. 관리자에게 문의 해주세요.\n" + error);
            }
        });
    };
    LoginComponent.prototype.setUnchecked = function () {
        // console.log(this.insertForm.controls['loginId'].value);
        this.checkedDuplication = false;
    };
    LoginComponent.prototype.initModalData = function () {
        this.userRegForm.reset();
    };
    return LoginComponent;
}(component_1.CommonComponent));
__decorate([
    core_1.ViewChild('alertModal'),
    __metadata("design:type", ngx_bootstrap_1.ModalDirective)
], LoginComponent.prototype, "alertModal", void 0);
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'login.component.html',
        providers: [user_service_1.UserService, auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        platform_browser_1.DomSanitizer,
        auth_service_1.AuthService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
function emailValidator(fc) {
    console.log('이메일도 체크한다~~~');
    if (fc.value.indexOf('magic') >= 0) {
        console.log('not valid');
        return {
            noMagic: true
        };
    }
    // Null means valid, believe it or not
    console.log('valid');
    return null;
}
//# sourceMappingURL=login.component.js.map