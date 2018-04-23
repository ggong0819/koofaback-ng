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
var CommonComponent = (function () {
    function CommonComponent() {
        this.pageNo = 1;
        this.totalCnt = 10; // total numbar of page not items 
        this.listSize = 10; // max page size
        this.commonPopupInputData = null;
    }
    CommonComponent.prototype.onPopState = function (event) {
        if (typeof this.backButtonHanlder !== 'undefined') {
            console.debug('뒤로가기 핸들러 존재함.');
            event.preventDefault();
            this.backButtonHanlder();
        }
        else {
            console.debug('핸들러 없으니 그냥 뒤로가기');
        }
    };
    CommonComponent.prototype.initPagenation = function () {
        this.totalCnt = 0;
        this.listSize = 0;
        this.listStartIndex = 0;
        this.pageNo = 1;
    };
    CommonComponent.prototype.setPagination = function (info) {
        if (info) {
            this.totalCnt = info.pageInfo.totalCnt;
            this.listSize = info.pageInfo.listSize;
            this.listStartIndex = this.totalCnt - (this.listSize * (this.pageNo - 1));
        }
    };
    CommonComponent.prototype.setPage = function (pageNo) {
        this.pageNo = pageNo;
    };
    ;
    CommonComponent.prototype.pageChanged = function (event) {
        //this method will trigger every page click  
        // console.log('Number items per page: ' + event.itemsPerPage);
    };
    ;
    CommonComponent.prototype.ngOnDestroy = function () {
        // 메모리 leak 방지
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    CommonComponent.prototype.setBackButtonHandler = function (handler) {
        this.backButtonHanlder = handler;
    };
    return CommonComponent;
}());
__decorate([
    core_1.HostListener('window:popstate', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], CommonComponent.prototype, "onPopState", null);
exports.CommonComponent = CommonComponent;
//# sourceMappingURL=component.js.map