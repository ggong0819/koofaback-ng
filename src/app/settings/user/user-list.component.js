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
var user_service_1 = require("./user.service");
var auth_service_1 = require("../authority/auth.service");
var main_content_component_1 = require("../../layout/main-content.component");
var ListComponent_1 = require("../../common/components/ListComponent");
var common_service_1 = require("../../services/common.service");
var UserListComponent = (function (_super) {
    __extends(UserListComponent, _super);
    function UserListComponent(route, router, fb, mainComponent, userService, authService, commonService) {
        var _this = _super.call(this, commonService, route) || this;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.mainComponent = mainComponent;
        _this.userService = userService;
        _this.authService = authService;
        _this.commonService = commonService;
        _this.results = [];
        _this.authList = [];
        _this.realListSize = 20;
        mainComponent.menu = {
            category: "설정",
            menu: "사용자관리"
        };
        _this.searchTypeOptions = [
            { id: "name", name: '이름' },
            { id: "loginId", name: '아이디' }
        ];
        _this.statusList = userService.statusList;
        return _this;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.initListComponent();
        if (this.searchForm && this.searchForm.controls['status0']) {
            for (var _i = 0, _a = this.statusList; _i < _a.length; _i++) {
                var status_1 = _a[_i];
                if (this.searchForm.controls['status' + status_1.value].value != null) {
                    status_1.checked = this.searchForm.controls['status' + status_1.value].value;
                }
            }
        }
    };
    UserListComponent.prototype.initForm = function () {
        for (var _i = 0, _a = this.userService.statusList; _i < _a.length; _i++) {
            var status_2 = _a[_i];
            this.searchForm.addControl('status' + status_2.value, new forms_1.FormControl());
        }
        this.searchForm.addControl('authId', new forms_1.FormControl(""));
        this.searchForm.addControl('searchType', new forms_1.FormControl(0));
        this.searchForm.addControl('searchText', new forms_1.FormControl(""));
    };
    UserListComponent.prototype.searchSubmit = function () {
        var _this = this;
        this.searchForm.controls['listSize'].setValue(this.realListSize, {});
        var formData = this.searchForm.value;
        formData.status = this.userSelectedStatList;
        var observable = this.userService.search(formData);
        observable.subscribe(function (response) {
            // console.log("successResponse:",response.result);
            _super.prototype.setPagination.call(_this, response.result);
            if (response.result) {
                _this.results = response.result.list;
            }
            else {
                _this.results.length = 0;
            }
        }, function (error) {
            if (error) {
                alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
            }
        });
    };
    Object.defineProperty(UserListComponent.prototype, "userSelectedStatList", {
        get: function () {
            return this.userService.statusList
                .filter(function (opt) { return opt.checked; })
                .map(function (opt) { return opt.value; });
        },
        enumerable: true,
        configurable: true
    });
    UserListComponent.prototype.goDetail = function (userId) {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/userMng/detail/' + userId, { type: 'modify' }]);
    };
    return UserListComponent;
}(ListComponent_1.ListComponent));
UserListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user-list.component.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        main_content_component_1.MainContentComponent,
        user_service_1.UserService,
        auth_service_1.AuthService,
        common_service_1.CommonService])
], UserListComponent);
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map