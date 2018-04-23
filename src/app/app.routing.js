"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./guards/index");
var home_component_1 = require("./layout/home.component");
var pageNotFound_component_1 = require("./common/pageNotFound.component");
var login_component_1 = require("./common/login.component");
var common_resolver_service_1 = require("./services/common-resolver.service");
var appRoutes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: '', canActivate: [AuthGuard], redirectTo: 'user/login', pathMatch: 'full'},
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', component: home_component_1.HomeComponent,
        resolve: { commonCode: common_resolver_service_1.CommonCodeResolver },
        canActivate: [index_1.AuthGuard],
        children: [
            // { path: '', canActivate: [AuthGuard], redirectTo: 'user/login', pathMatch: 'full' },
            { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule', resolve: { commonCode: common_resolver_service_1.CommonCodeResolver } },
            { path: 'sales', loadChildren: 'app/sales/sales.module#SalesModule', resolve: { commonCode: common_resolver_service_1.CommonCodeResolver } },
        ]
    },
    { path: '**', component: pageNotFound_component_1.PageNotFoundComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: false });
//# sourceMappingURL=app.routing.js.map