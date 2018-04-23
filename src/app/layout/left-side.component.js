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
var auth_service_1 = require("../services/auth.service");
var LeftSideComponent = (function () {
    function LeftSideComponent(authService) {
        this.authService = authService;
        this.userInfo = authService.getUserInfo();
        //console.log('left-side this.userInfo', this.userInfo)
        //console.log('left-side this.userInfo.menuList', this.userInfo.menuList)
        if (this.userInfo) {
            if (this.userInfo.menuList) {
                this.menuList = this.userInfo.menuList;
            }
        }
    }
    return LeftSideComponent;
}());
LeftSideComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'left-side',
        templateUrl: 'left-side.component.html',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LeftSideComponent);
exports.LeftSideComponent = LeftSideComponent;
//# sourceMappingURL=left-side.component.js.map