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
var CheckListComponent = (function () {
    function CheckListComponent() {
        this.checkItemCount = 0;
    }
    Object.defineProperty(CheckListComponent.prototype, "listData", {
        set: function (list) {
            this.list = list;
            this.listOrg = [];
            for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
                var item = _a[_i];
                this.listOrg.push(Object.assign([], item));
            }
        },
        enumerable: true,
        configurable: true
    });
    CheckListComponent.prototype.check = function (item) {
        item.checked = !item.checked;
        if (item.checked) {
            this.checkItemCount++;
        }
        else {
            this.checkItemCount--;
        }
    };
    CheckListComponent.prototype.initAll = function (isCheck) {
        if (this.list != null) {
            for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
                var item = _a[_i];
                item.checked = isCheck;
            }
        }
    };
    CheckListComponent.prototype.getCheckedItemCount = function () {
        return this.checkItemCount;
    };
    CheckListComponent.prototype.getCheckedList = function () {
        var res = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.checked) {
                res.push(item);
            }
        }
        return res;
    };
    /**
     * 변경내용 확인 하여 리스트
     */
    CheckListComponent.prototype.getDiffList = function () {
        var newList = [];
        var delList = [];
        //과목 변경 사항 - 추가, 제거
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var curItem = _a[_i];
            for (var _b = 0, _c = this.listOrg; _b < _c.length; _b++) {
                var svrItem = _c[_b];
                if (curItem.code == svrItem.code) {
                    //Find
                    if (!curItem.checked && svrItem.checked) {
                        delList.push(svrItem.id);
                    }
                    else if (curItem.checked && !svrItem.checked) {
                        newList.push({ code: curItem.code });
                    }
                    break;
                }
            }
        }
        return {
            new_list: newList,
            dele_list: delList
        };
    };
    return CheckListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckListComponent.prototype, "title", void 0);
__decorate([
    core_1.Input('listData'),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], CheckListComponent.prototype, "listData", null);
CheckListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: '[check-list]',
        templateUrl: 'check-list.component.html'
    })
], CheckListComponent);
exports.CheckListComponent = CheckListComponent;
//# sourceMappingURL=check-list.component.js.map