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
var work_service_1 = require("./work.service");
var customer_service_1 = require("../../sales/customer/customer.service");
var main_content_component_1 = require("../../layout/main-content.component");
var WorkRequestDetailComponent = (function (_super) {
    __extends(WorkRequestDetailComponent, _super);
    function WorkRequestDetailComponent(route, router, fb, mainComponent, workService, customerService, resolver) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.mainComponent = mainComponent;
        _this.workService = workService;
        _this.customerService = customerService;
        _this.resolver = resolver;
        _this.workRequestInfo = {};
        _this.isCreateMode = false;
        //거래처 리스트
        _this.customerInfoList = [];
        //1차구분 코드 리스트
        _this.type1CodeList = [];
        //1차구분 코드 리스트
        _this.type2CodeList = [];
        _this.submitTitle = '등록';
        _this.insertForm = _this.fb.group({
            customerId: [],
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
            _this.type1CodeList = commonCode.getType1CodeList();
            _this.type2CodeList = commonCode.getType2CodeList();
        });
        return _this;
    }
    WorkRequestDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //거래처 리스트 받아오기
        var formData;
        formData.listSize = 100000;
        var observable = this.customerService.search(formData);
        observable.subscribe(function (response) {
            if (response.result) {
                _this.customerInfoList = response.result.list;
            }
            else {
                _this.customerInfoList.length = 0;
            }
        }, function (error) {
            if (error) {
                if (error.result && error.result.errorMsg) {
                    alert('거래처 정보를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
                }
                else {
                    alert('거래처 정보를 가지고 올 수 없습니다.\n' + error);
                }
            }
        });
        if (this.route.snapshot.params['type'] == 'create') {
            this.isCreateMode = true;
            this.mainComponent.menu = {
                category: "업무관리",
                menu: "업무요청 > 등록"
            };
        }
        else {
            this.workRequestId = this.route.snapshot.params['workRequestId'];
            this.mainComponent.menu = {
                category: "업무관리",
                menu: "업무요청 > 등록"
            };
            this.submitTitle = "저장";
            var observable_1 = this.workService.getWorkRequestDetail(this.workRequestId);
            observable_1.subscribe(function (response) {
                if (response.workRequestInfo) {
                    _this.workRequestInfo = response.workRequestInfo;
                    _this.insertForm.controls['workRequestId'].setValue(_this.workRequestInfo.workRequestId, {});
                    _this.insertForm.controls['corpName'].setValue(_this.workRequestInfo.corpName, {});
                    _this.insertForm.controls['corpRegNum'].setValue(_this.workRequestInfo.corpRegNum, {});
                    _this.insertForm.controls['representPersonName'].setValue(_this.workRequestInfo.representPersonName, {});
                    _this.insertForm.controls['address'].setValue(_this.workRequestInfo.address, {});
                    _this.insertForm.controls['businessCondition'].setValue(_this.workRequestInfo.businessCondition, {});
                    _this.insertForm.controls['businessItem'].setValue(_this.workRequestInfo.businessItem, {});
                    _this.insertForm.controls['homepageUrl'].setValue(_this.workRequestInfo.homepageUrl, {});
                    _this.initFormData = _this.insertForm.value;
                }
            }, function (error) {
                if (error) {
                    alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
                }
            });
        }
    };
    WorkRequestDetailComponent.prototype.goList = function () {
        this.router.navigate(['/sales/customer/list']);
    };
    WorkRequestDetailComponent.prototype.save = function () {
        if (!confirm('저장하시겠습니까?')) {
            return false;
        }
        var formData = this.insertForm.value;
        var mFormData = new FormData();
        mFormData.append("customerId", formData.customerId);
        mFormData.append("corpName", formData.corpName);
        mFormData.append("corpRegNum", formData.corpRegNum);
        mFormData.append("representPersonName", formData.representPersonName);
        mFormData.append("address", formData.address);
        mFormData.append("businessCondition", formData.businessCondition);
        mFormData.append("businessItem", formData.businessItem);
        mFormData.append("homepageUrl", formData.homepageUrl);
        if (this.isCreateMode) {
            this.insertWorkRequest(mFormData);
        }
        else {
            this.updateWorkRequest(mFormData);
        }
    };
    WorkRequestDetailComponent.prototype.pageChanged = function (event) {
        _super.prototype.setPage.call(this, event);
    };
    WorkRequestDetailComponent.prototype.insertWorkRequest = function (formData) {
        var _this = this;
        var observable = this.workService.registWorkRequest(formData);
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
    WorkRequestDetailComponent.prototype.updateWorkRequest = function (formData) {
        // if(formData == this.initFormData){
        //     alert('변경 사항이 없습니다.');
        //     return false;
        // }
        var observable = this.workService.updateWorkRequest(formData);
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
    return WorkRequestDetailComponent;
}(component_1.CommonComponent));
WorkRequestDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'work-detail.component.html',
        providers: [work_service_1.WorkService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        main_content_component_1.MainContentComponent,
        work_service_1.WorkService,
        customer_service_1.CustomerService,
        core_1.ComponentFactoryResolver])
], WorkRequestDetailComponent);
exports.WorkRequestDetailComponent = WorkRequestDetailComponent;
//# sourceMappingURL=workRequest-detail.component.js.map