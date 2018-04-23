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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var code_child_common_1 = require("./code.child.common");
var main_content_component_1 = require("../../layout/main-content.component");
var common_service_1 = require("../../services/common.service");
var code_service_1 = require("./code.service");
var CodeChildManageComponent = (function (_super) {
    __extends(CodeChildManageComponent, _super);
    function CodeChildManageComponent(route, router, mainComponent, commonService, location, codeService) {
        var _this = _super.call(this, route) || this;
        _this.route = route;
        _this.router = router;
        _this.mainComponent = mainComponent;
        _this.commonService = commonService;
        _this.location = location;
        _this.codeService = codeService;
        _this.isCreateMode = false;
        _this.itemInfo = {
            code_dtl_id: '자동 생성 됩니다.'
        };
        return _this;
    }
    CodeChildManageComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        //폼 데이터 설정
        this.insertForm = new forms_1.FormGroup({
            parentCodeId: new forms_1.FormControl(this.codeItem.codeId),
            codeId: new forms_1.FormControl(this.itemInfo.codeId),
            codeName: new forms_1.FormControl(''),
            displayOrder: new forms_1.FormControl('1'),
            displayYn: new forms_1.FormControl('Y')
        });
        // console.log(this.route.snapshot.params['type']);
        if (this.route.snapshot.params['type'] == 'create') {
            this.mainComponent.menu = {
                category: "설정",
                menu: "상세 코드 관리 > 등록"
            };
            this.isCreateMode = true;
        }
        else {
            this.mainComponent.menu = {
                category: "설정",
                menu: "상세 코드 관리 > 수정"
            };
            this.itemInfo.codeId = this.route.snapshot.params['id'];
            this.requestDetailCodeInfo();
        }
    };
    CodeChildManageComponent.prototype.requestDetailCodeInfo = function () {
        var _this = this;
        var param = {
            codeId: this.itemInfo.codeId
        };
        this.codeService.getCodeInfo(param)
            .subscribe(function (res) {
            _this.itemInfo = res.result;
            _this.insertForm.controls['codeId'].setValue(_this.itemInfo.codeId);
            _this.insertForm.controls['codeName'].setValue(_this.itemInfo.codeName);
            _this.insertForm.controls['displayOrder'].setValue(_this.itemInfo.displayOrder);
            _this.insertForm.controls['displayYn'].setValue(_this.itemInfo.displayYn);
        }, function (err) {
            if (err) {
                alert('상세 코드 정보 요청을 실패 하였습니다. 네트워크 오류');
            }
        });
    };
    CodeChildManageComponent.prototype.submit = function () {
        var _this = this;
        var res = confirm("저장 하시겠습니까?");
        if (res == true) {
            var params = this.insertForm.value;
            if (this.isCreateMode) {
                this.codeService.insertCommonCode(params)
                    .subscribe(function (res) {
                    if (res.success) {
                        alert('코드 생성을 성공 하였습니다.');
                        _this.commonService.refreshCodeData();
                        _this.backToList();
                    }
                    else {
                        alert('코드 생성을 실패 하였습니다.');
                    }
                }, function (err) {
                    if (err) {
                        alert('코드 생성을 실패 하였습니다. 네트워크 오류');
                    }
                });
            }
            else {
                params.codeId = this.itemInfo.codeId;
                this.codeService.updateCommonCode(params)
                    .subscribe(function (res) {
                    if (res.success) {
                        alert('저장을 성공 하였습니다.');
                        _this.commonService.refreshCodeData();
                        _this.backToList();
                    }
                    else {
                        alert('저장을 실패 하였습니다.');
                    }
                }, function (err) {
                    if (err) {
                        alert('저장을 실패 하였습니다. 네트워크 오류');
                    }
                });
            }
        }
    };
    CodeChildManageComponent.prototype.backToList = function () {
        this.location.back();
    };
    return CodeChildManageComponent;
}(code_child_common_1.CodeChildCommon));
CodeChildManageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'code.child.manage.component.html',
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        main_content_component_1.MainContentComponent,
        common_service_1.CommonService,
        common_1.Location,
        code_service_1.CodeService])
], CodeChildManageComponent);
exports.CodeChildManageComponent = CodeChildManageComponent;
//# sourceMappingURL=code.child.manage.component.js.map