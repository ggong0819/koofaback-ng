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
var AuthMenuTreeComponent = (function () {
    function AuthMenuTreeComponent() {
    }
    AuthMenuTreeComponent.prototype.findParentElementByTagName = function (menuElement, tagName) {
        var parent = menuElement.parentElement;
        while (parent) {
            parent = parent.parentElement;
            if (parent.tagName == tagName) {
                return parent;
            }
        }
    };
    AuthMenuTreeComponent.prototype.checkParentMenus = function (ROOT, menuElement, checked) {
        if (checked) {
            var parent_1 = ROOT.querySelector('.auth-menu[value="' + menuElement.getAttribute('parentMenuId') + '"]');
            if (parent_1) {
                parent_1.checked = checked;
                this.checkParentMenus(ROOT, parent_1, checked);
            }
        }
        else {
            //하위메뉴들이 선택된게 없으면 상위 메뉴 체크 해제
            //최상위 메뉴는 할 필요 없다.
            var parentMenuId = menuElement.getAttribute('parentMenuId');
            if ('0' != parentMenuId) {
                var parent_2 = this.findParentElementByTagName(menuElement, 'AUTH-MENU-TREE');
                var siblings = parent_2.querySelectorAll('.auth-menu[parentMenuId="' + parentMenuId + '"]');
                var siblingChecked = false;
                for (var i = 0; i < siblings.length; i++) {
                    if (siblings[i].checked) {
                        siblingChecked = true;
                        break;
                    }
                }
                if (!siblingChecked) {
                    var parentMenu = ROOT.querySelector('.auth-menu[value="' + parentMenuId + '"]');
                    if (parentMenu) {
                        parentMenu.checked = false;
                        this.checkParentMenus(ROOT, parentMenu, checked);
                    }
                }
            }
        }
    };
    AuthMenuTreeComponent.prototype.checkChildMenus = function (childs, checked) {
        for (var i = 0; i < childs.length; i++) {
            var child = childs[i];
            child.checked = checked;
            this.checkChildMenus(child.parentElement.querySelectorAll('.auth-menu[parentMenuId="' + child.value + '"]'), checked);
        }
    };
    AuthMenuTreeComponent.prototype.checkMenu = function (menuElement) {
        //상,하위 노드들을 찾아서 checkbox를 세팅한다.
        var parentMenuId = menuElement.getAttribute('parentMenuId');
        var checked = menuElement.checked;
        var ROOT = this.findParentElementByTagName(menuElement, 'TR');
        //부모 메뉴 체크 박스 세팅
        this.checkParentMenus(ROOT, menuElement, checked);
        var targetElement = menuElement.parentElement;
        if ('0' == parentMenuId) {
            targetElement = ROOT;
        }
        //자식 메뉴 체크 박스 세팅
        var childs = targetElement.querySelectorAll('.auth-menu[parentMenuId="' + menuElement.value + '"]');
        this.checkChildMenus(childs, checked);
    };
    return AuthMenuTreeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AuthMenuTreeComponent.prototype, "menuList", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AuthMenuTreeComponent.prototype, "allMenuList", void 0);
AuthMenuTreeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'auth-menu-tree',
        templateUrl: 'auth-menu-tree.component.html',
    }),
    __metadata("design:paramtypes", [])
], AuthMenuTreeComponent);
exports.AuthMenuTreeComponent = AuthMenuTreeComponent;
//# sourceMappingURL=auth-menu-tree.component.js.map