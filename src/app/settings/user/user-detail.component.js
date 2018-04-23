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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var component_1 = require("../../common/component");
var user_service_1 = require("./user.service");
var auth_service_1 = require("../authority/auth.service");
var main_content_component_1 = require("../../layout/main-content.component");
var UserDetailComponent = (function (_super) {
    __extends(UserDetailComponent, _super);
    function UserDetailComponent(route, router, fb, mainComponent, userService, authService) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.mainComponent = mainComponent;
        _this.userService = userService;
        _this.authService = authService;
        _this.authList = [];
        _this.userInfo = {};
        _this.loginLogList = [];
        _this.checkedDuplication = false;
        _this.insertForm = _this.fb.group({
            userId: [],
            loginId: [,],
            name: [,],
            password: [,],
            authId: [],
            status: [,],
        });
        _this.loginLogForm = _this.fb.group({
            listSize: [20,],
            pageNo: [1,],
        });
        mainComponent.menu = {
            category: "설정",
            menu: "사용자관리"
        };
        return _this;
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = this.route.snapshot.params['userId'];
        var userObservable = this.userService.getDetail(this.userId);
        userObservable.subscribe(function (response) {
            if (response.result) {
                _this.userInfo = response.result.user;
                _this.insertForm.controls['authId'].setValue(_this.userInfo.authId, {});
                _this.insertForm.controls['userId'].setValue(_this.userInfo.userId, {});
                _this.insertForm.controls['loginId'].setValue(_this.userInfo.loginId, {});
                _this.insertForm.controls['name'].setValue(_this.userInfo.name, {});
                _this.insertForm.controls['status'].setValue(_this.userInfo.status, {});
                _this.initFormData = _this.insertForm.value;
            }
        }, function (error) {
            if (error) {
                alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
            }
        });
        var observable = this.authService.retrieveAllList();
        observable.subscribe(function (response) {
            if (response.result) {
                _this.authList = response.result.list;
            }
        }, function (error) {
            if (error) {
                alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
            }
        });
        this.getLoginLog(1);
    };
    UserDetailComponent.prototype.setUnchecked = function () {
        // console.log(this.insertForm.controls['loginId'].value);
        this.checkedDuplication = false;
    };
    UserDetailComponent.prototype.checkDuplication = function () {
        var _this = this;
        var param = { 'loginId': this.insertForm.controls['loginId'].value };
        this.userService.checkDuplication(param).subscribe(function (response) {
            if (!response.result.duplicate) {
                _this.checkedDuplication = true;
                alert("사용 가능한 아이디 입니다.");
            }
            else {
                alert("이미 사용중인 아이디 입니다.");
            }
        }, function (error) {
            if (error) {
                alert('중복확인에 실패하였습니다. 관리자에게 문의 해주세요.\n' + error.result.errorMsg);
            }
        });
    };
    UserDetailComponent.prototype.goList = function () {
        this.router.navigate(['/settings/userMng/list', { type: 'userback' }]);
    };
    UserDetailComponent.prototype.save = function () {
        var _this = this;
        if (!confirm('저장하시겠습니까?')) {
            return false;
        }
        if (this.initFormData.loginId != this.insertForm.controls['loginId'].value) {
            if (!this.checkedDuplication) {
                alert('아이디 중복검사를 진행해주세요.');
                return false;
            }
        }
        var formData = this.insertForm.value;
        if (formData == this.initFormData) {
            alert('변경 사항이 없습니다.');
            return false;
        }
        // console.log(formData)
        // console.log(this.initFormData)
        var observable = this.userService.updateUser(formData);
        observable.subscribe(function (response) {
            if (response.success) {
                _this.insertForm.reset();
                alert("저장되었습니다.");
                _this.goList();
            }
            else {
                alert("저장에 실패하였습니다.:\n" + response.errorMsg);
            }
        }, function (error) {
            if (error) {
                alert('저장에 실패하였습니다.\n' + error.result.errorMsg);
            }
        });
    };
    UserDetailComponent.prototype.getLoginLog = function (pageNo) {
        var _this = this;
        var observable = this.userService.getLoginLog({ 'userId': this.userId, 'pageNo': pageNo, 'listSize': 20 });
        observable.subscribe(function (response) {
            // console.log("successResponse:",response.result);
            _super.prototype.setPagination.call(_this, response.result);
            if (response.result) {
                _this.loginLogList = response.result.list;
            }
            else {
                _this.loginLogList.length = 0;
            }
        }, function (error) {
            if (error) {
                alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
            }
        });
    };
    UserDetailComponent.prototype.pageChanged = function (event) {
        _super.prototype.setPage.call(this, event);
        this.getLoginLog(event);
    };
    return UserDetailComponent;
}(component_1.CommonComponent));
UserDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user-detail.component.html',
        providers: [user_service_1.UserService, auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        main_content_component_1.MainContentComponent,
        user_service_1.UserService,
        auth_service_1.AuthService])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map