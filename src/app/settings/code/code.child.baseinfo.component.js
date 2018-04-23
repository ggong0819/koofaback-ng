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
var CodeBaseInfoTable = (function () {
    function CodeBaseInfoTable() {
    }
    return CodeBaseInfoTable;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CodeBaseInfoTable.prototype, "codeItem", void 0);
CodeBaseInfoTable = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'code-base-info',
        template: "\n        <div class=\"box-body\">                \n            <table class=\"table table-bordered\">\n                <thead>\n                    <tr role=\"row\">\n                        <th class=\"text-center col-sm-4\" style=\"vertical-align:middle;background-color: #f9f9f9;\">\uCF54\uB4DC\uBC88\uD638</th>\n                        <th class=\"text-center col-sm-4\" style=\"vertical-align:middle;background-color: #f9f9f9;\">\uCF54\uB4DC\uBA85</th>\n                        <th class=\"text-center col-sm-4\" style=\"vertical-align:middle;background-color: #f9f9f9;\">\uC0AC\uC6A9\uC5EC\uBD80</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr>\n                        <td class=\"text-center col-sm-4\" style=\"vertical-align:middle;\">{{codeItem.codeId}}</td>\n                        <td class=\"text-center col-sm-4\" style=\"vertical-align:middle;\">{{codeItem.codeName}}</td>\n                        <td class=\"text-center col-sm-4\" style=\"vertical-align:middle;\" *ngIf=\"codeItem.displayYn == 'Y'\">\uC0AC\uC6A9</td>\n                        <td class=\"text-center col-sm-4\" style=\"vertical-align:middle;\" *ngIf=\"codeItem.displayYn == 'N'\">\uBBF8\uC0AC\uC6A9</td>                            \n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    "
    })
], CodeBaseInfoTable);
exports.CodeBaseInfoTable = CodeBaseInfoTable;
//# sourceMappingURL=code.child.baseinfo.component.js.map