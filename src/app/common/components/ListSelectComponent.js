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
var ListSelectComponent = (function () {
    function ListSelectComponent() {
        this.contentsList = [];
        this.selectList = [];
        this.currentSelectItem = null;
        this.selectPos = -1;
        this.height = 90; //default    
    }
    ListSelectComponent.prototype.getHeight = function () {
        if (this.contentsList != null && this.contentsList.length > 0) {
            return this.contentsList.length * 30 + 40 + 'px';
        }
        return 90;
    };
    ListSelectComponent.prototype.getContentList = function () {
        return this.contentsList;
    };
    ListSelectComponent.prototype.setFocus = function (selectPos, item) {
        this.currentSelectItem = item;
        this.selectPos = selectPos;
    };
    ListSelectComponent.prototype.selectItem = function () {
        this.currentSelectItem.isSelected = true;
        this.selectList.push(this.currentSelectItem);
    };
    ListSelectComponent.prototype.setSelect = function (code, uid) {
        for (var _i = 0, _a = this.contentsList; _i < _a.length; _i++) {
            var temp = _a[_i];
            if (temp.code == code) {
                temp.isSelected = true;
                temp.uid = uid;
                this.selectList.push(temp);
                break;
            }
        }
    };
    ListSelectComponent.prototype.deSelectItem = function () {
        var idx = this.selectList.indexOf(this.currentSelectItem);
        this.selectList.splice(idx, 1);
        // console.log(this.contentsList.indexOf(this.currentSelectItem));
        this.contentsList[this.contentsList.indexOf(this.currentSelectItem)].isSelected = false;
    };
    ListSelectComponent.prototype.itemMove = function (isUp, index) {
        var temp;
        if (isUp) {
            temp = this.selectList[index - 1];
            this.selectList[index - 1] = this.selectList[index];
        }
        else {
            temp = this.selectList[index + 1];
            this.selectList[index + 1] = this.selectList[index];
        }
        this.selectList[index] = temp;
    };
    ListSelectComponent.prototype.getSelectList = function () {
        for (var i = 0; i < this.selectList.length; i++) {
            var item = this.selectList[i];
            item.index = i;
        }
        return this.selectList;
    };
    return ListSelectComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ListSelectComponent.prototype, "contentsList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListSelectComponent.prototype, "contentsTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListSelectComponent.prototype, "selectTitle", void 0);
ListSelectComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'list-selector',
        templateUrl: 'ListSelectComponent.html',
        styles: ["\n        .fa-hand-o {position:absolute;top:50%;width:100%;margin-top:-45px;}\n        .fa-hand-o > div {line-height:1em;}\n        .fa-hand-o > div:last-child {margin-top:16px;}\n        .fa-hand-o > div > p {margin:0;padding-top:3px;}\n    "]
    }),
    __metadata("design:paramtypes", [])
], ListSelectComponent);
exports.ListSelectComponent = ListSelectComponent;
//# sourceMappingURL=ListSelectComponent.js.map