"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var code_index_1 = require("./code/code.index");
var auth_index_1 = require("./authority/auth.index");
var user_index_1 = require("./user/user.index");
var menu_index_1 = require("./menu/menu.index");
var SettingsRoutes = [
    { path: 'code',
        children: [
            { path: '', redirectTo: "base/list" },
            { path: 'base/list', component: code_index_1.CodeBaseListComponent },
            { path: 'base/manage', component: code_index_1.CodeManageComponent },
            { path: 'child/list', component: code_index_1.CodeChildListComponent },
            { path: 'child/manage', component: code_index_1.CodeChildManageComponent },
        ]
    },
    { path: 'authorityMng',
        children: [
            { path: '', redirectTo: "list", },
            { path: 'list', component: auth_index_1.AuthrityMngListComponent },
            { path: 'insert', component: auth_index_1.AuthrityMngInsertComponent, data: { menuType: 'insert' }, },
            { path: 'detail/:authId', component: auth_index_1.AuthrityMngDetailComponent, data: { menuType: 'detail' } },
        ]
    },
    { path: 'userMng',
        children: [
            { path: '', redirectTo: "list", },
            { path: 'list', component: user_index_1.UserListComponent },
            { path: 'detail/:userId', component: user_index_1.UserDetailComponent, },
        ]
    },
    {
        path: 'menu',
        children: [
            { path: '', redirectTo: "main", },
            { path: "main", component: menu_index_1.MenuMainComponent, }
        ]
    }
];
exports.SettingsRouting = router_1.RouterModule.forChild(SettingsRoutes);
//# sourceMappingURL=settings.routing.js.map