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
var customer_service_1 = require("./customer.service");
var main_content_component_1 = require("../../layout/main-content.component");
var ListComponent_1 = require("../../common/components/ListComponent");
var common_service_1 = require("../../services/common.service");
var CustomerListComponent = (function (_super) {
    __extends(CustomerListComponent, _super);
    function CustomerListComponent(route, router, fb, mainComponent, customerService, commonService) {
        var _this = _super.call(this, commonService, route) || this;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.mainComponent = mainComponent;
        _this.customerService = customerService;
        _this.commonService = commonService;
        _this.results = [];
        _this.authList = [];
        _this.realListSize = 20;
        mainComponent.menu = {
            category: "영업",
            menu: "고객관리"
        };
        _this.searchTypeOptions = [
            { id: "corpName", name: '상호' },
            { id: "representPersonName", name: '대표자이름' },
            { id: "corpRegNum", name: '사업자등록번호' },
            { id: "personName", name: '담당자명' }
        ];
        return _this;
    }
    CustomerListComponent.prototype.ngOnInit = function () {
        this.initListComponent();
    };
    CustomerListComponent.prototype.initForm = function () {
        this.searchForm.addControl('searchType', new forms_1.FormControl(this.searchTypeOptions[0].id));
        this.searchForm.addControl('searchText', new forms_1.FormControl(""));
    };
    CustomerListComponent.prototype.searchSubmit = function () {
        var _this = this;
        this.searchForm.controls['listSize'].setValue(this.realListSize, {});
        var formData = this.searchForm.value;
        var observable = this.customerService.search(formData);
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
                if (error.result && error.result.errorMsg) {
                    alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
                }
                else {
                    alert('data를 가지고 올 수 없습니다.\n' + error);
                }
            }
        });
    };
    CustomerListComponent.prototype.goDetail = function (customerId) {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/sales/customer/detail', { type: 'modify', customerId: customerId }]);
    };
    CustomerListComponent.prototype.createCustomer = function () {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/sales/customer/detail', { type: 'create' }]);
    };
    return CustomerListComponent;
}(ListComponent_1.ListComponent));
CustomerListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'customer-list.component.html',
        providers: [customer_service_1.CustomerService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        main_content_component_1.MainContentComponent,
        customer_service_1.CustomerService,
        common_service_1.CommonService])
], CustomerListComponent);
exports.CustomerListComponent = CustomerListComponent;
//# sourceMappingURL=customer-list.component.js.map