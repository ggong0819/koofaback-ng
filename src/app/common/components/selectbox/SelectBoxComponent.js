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
var OptionModel_1 = require("./OptionModel");
var SelectBoxComponent = (function () {
    function SelectBoxComponent() {
        this.optionList = [];
    }
    SelectBoxComponent.prototype.ngOnInit = function () {
        //input으로 받은 공통 코드를 OptionModel로 변경한다.
        for (var _i = 0, _a = this.inputCodeList; _i < _a.length; _i++) {
            var commonCode = _a[_i];
            var option = new OptionModel_1.OptionModel();
            option.name = commonCode.codeName;
            option.value = commonCode.codeId;
            this.optionList.push(option);
        }
        if (null == this.cssClass) {
            this.cssClass = "form-control";
        }
        this.setOpionValue(this.defaultOptionValue);
    };
    SelectBoxComponent.prototype.setOpionValue = function (value) {
        this.selectedValue = value;
        for (var _i = 0, _a = this.optionList; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.value == value) {
                option.isSelected = true;
            }
            else {
                option.isSelected = false;
            }
        }
    };
    SelectBoxComponent.prototype.getSelectedValue = function () {
        return this.selectedValue;
    };
    return SelectBoxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "inputCodeList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SelectBoxComponent.prototype, "cssClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "defaultOptionValue", void 0);
SelectBoxComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'options-selector',
        templateUrl: 'SelectBoxComponent.html'
    }),
    __metadata("design:paramtypes", [])
], SelectBoxComponent);
exports.SelectBoxComponent = SelectBoxComponent;
//# sourceMappingURL=SelectBoxComponent.js.map