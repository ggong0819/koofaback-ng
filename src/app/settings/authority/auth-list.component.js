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
var auth_service_1 = require("./auth.service");
var main_content_component_1 = require("../../layout/main-content.component");
var ListComponent_1 = require("../../common/components/ListComponent");
var common_service_1 = require("../../services/common.service");
var AuthrityMngListComponent = (function (_super) {
    __extends(AuthrityMngListComponent, _super);
    function AuthrityMngListComponent(route, router, fb, mainComponent, authService, commonService) {
        var _this = _super.call(this, commonService, route) || this;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.mainComponent = mainComponent;
        _this.authService = authService;
        _this.commonService = commonService;
        _this.results = [];
        _this.realListSize = 20;
        mainComponent.menu = {
            category: "설정",
            menu: "권한관리"
        };
        return _this;
    }
    AuthrityMngListComponent.prototype.initForm = function () {
        this.searchForm.addControl('displayYn', new forms_1.FormControl(""));
        this.searchForm.addControl('authName', new forms_1.FormControl(""));
    };
    AuthrityMngListComponent.prototype.ngOnInit = function () {
        this.initListComponent();
    };
    AuthrityMngListComponent.prototype.goDetail = function (authId) {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/authorityMng/detail/' + authId, { type: 'modify' }]);
    };
    AuthrityMngListComponent.prototype.goRegist = function () {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/authorityMng/insert', { type: 'create' }]);
    };
    AuthrityMngListComponent.prototype.searchSubmit = function () {
        var _this = this;
        this.searchForm.controls['listSize'].setValue(this.realListSize, {});
        var formData = this.searchForm.value;
        var observable = this.authService.doSearch(formData);
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
    return AuthrityMngListComponent;
}(ListComponent_1.ListComponent));
AuthrityMngListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'auth-list.component.html',
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        main_content_component_1.MainContentComponent,
        auth_service_1.AuthService,
        common_service_1.CommonService])
], AuthrityMngListComponent);
exports.AuthrityMngListComponent = AuthrityMngListComponent;
//# sourceMappingURL=auth-list.component.js.map