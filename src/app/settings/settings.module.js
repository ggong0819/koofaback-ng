"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var comon_share_module_1 = require("../common/module/comon-share.module");
var settings_service_1 = require("./settings.service");
var settings_routing_1 = require("./settings.routing");
var ng2_pagination_1 = require("ng2-pagination");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var code_index_1 = require("./code/code.index");
var auth_index_1 = require("./authority/auth.index");
var user_index_1 = require("./user/user.index");
var menu_index_1 = require("./menu/menu.index");
var SettingsModule = (function () {
    function SettingsModule() {
    }
    return SettingsModule;
}());
SettingsModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            common_1.CommonModule,
            ng2_pagination_1.Ng2PaginationModule,
            ngx_bootstrap_1.ModalModule.forRoot(),
            settings_routing_1.SettingsRouting,
            comon_share_module_1.CommonSharedModule,
        ],
        declarations: [
            code_index_1.CodeBaseListComponent,
            code_index_1.CodeManageComponent,
            code_index_1.CodeChildListComponent,
            code_index_1.CodeBaseInfoTable,
            code_index_1.CodeChildManageComponent,
            auth_index_1.AuthrityMngListComponent,
            auth_index_1.AuthrityMngDetailComponent,
            auth_index_1.AuthrityMngInsertComponent,
            auth_index_1.AuthMenuTreeComponent,
            user_index_1.UserListComponent,
            user_index_1.UserDetailComponent,
            menu_index_1.MenuMainComponent,
        ],
        providers: [
            settings_service_1.SettingsService,
            auth_index_1.AuthService,
            menu_index_1.MenuService,
            code_index_1.CodeService,
            common_1.CommonModule,
            user_index_1.UserService,
        ],
    })
], SettingsModule);
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map