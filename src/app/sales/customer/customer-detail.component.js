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
var customer_service_1 = require("./customer.service");
var main_content_component_1 = require("../../layout/main-content.component");
var person_component_1 = require("./person.component");
var person_directive_1 = require("./person.directive");
var config_1 = require("../../config/config");
var SelectBoxComponent_1 = require("../../common/components/selectbox/SelectBoxComponent");
var CustomerDetailComponent = (function (_super) {
    __extends(CustomerDetailComponent, _super);
    function CustomerDetailComponent(route, router, fb, mainComponent, customerService, resolver) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.mainComponent = mainComponent;
        _this.customerService = customerService;
        _this.resolver = resolver;
        _this.customerInfo = {};
        _this.checkedDuplication = false;
        _this.isCreateMode = false;
        _this.customerTypeCodeList = [];
        _this.customerTypeCodeOptions = [];
        _this.personList = [];
        _this.personBoxIndex = -1;
        _this.submitTitle = '등록';
        _this.insertForm = _this.fb.group({
            customerId: [],
            customerTypeCode: [],
            corpName: [],
            corpRegNum: [],
            representPersonName: [],
            address: [],
            businessCondition: [],
            businessItem: [],
            homepageUrl: []
        });
        //최초 가지고 와야할 코드들..
        _this.route.data
            .subscribe(function (data) {
            var commonCode = data.commonCode;
            _this.customerTypeCodeList = [{ codeId: '', codeName: '선택', childCodeList: null }];
            for (var _i = 0, _a = commonCode.getCustomerTypeCodeList(); _i < _a.length; _i++) {
                var code = _a[_i];
                _this.customerTypeCodeList.push(code);
            }
        });
        return _this;
    }
    CustomerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.defaultCustomerTypeCode = "";
        if (this.route.snapshot.params['type'] == 'create') {
            this.isCreateMode = true;
            this.mainComponent.menu = {
                category: "영업",
                menu: "고객관리 > 등록"
            };
            this.addRow();
        }
        else {
            this.customerId = this.route.snapshot.params['customerId'];
            this.mainComponent.menu = {
                category: "영업",
                menu: "고객관리 > 수정"
            };
            this.submitTitle = "저장";
            var customerObservable = this.customerService.getDetail(this.customerId);
            customerObservable.subscribe(function (response) {
                if (response.customerInfo) {
                    _this.customerInfo = response.customerInfo;
                    if (null != _this.customerInfo.customerTypeCode) {
                        _this.customerTypeCodeBox.setOpionValue(_this.customerInfo.customerTypeCode);
                    }
                    _this.insertForm.controls['customerId'].setValue(_this.customerInfo.customerId, {});
                    _this.insertForm.controls['corpName'].setValue(_this.customerInfo.corpName, {});
                    _this.insertForm.controls['corpRegNum'].setValue(_this.customerInfo.corpRegNum, {});
                    _this.insertForm.controls['representPersonName'].setValue(_this.customerInfo.representPersonName, {});
                    _this.insertForm.controls['address'].setValue(_this.customerInfo.address, {});
                    _this.insertForm.controls['businessCondition'].setValue(_this.customerInfo.businessCondition, {});
                    _this.insertForm.controls['businessItem'].setValue(_this.customerInfo.businessItem, {});
                    _this.insertForm.controls['homepageUrl'].setValue(_this.customerInfo.homepageUrl, {});
                    _this.initFormData = _this.insertForm.value;
                    _this.corpRegistFilePath = _this.customerInfo.corpRegistFilePath;
                    _this.beforePersonList = response.personList;
                    if (_this.beforePersonList.length > 0) {
                        for (var _i = 0, _a = _this.beforePersonList; _i < _a.length; _i++) {
                            var person = _a[_i];
                            _this.addRow(person);
                        }
                    }
                    else {
                        _this.addRow();
                    }
                }
            }, function (error) {
                if (error) {
                    alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
                }
            });
        }
    };
    CustomerDetailComponent.prototype.goList = function () {
        this.router.navigate(['/sales/customer/list']);
    };
    CustomerDetailComponent.prototype.save = function () {
        if (!confirm('저장하시겠습니까?')) {
            return false;
        }
        var formData = this.insertForm.value;
        var mFormData = new FormData();
        mFormData.append("customerId", formData.customerId);
        mFormData.append("corpName", formData.corpName);
        mFormData.append("corpRegNum", formData.corpRegNum);
        if (this.corpRegistImgFile) {
            mFormData.append("imgFile", this.corpRegistImgFile, this.corpRegistImgFile.name);
        }
        mFormData.append("representPersonName", formData.representPersonName);
        mFormData.append("address", formData.address);
        mFormData.append("customerTypeCode", this.customerTypeCodeBox.getSelectedValue());
        mFormData.append("businessCondition", formData.businessCondition);
        mFormData.append("businessItem", formData.businessItem);
        mFormData.append("homepageUrl", formData.homepageUrl);
        for (var i = 0; i < this.personList.length; i++) {
            var personComponent = this.personList[i];
            var personData = personComponent.instance.getPersonData();
            if (personData.name == null || personData.name == '') {
                alert('담당자 이름을 입력해주세요.');
                return;
            }
            mFormData.append("personList", JSON.stringify(personData));
        }
        if (this.isCreateMode) {
            this.insertCustomer(mFormData);
        }
        else {
            this.updateCustomer(mFormData);
        }
    };
    CustomerDetailComponent.prototype.pageChanged = function (event) {
        _super.prototype.setPage.call(this, event);
    };
    CustomerDetailComponent.prototype.insertCustomer = function (formData) {
        var _this = this;
        var observable = this.customerService.registCustomer(formData);
        observable.subscribe(function (response) {
            if (response.success) {
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
    CustomerDetailComponent.prototype.updateCustomer = function (formData) {
        // if(formData == this.initFormData){
        //     alert('변경 사항이 없습니다.');
        //     return false;
        // }
        var observable = this.customerService.updateCustomer(formData);
        observable.subscribe(function (response) {
            if (response.success) {
                alert("저장되었습니다.");
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
    CustomerDetailComponent.prototype.addRow = function (initData) {
        this.personBoxIndex = this.personList.length;
        var componentFactory = this.resolver.resolveComponentFactory(person_component_1.PersonComponent);
        var viewContainerRef = this.personHost.viewContainerRef;
        var componentRef = viewContainerRef.createComponent(componentFactory);
        this.personList[this.personBoxIndex] = componentRef;
        componentRef.instance.hostViewContainerRef = viewContainerRef;
        componentRef.instance.personList = this.personList;
        componentRef.instance.nodeIndex = this.personBoxIndex;
        if (initData) {
            componentRef.instance.name = initData.name;
            componentRef.instance.position = initData.position;
            componentRef.instance.tel = initData.tel;
            componentRef.instance.mobile = initData.mobile;
            componentRef.instance.email = initData.email;
            componentRef.instance.division = initData.division;
            componentRef.instance.memo = initData.memo;
        }
    };
    CustomerDetailComponent.prototype.selectFile = function (event) {
        var file = event.target.files[0];
        this.corpRegistImgFile = file;
    };
    CustomerDetailComponent.prototype.getImage = function () {
        window.open(config_1.config.apiEndPoint + '/customer/getCorpRegImage.view?customerId=' + this.customerInfo.customerId);
    };
    return CustomerDetailComponent;
}(component_1.CommonComponent));
__decorate([
    core_1.ViewChild(person_directive_1.PersonDirective),
    __metadata("design:type", person_directive_1.PersonDirective)
], CustomerDetailComponent.prototype, "personHost", void 0);
__decorate([
    core_1.ViewChild('customerTypeCodeBox'),
    __metadata("design:type", SelectBoxComponent_1.SelectBoxComponent)
], CustomerDetailComponent.prototype, "customerTypeCodeBox", void 0);
CustomerDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'customer-detail.component.html',
        providers: [customer_service_1.CustomerService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        main_content_component_1.MainContentComponent,
        customer_service_1.CustomerService,
        core_1.ComponentFactoryResolver])
], CustomerDetailComponent);
exports.CustomerDetailComponent = CustomerDetailComponent;
//# sourceMappingURL=customer-detail.component.js.map