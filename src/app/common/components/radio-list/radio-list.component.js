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
// import { UUID } from 'angular2-uuid';
var RadioListComponent = (function () {
    function RadioListComponent() {
        this.listData = [];
        this.title = '';
        // this.name=UUID.UUID();
    }
    RadioListComponent.prototype.getCheckedValue = function () {
        if (this.defaultValue) {
            return this.defaultValue;
        }
        for (var _i = 0, _a = this.listData; _i < _a.length; _i++) {
            var radio = _a[_i];
            if (radio.isChecked) {
                return radio.code_dtl_id;
            }
        }
        return null;
    };
    RadioListComponent.prototype.init = function () {
        for (var _i = 0, _a = this.listData; _i < _a.length; _i++) {
            var radio = _a[_i];
            radio.isChecked = false;
        }
    };
    RadioListComponent.prototype.check = function (item) {
        this.defaultValue = null;
        for (var _i = 0, _a = this.listData; _i < _a.length; _i++) {
            var radio = _a[_i];
            if (radio.code_dtl_id == item.code_dtl_id) {
                radio.isChecked = true;
            }
            else {
                radio.isChecked = false;
            }
        }
    };
    return RadioListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], RadioListComponent.prototype, "listData", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RadioListComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RadioListComponent.prototype, "defaultValue", void 0);
__decorate([
    core_1.ViewChild('radioTable'),
    __metadata("design:type", Object)
], RadioListComponent.prototype, "radioTable", void 0);
RadioListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '[radio-list]',
        templateUrl: 'radio-list.component.html',
    }),
    __metadata("design:paramtypes", [])
], RadioListComponent);
exports.RadioListComponent = RadioListComponent;
//# sourceMappingURL=radio-list.component.js.map