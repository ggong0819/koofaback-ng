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
var component_1 = require("../../common/component");
/**
 * 상세 코드 콤포넌트 공통 클래스
 */
var CodeChildCommon = (function (_super) {
    __extends(CodeChildCommon, _super);
    function CodeChildCommon(route) {
        var _this = _super.call(this) || this;
        _this.activeRoute = route;
        return _this;
    }
    CodeChildCommon.prototype.ngOnInit = function () {
        this.codeItem = {
            codeId: this.activeRoute.snapshot.params['codeId'],
            codeName: this.activeRoute.snapshot.params['codeName'],
            displayYn: this.activeRoute.snapshot.params['displayYn']
        };
    };
    return CodeChildCommon;
}(component_1.CommonComponent));
exports.CodeChildCommon = CodeChildCommon;
//# sourceMappingURL=code.child.common.js.map