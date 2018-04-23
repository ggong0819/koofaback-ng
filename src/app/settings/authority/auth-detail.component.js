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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var component_1 = require("../../common/component");
var auth_service_1 = require("./auth.service");
var menu_service_1 = require("../menu/menu.service");
var main_content_component_1 = require("../../layout/main-content.component");
var auth_menu_tree_component_1 = require("./auth-menu-tree.component");
var AuthrityMngDetailComponent = (function (_super) {
    __extends(AuthrityMngDetailComponent, _super);
    function AuthrityMngDetailComponent(route, router, fb, mainComponent, authService) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.mainComponent = mainComponent;
        _this.authService = authService;
        _this.initAuthMenuList = new Array();
        _this.menuType = "detail";
        _this.mergeColspan = 3;
        _this.authority = {};
        _this.insertForm = _this.fb.group({
            authId: [,],
            authName: [,],
            authDel: ["N",],
            displayYn: ["Y",],
            authMenus: [],
        });
        mainComponent.menu = {
            category: "설정",
            menu: "권한관리"
        };
        _super.prototype.setBackButtonHandler.call(_this, _this.goList);
        return _this;
    }
    AuthrityMngDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authId = this.route.snapshot.params['authId'];
        this.route.data
            .subscribe(function (data) {
            _this.menuType = data.menuType;
        });
        //datail 가지고 오기
        var observable = this.authService.getDetail(this.authId);
        observable.subscribe(function (response) {
            if (response.result) {
                _this.authority = response.result.authority;
                _this.menuList = response.result.menuList;
                _this.topMenuList = _this.menuList["0"];
                _this.insertForm.controls['authId'].setValue(_this.authority.authId, {});
                _this.insertForm.controls['authName'].setValue(_this.authority.authName, {});
                _this.insertForm.controls['authDel'].setValue(_this.authority.authDel, {});
                _this.getPreviousAuthMenuList(_this.menuList);
            }
            else {
                _this.menuList.length = 0;
            }
            _this.initFormData = _this.insertForm.value;
        });
    };
    AuthrityMngDetailComponent.prototype.getPreviousAuthMenuList = function (menuList) {
        for (var key in menuList) {
            // console.debug(key+' instanceOf :',menuList[key] instanceof Array)
            if (menuList[key] instanceof Array) {
                this.getPreviousAuthMenuList(menuList[key]);
            }
            else {
                // console.debug('menuList[key]:', menuList[key])
                // console.debug('menuList[key].isHave:', menuList[key].isHave)
                if (1 == menuList[key].isHave) {
                    this.initAuthMenuList.push('' + menuList[key].menuId);
                }
            }
        }
        // console.debug('authMenuList:',this.initAuthMenuList)
    };
    AuthrityMngDetailComponent.prototype.checkMenu = function (menuElement) {
        this.authTree.checkMenu(menuElement);
    };
    AuthrityMngDetailComponent.prototype.goList = function () {
        this.router.navigate(['/settings/authorityMng/list', { type: 'userback' }]);
    };
    AuthrityMngDetailComponent.prototype.getAuthMenuArray = function () {
        var authMenuArray = new Array();
        var authMenuList = document.querySelectorAll('.auth-menu:checked');
        for (var i = 0; i < authMenuList.length; i++) {
            var authMenu = authMenuList[i];
            authMenuArray.push(authMenu.value);
        }
        return authMenuArray;
    };
    AuthrityMngDetailComponent.prototype.save = function () {
        var _this = this;
        if (!confirm('저장하시겠습니까?')) {
            return false;
        }
        var authMenuArray = this.getAuthMenuArray();
        if (authMenuArray.length == 0) {
            alert('접근 메뉴를 선택해주세요.');
            return false;
        }
        var formDataChanged = true;
        var formData = this.insertForm.value;
        if (formData == this.initFormData) {
            formDataChanged = false;
        }
        this.insertForm.controls['authMenus'].setValue(authMenuArray, {});
        formData = this.insertForm.value;
        var currentAuthMenuList = this.insertForm.controls['authMenus'].value.sort();
        this.initAuthMenuList = this.initAuthMenuList.sort();
        var authMenuChanged = false;
        if (this.initAuthMenuList.length != currentAuthMenuList.length) {
            authMenuChanged = true;
        }
        else {
            for (var i = 0; i < this.initAuthMenuList.length; i++) {
                if (this.initAuthMenuList[i] != currentAuthMenuList[i]) {
                    authMenuChanged = true;
                    break;
                }
            }
        }
        if (!formDataChanged && !authMenuChanged) {
            alert('변경 사항이 없습니다.');
            return false;
        }
        // console.debug(formData)
        var observable = this.authService.updateAuthority(formData);
        observable.subscribe(function (response) {
            if (response.success) {
                _this.insertForm.reset();
                alert("저장되었습니다.");
                _this.goList();
            }
            else {
                alert("저장에 실패하였습니다.:\n" + response.errorMsg);
            }
        }, function (error) {
            if (error) {
                alert('저장에 실패하였습니다.\n' + error.result.errorMsg);
            }
        });
    };
    return AuthrityMngDetailComponent;
}(component_1.CommonComponent));
__decorate([
    core_1.ViewChild(auth_menu_tree_component_1.AuthMenuTreeComponent),
    __metadata("design:type", auth_menu_tree_component_1.AuthMenuTreeComponent)
], AuthrityMngDetailComponent.prototype, "authTree", void 0);
AuthrityMngDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'auth-detail.component.html',
        providers: [auth_service_1.AuthService, menu_service_1.MenuService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        main_content_component_1.MainContentComponent,
        auth_service_1.AuthService])
], AuthrityMngDetailComponent);
exports.AuthrityMngDetailComponent = AuthrityMngDetailComponent;
//# sourceMappingURL=auth-detail.component.js.map