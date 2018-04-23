"use strict";
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
var code_service_1 = require("./code.service");
var main_content_component_1 = require("../../layout/main-content.component");
var router_1 = require("@angular/router");
var common_service_1 = require("../../services/common.service");
/**
 * 코드 등록 콤포넌트
 * @author : [시공교육 최광윤]
 * @data : 2017.03.21
 */
var CodeManageComponent = (function () {
    function CodeManageComponent(mainComponent, fb, route, router, commonService, codeService) {
        this.mainComponent = mainComponent;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.commonService = commonService;
        this.codeService = codeService;
        this.isCreateMode = false;
        this.itemInfo = {
            code_base_id: '자동 생성 됩니다.'
        };
        this.submitTitle = '등록';
    }
    CodeManageComponent.prototype.ngOnInit = function () {
        //폼 데이터 설정
        this.insertForm = this.fb.group({
            'displayYn': ['Y', null],
            'codeName': ['', null]
        });
        if (this.route.snapshot.params['type'] == 'create') {
            this.mainComponent.menu = {
                category: "설정",
                menu: "코드 관리 > 등록"
            };
            this.isCreateMode = true;
        }
        else {
            this.mainComponent.menu = {
                category: "설정",
                menu: "코드 관리 > 수정"
            };
            this.submitTitle = '저장';
            this.requestDetailInfo(this.route.snapshot.params['codeId']);
        }
    };
    CodeManageComponent.prototype.submit = function () {
        var res = confirm("저장하시겠습니까?");
        if (res == true) {
            if (this.isCreateMode) {
                this.insertSubmit();
            }
            else {
                this.modifySubmit();
            }
        }
    };
    CodeManageComponent.prototype.insertSubmit = function () {
        var _this = this;
        var param = this.insertForm.value;
        param.parentCodeId = 0;
        this.codeService.insertCommonCode(this.insertForm.value)
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
    };
    CodeManageComponent.prototype.backToList = function () {
        this.router.navigate(['/settings/code/base/list', { type: 'userback' }]);
    };
    CodeManageComponent.prototype.requestDetailInfo = function (id) {
        var _this = this;
        this.codeService.getCodeInfo({ codeId: id })
            .subscribe(function (res) {
            _this.itemInfo = res.result;
            _this.insertForm.controls['displayYn'].setValue(_this.itemInfo.displayYn);
            _this.insertForm.controls['codeName'].setValue(_this.itemInfo.codeName);
            _this.itemInfo.node1 = 2;
            _this.itemInfo.node2 = 4;
            _this.itemInfo.node3 = 2;
            _this.itemInfo.node4 = 4;
        }, function (err) {
            if (err) {
                console.log('err');
            }
        });
    };
    CodeManageComponent.prototype.modifySubmit = function () {
        var _this = this;
        this.itemInfo.codeName = this.insertForm.controls['codeName'].value;
        this.itemInfo.displayYn = this.insertForm.controls['displayYn'].value;
        this.codeService.updateCommonCode(this.itemInfo)
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
    };
    return CodeManageComponent;
}());
CodeManageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'code.base.manage.component.html',
    }),
    __metadata("design:paramtypes", [main_content_component_1.MainContentComponent,
        forms_1.FormBuilder,
        router_1.ActivatedRoute,
        router_1.Router,
        common_service_1.CommonService,
        code_service_1.CodeService])
], CodeManageComponent);
exports.CodeManageComponent = CodeManageComponent;
//# sourceMappingURL=code.base.manage.component.js.map