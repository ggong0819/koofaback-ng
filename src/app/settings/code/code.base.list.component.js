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
var router_1 = require("@angular/router");
var main_content_component_1 = require("../../layout/main-content.component");
var common_service_1 = require("../../services/common.service");
var code_service_1 = require("./code.service");
var ListComponent_1 = require("../../common/components/ListComponent");
/**
 * 베이스 코드 리스트 콤포넌트
 * @author : [시공교육 최광윤]
 * @Date : 2017.03.21
 */
var CodeBaseListComponent = (function (_super) {
    __extends(CodeBaseListComponent, _super);
    /**
     * 생성자
     * @param net
     * @param mainComponent
     */
    function CodeBaseListComponent(
        // private net: NetService, 
        mainComponent, route, router, commonService, codeService) {
        var _this = _super.call(this, commonService, route) || this;
        _this.mainComponent = mainComponent;
        _this.route = route;
        _this.router = router;
        _this.commonService = commonService;
        _this.codeService = codeService;
        /**
         * 검색 타입 정의
         */
        _this.searchTypes = [
            { name: '코드명', value: 1 },
            { name: '코드번호', value: 2 }
        ];
        mainComponent.menu = {
            category: "설정",
            menu: "코드 관리"
        };
        return _this;
    }
    CodeBaseListComponent.prototype.ngOnInit = function () {
        this.initListComponent();
    };
    //Overriding
    CodeBaseListComponent.prototype.searchSubmit = function () {
        var _this = this;
        this.searchForm.addControl('parentCodeId', new forms_1.FormControl('0'));
        this.codeService.codeList(this.searchForm.value)
            .subscribe(function (res) {
            _super.prototype.setPagination.call(_this, res.result);
            _this.listData = res.result.list;
        }, function (err) {
            if (err) {
                console.log('err');
            }
        });
    };
    //Overriding
    CodeBaseListComponent.prototype.initForm = function () {
        this.searchForm.addControl('displayYn', new forms_1.FormControl(''));
        this.searchForm.addControl('searchType', new forms_1.FormControl(this.searchTypes[0].value));
        this.searchForm.addControl('searchText', new forms_1.FormControl(''));
    };
    CodeBaseListComponent.prototype.moveCreate = function () {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/code/base/manage', { type: 'create' }]);
    };
    CodeBaseListComponent.prototype.moveDetail = function (selectedItem) {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/code/base/manage', { type: 'modify', codeId: selectedItem.codeId }]);
    };
    CodeBaseListComponent.prototype.moveChildCodeList = function (selectedItem) {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/code/child/list',
            {
                codeId: selectedItem.codeId,
                codeName: selectedItem.codeName,
                displayYn: selectedItem.displayYn
            }]);
    };
    return CodeBaseListComponent;
}(ListComponent_1.ListComponent));
CodeBaseListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'code.base.list.component.html',
    }),
    __metadata("design:paramtypes", [main_content_component_1.MainContentComponent,
        router_1.ActivatedRoute,
        router_1.Router,
        common_service_1.CommonService,
        code_service_1.CodeService])
], CodeBaseListComponent);
exports.CodeBaseListComponent = CodeBaseListComponent;
//# sourceMappingURL=code.base.list.component.js.map