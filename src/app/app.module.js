"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var home_component_1 = require("./layout/home.component");
var login_component_1 = require("./common/login.component");
var forms_1 = require("@angular/forms");
var layout_index_1 = require("./layout/layout.index");
var app_routing_1 = require("./app.routing");
var pageNotFound_component_1 = require("./common/pageNotFound.component");
var index_1 = require("./guards/index");
var auth_service_1 = require("./services/auth.service");
var net_service_1 = require("./services/net.service");
var common_service_1 = require("./services/common.service");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var alert_modal_component_1 = require("./common/alert-modal.component");
var common_resolver_service_1 = require("./services/common-resolver.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            app_routing_1.routing,
            ngx_bootstrap_1.ModalModule.forRoot(),
            forms_1.ReactiveFormsModule,
            http_1.JsonpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            layout_index_1.MainContentComponent,
            layout_index_1.HeaderComponent,
            layout_index_1.LeftSideComponent,
            layout_index_1.FooterComponent,
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            pageNotFound_component_1.PageNotFoundComponent,
            layout_index_1.MenuTreeComponent,
            alert_modal_component_1.AlertModalComponent,
        ],
        providers: [
            index_1.AuthGuard,
            net_service_1.NetService,
            common_service_1.CommonService,
            auth_service_1.AuthService,
            common_resolver_service_1.CommonCodeResolver
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map