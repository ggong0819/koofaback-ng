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
var works_service_1 = require("./works.service");
var works_routing_1 = require("./works.routing");
var ng2_pagination_1 = require("ng2-pagination");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var work_index_1 = require("./work/work.index");
var customer_service_1 = require("../sales/customer/customer.service");
var WorkModule = (function () {
    function WorkModule() {
    }
    return WorkModule;
}());
WorkModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            common_1.CommonModule,
            ng2_pagination_1.Ng2PaginationModule,
            ngx_bootstrap_1.ModalModule.forRoot(),
            works_routing_1.WorksRouting,
            comon_share_module_1.CommonSharedModule
        ],
        declarations: [
            work_index_1.WorkListComponent,
            work_index_1.WorkRequestListComponent
        ],
        providers: [
            works_service_1.WorksService,
            common_1.CommonModule,
            work_index_1.WorkService,
            customer_service_1.CustomerService
        ]
    })
], WorkModule);
exports.WorkModule = WorkModule;
//# sourceMappingURL=works.module.js.map