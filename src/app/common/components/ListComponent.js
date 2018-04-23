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
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../component");
var forms_1 = require("@angular/forms");
/**
 * LCMS 비슷한 패턴의 ListComponent Base
 * @author-시공교육 최광윤
 */
var ListComponent = (function (_super) {
    __extends(ListComponent, _super);
    function ListComponent(commonService, route) {
        var _this = _super.call(this) || this;
        _this.commonService = commonService;
        _this.route = route;
        return _this;
    }
    ListComponent.prototype.initListComponent = function () {
        this.initPagenation();
        this.initBaseForm();
        //상세페이지에서 복귀 했을때 기존 폼 데이터 셋팅 및 페이징 처리
        if (this.route.snapshot.params['type'] == undefined || this.route.snapshot.params['type'] != "userback") {
            this.initForm();
        }
        else {
            this.searchForm = this.commonService.formData;
            _super.prototype.setPage.call(this, this.searchForm.controls['pageNo'].value);
            if (this.searchForm == null) {
                this.initForm();
            }
        }
        this.searchSubmit();
    };
    //List 관련 폼 그룹, 컨트롤 설정
    ListComponent.prototype.initBaseForm = function () {
        this.searchForm = new forms_1.FormGroup({
            listSize: new forms_1.FormControl(10),
            pageNo: new forms_1.FormControl(1)
        });
    };
    ListComponent.prototype.pageChanged = function (event) {
        _super.prototype.setPage.call(this, event);
        this.searchForm.controls['pageNo'].setValue(event);
        this.searchSubmit();
    };
    return ListComponent;
}(component_1.CommonComponent));
exports.ListComponent = ListComponent;
//# sourceMappingURL=ListComponent.js.map