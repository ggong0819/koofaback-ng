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
var main_content_component_1 = require("../../layout/main-content.component");
var common_service_1 = require("../../services/common.service");
var code_child_common_1 = require("./code.child.common");
var code_service_1 = require("./code.service");
var CodeChildListComponent = (function (_super) {
    __extends(CodeChildListComponent, _super);
    function CodeChildListComponent(mainComponent, route, router, commonSerivce, codeService) {
        var _this = _super.call(this, route) || this;
        _this.mainComponent = mainComponent;
        _this.route = route;
        _this.router = router;
        _this.commonSerivce = commonSerivce;
        _this.codeService = codeService;
        mainComponent.menu = {
            category: "설정",
            menu: "상세 코드 관리"
        };
        return _this;
    }
    CodeChildListComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.requestCodeDetailList();
    };
    CodeChildListComponent.prototype.requestCodeDetailList = function () {
        var _this = this;
        this.codeService.codeList({ parentCodeId: this.codeItem.codeId, listSize: 1000, pageNo: 1 })
            .subscribe(function (res) {
            _this.listStartIndex = res.result.pageInfo.totalCnt;
            _this.listData = res.result.list;
        }, function (err) {
            if (err) {
                console.log('err');
            }
        });
    };
    CodeChildListComponent.prototype.moveInsertPage = function () {
        console.log("moveChild Manage create");
        this.router.navigate(['/settings/code/child/manage',
            {
                type: 'create',
                codeId: this.codeItem.codeId,
                codeName: this.codeItem.codeName,
                displayYn: this.codeItem.displayYn
            }]);
    };
    CodeChildListComponent.prototype.moveDetail = function (selectedItem) {
        console.log("moveChild Manage Update");
        this.router.navigate(['/settings/code/child/manage',
            {
                type: 'modify',
                codeId: this.codeItem.codeId,
                codeName: this.codeItem.codeName,
                displayYn: this.codeItem.displayYn,
                id: selectedItem.codeId
            }]);
    };
    CodeChildListComponent.prototype.moveBackToList = function () {
        this.router.navigate(['/settings/code/base/list', { type: 'userback' }]);
    };
    return CodeChildListComponent;
}(code_child_common_1.CodeChildCommon));
CodeChildListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'code.child.list.component.html',
    }),
    __metadata("design:paramtypes", [main_content_component_1.MainContentComponent,
        router_1.ActivatedRoute,
        router_1.Router,
        common_service_1.CommonService,
        code_service_1.CodeService])
], CodeChildListComponent);
exports.CodeChildListComponent = CodeChildListComponent;
//# sourceMappingURL=code.child.list.component.js.map