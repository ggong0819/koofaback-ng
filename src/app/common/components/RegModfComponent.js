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
var RegModfComponent = (function () {
    function RegModfComponent() {
        this.defaultNode = 3;
    }
    return RegModfComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RegModfComponent.prototype, "info", void 0);
RegModfComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'reg-modf',
        template: "\n        <table class=\"table table-bordered\" *ngIf=\"info.commonDataType == undefinded || info.commonDataType == false\">\n            <colgroup>\n                <col class=\"col-md-{{info.node1 || defaultNode}}\">\n                <col class=\"col-md-{{info.node2 || defaultNode}}\">\n                <col class=\"col-md-{{info.node3 || defaultNode}}\">\n                <col class=\"col-md-{{info.node4 || defaultNode}}\">\n            </colgroup>\n            <tbody>\n                <tr role=\"row\">\n                    <th class=\"text-center odd\">\uB4F1\uB85D\uC790</th>\n                    <td class=\"text-center odd\">{{info.regName}}</td>\n                    <th class=\"text-center odd\">\uC218\uC815\uC790</th>                                    \n                    <td class=\"text-center odd\">{{info.modfName}}</td>\n                </tr>\n                <tr role=\"row\">\n                    <th class=\"text-center odd\">\uB4F1\uB85DIP</th>\n                    <td class=\"text-center odd\">{{info.regIp}}</td>\n                    <th class=\"text-center odd\">\uC218\uC815IP</th>                                    \n                    <td class=\"text-center odd\">{{info.modfIp}}</td>\n                </tr>\n                <tr role=\"row\">\n                    <th class=\"text-center odd\">\uB4F1\uB85D\uC77C</th>\n                    <td class=\"text-center odd\">{{info.regDt | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n                    <th class=\"text-center odd\">\uC218\uC815\uC77C</th>                                    \n                    <td class=\"text-center odd\">{{info.modfDt | date:'yyyy-MM-dd HH:mm:ss'}}</td>                                \n                </tr>\n            </tbody>\n        </table>\n\n        <table class=\"table table-bordered\" *ngIf=\"info.commonDataType\">\n            <colgroup>\n                <col class=\"col-md-{{info.node1 || defaultNode}}\">\n                <col class=\"col-md-{{info.node2 || defaultNode}}\">\n                <col class=\"col-md-{{info.node3 || defaultNode}}\">\n                <col class=\"col-md-{{info.node4 || defaultNode}}\">\n            </colgroup>\n            <tbody>\n                <tr role=\"row\">\n                    <th class=\"text-center odd\">\uB4F1\uB85D\uC790</th>\n                    <td class=\"text-center odd\">{{info.regName}}</td>\n                    <th class=\"text-center odd\">\uC218\uC815\uC790</th>                                    \n                    <td class=\"text-center odd\">{{info.modfName}}</td>\n                </tr>\n                <tr role=\"row\">\n                    <th class=\"text-center odd\">\uB4F1\uB85DIP</th>\n                    <td class=\"text-center odd\">{{info.regIp}}</td>\n                    <th class=\"text-center odd\">\uC218\uC815IP</th>                                    \n                    <td class=\"text-center odd\">{{info.modfIp}}</td>\n                </tr>\n                <tr role=\"row\">\n                    <th class=\"text-center odd\">\uB4F1\uB85D\uC77C</th>\n                    <td class=\"text-center odd\">{{info.regDt | date:'yyyy-MM-dd HH:mm:ss'}}</td>\n                    <th class=\"text-center odd\">\uC218\uC815\uC77C</th>                                    \n                    <td class=\"text-center odd\">{{info.modfDt | date:'yyyy-MM-dd HH:mm:ss'}}</td>                                \n                </tr>\n            </tbody>\n        </table>        \n    ",
        styles: ["\n        table {border-top:none;}\n        table tr th {background-color: #f9f9f9;}\n        table tr:first-child th, table tr:first-child td {border-top:none;}\n    "]
    })
], RegModfComponent);
exports.RegModfComponent = RegModfComponent;
//# sourceMappingURL=RegModfComponent.js.map