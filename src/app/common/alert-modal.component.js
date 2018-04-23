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
var ngx_bootstrap_1 = require("ngx-bootstrap");
var AlertModalComponent = (function () {
    function AlertModalComponent() {
        this.alertModalMsg = "";
    }
    AlertModalComponent.prototype.showAlertModal = function (message) {
        this.alertModalMsg = message;
        this.alertModal.show();
    };
    AlertModalComponent.prototype.hideAlertModal = function () {
        this.alertModal.hide();
    };
    return AlertModalComponent;
}());
__decorate([
    core_1.ViewChild('alertModal'),
    __metadata("design:type", ngx_bootstrap_1.ModalDirective)
], AlertModalComponent.prototype, "alertModal", void 0);
AlertModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'alert-modal',
        templateUrl: 'alert-modal.component.html'
    }),
    __metadata("design:paramtypes", [])
], AlertModalComponent);
exports.AlertModalComponent = AlertModalComponent;
//# sourceMappingURL=alert-modal.component.js.map