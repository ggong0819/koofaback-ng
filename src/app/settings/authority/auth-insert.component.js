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
var AuthrityMngInsertComponent = (function (_super) {
    __extends(AuthrityMngInsertComponent, _super);
    function AuthrityMngInsertComponent(route, router, fb, mainComponent, authService, menuService) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.router = router;
        _this.fb = fb;
        _this.mainComponent = mainComponent;
        _this.authService = authService;
        _this.menuService = menuService;
        _this.menuType = "insert";
        _this.insertForm = _this.fb.group({
            authName: ["",],
            authDel: ["N",],
            displayYn: ["Y",],
            authMenus: [],
        });
        mainComponent.menu = {
            category: "설정",
            menu: "권한관리"
        };
        return _this;
    }
    AuthrityMngInsertComponent.prototype.ngOnInit = function () {
        var _this = this;
        //1depth 메뉴 가지고 오기
        var observable = this.menuService.getMenuTree({ depth: 1 });
        observable.subscribe(function (response) {
            // console.log("successResponse:",response.result);
            if (response.result) {
                _this.menuList = response.result.list;
                _this.topMenuList = _this.menuList["0"];
            }
            else {
                _this.menuList.length = 0;
            }
        });
    };
    AuthrityMngInsertComponent.prototype.checkMenu = function (menuElement) {
        this.authTree.checkMenu(menuElement);
    };
    AuthrityMngInsertComponent.prototype.goList = function () {
        this.router.navigate(['/settings/authorityMng/list', { type: 'userback' }]);
    };
    AuthrityMngInsertComponent.prototype.save = function () {
        var _this = this;
        if (!confirm('저장하시겠습니까?')) {
            return false;
        }
        var authMenuList = document.querySelectorAll('.auth-menu:checked');
        var authMenuArray = new Array();
        for (var i = 0; i < authMenuList.length; i++) {
            var authMenu = authMenuList[i];
            authMenuArray.push(authMenu.value);
        }
        if (authMenuArray.length == 0) {
            alert('접근 메뉴를 선택해주세요.');
            return false;
        }
        this.insertForm.controls['authMenus'].setValue(authMenuArray, {});
        var formData = this.insertForm.value;
        var observable = this.authService.insertAuthority(formData);
        observable.subscribe(function (response) {
            if (response.success) {
                _this.insertForm.reset();
                alert("저장되었습니다.");
                _this.goList();
            }
            else {
                alert("저장에 실패하였습니다.:" + response.errorMsg);
            }
        }, function (error) {
            if (error) {
                alert('저장에 실패하였습니다.\n' + error.result.errorMsg);
            }
        }, function () {
            // console.log("the subscription is completed")
        });
    };
    return AuthrityMngInsertComponent;
}(component_1.CommonComponent));
__decorate([
    core_1.ViewChild(auth_menu_tree_component_1.AuthMenuTreeComponent),
    __metadata("design:type", auth_menu_tree_component_1.AuthMenuTreeComponent)
], AuthrityMngInsertComponent.prototype, "authTree", void 0);
AuthrityMngInsertComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'auth-detail.component.html',
        providers: [auth_service_1.AuthService, menu_service_1.MenuService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        main_content_component_1.MainContentComponent,
        auth_service_1.AuthService,
        menu_service_1.MenuService])
], AuthrityMngInsertComponent);
exports.AuthrityMngInsertComponent = AuthrityMngInsertComponent;
//# sourceMappingURL=auth-insert.component.js.map