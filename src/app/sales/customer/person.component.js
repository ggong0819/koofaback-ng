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
var angular2_uuid_1 = require("angular2-uuid");
var component_1 = require("../../common/component");
var PersonComponent = (function (_super) {
    __extends(PersonComponent, _super);
    function PersonComponent(viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.viewContainerRef = viewContainerRef;
        //현재 담당자 노드 리스트
        _this.personList = [];
        _this.uuid = angular2_uuid_1.UUID.UUID();
        return _this;
    }
    PersonComponent.prototype.ngOnInit = function () {
    };
    PersonComponent.prototype.getPersonData = function () {
        return { displayOrder: (this.nodeIndex + 1), name: this.name, position: this.position, tel: this.tel, mobile: this.mobile, email: this.email, division: this.division, memo: this.memo };
    };
    PersonComponent.prototype.getTargetComponent = function (targetIndex) {
        for (var i = 0; i < this.personList.length; i++) {
            if (this.personList[i].instance.nodeIndex == targetIndex) {
                return this.personList[i].instance;
            }
        }
    };
    PersonComponent.prototype.getCurrentContainer = function () {
        for (var i = 0; i < this.personList.length; i++) {
            if (this.personList[i].instance === this) {
                return this.personList[i];
            }
        }
    };
    PersonComponent.prototype.getUpperNodeIndex = function (currentIndex) {
        var upperNodeIndex = currentIndex - 1;
        if (upperNodeIndex < 0) {
            return -1;
        }
        if (this.hostViewContainerRef.get(upperNodeIndex)) {
            return upperNodeIndex;
        }
        else {
            return this.getUpperNodeIndex(upperNodeIndex);
        }
    };
    PersonComponent.prototype.getLowerNodeIndex = function (currentIndex) {
        var lowerNodeIndex = currentIndex + 1;
        if (lowerNodeIndex >= this.personList.length) {
            return 999;
        }
        if (this.hostViewContainerRef.get(lowerNodeIndex)) {
            return lowerNodeIndex;
        }
        else {
            return this.getLowerNodeIndex(lowerNodeIndex);
        }
    };
    PersonComponent.prototype.sortUp = function () {
        var targetIndex = this.getUpperNodeIndex(this.nodeIndex);
        if (targetIndex < 0) {
            return;
        }
        var targetComponent = this.getTargetComponent(targetIndex);
        var thisView = this.hostViewContainerRef.get(this.nodeIndex);
        //target 위치의 index를 변경
        if (targetComponent) {
            targetComponent.nodeIndex = this.nodeIndex;
        }
        //이 View 위치 변경
        this.hostViewContainerRef.move(thisView, targetIndex);
        //현재 인덱스 변경.
        this.nodeIndex = targetIndex;
        // for(let i = 0; i<this.cmsContentsList.length; i++){
        //     console.log('listIndex'+i+', nodeIndex:',this.cmsContentsList[i].instance.nodeIndex);
        // }
    };
    PersonComponent.prototype.sortDown = function () {
        var targetIndex = this.getLowerNodeIndex(this.nodeIndex);
        if (targetIndex == 999) {
            return;
        }
        var targetComponent = this.getTargetComponent(targetIndex);
        var thisView = this.hostViewContainerRef.get(this.nodeIndex);
        //target 위치의 index를 변경
        if (targetComponent) {
            targetComponent.nodeIndex = this.nodeIndex;
        }
        //이 View 위치 변경
        this.hostViewContainerRef.move(thisView, targetIndex);
        //현재 인덱스 변경.
        this.nodeIndex = targetIndex;
        // for(let i = 0; i<this.cmsContentsList.length; i++){
        //     console.log('listIndex'+i+', nodeIndex:',this.cmsContentsList[i].instance.nodeIndex);
        // }
    };
    PersonComponent.prototype.delete = function () {
        //아래 있는 node들을 인덱스 변경(-1처리)
        var lowerNodeIndex = this.getLowerNodeIndex(this.nodeIndex);
        while (lowerNodeIndex != 999) {
            var targetComponent = this.getTargetComponent(lowerNodeIndex);
            if (targetComponent) {
                targetComponent.nodeIndex = lowerNodeIndex - 1;
            }
            lowerNodeIndex = this.getLowerNodeIndex(lowerNodeIndex);
        }
        //이 node를 삭제한다.
        this.hostViewContainerRef.remove(this.nodeIndex);
        var deleteListIndex = 999;
        for (var i = 0; i < this.personList.length; i++) {
            // console.log(this.personList[i].instance.nodeIndex);
            if (this.personList[i].instance.nodeIndex == this.nodeIndex) {
                deleteListIndex = i;
                break;
            }
        }
        this.personList.splice(deleteListIndex, 1);
        // for(let i = 0; i<this.contentsList.length; i++){
        //     console.log('listIndex'+i+', nodeIndex:',this.contentsList[i].instance.nodeIndex);
        // }
    };
    return PersonComponent;
}(component_1.CommonComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], PersonComponent.prototype, "personList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.ViewContainerRef)
], PersonComponent.prototype, "hostViewContainerRef", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PersonComponent.prototype, "nodeIndex", void 0);
PersonComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'person.component.html',
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], PersonComponent);
exports.PersonComponent = PersonComponent;
//# sourceMappingURL=person.component.js.map