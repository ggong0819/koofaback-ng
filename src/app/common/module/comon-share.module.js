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
var ngx_bootstrap_1 = require("ngx-bootstrap");
//UI Components
var radio_list_component_1 = require("../components/radio-list/radio-list.component");
var check_list_component_1 = require("../components/check-list/check-list.component");
var ng2_pagination_1 = require("ng2-pagination");
var mydatepicker_1 = require("mydatepicker");
var RegModfComponent_1 = require("../components/RegModfComponent");
var tree_component_1 = require("../components/tree/tree.component");
var ListSelectComponent_1 = require("../components/ListSelectComponent");
var player_component_1 = require("../components/player/player.component");
var CommonSharedModule = (function () {
    function CommonSharedModule() {
    }
    return CommonSharedModule;
}());
CommonSharedModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            ngx_bootstrap_1.ModalModule.forRoot(),
            ng2_pagination_1.Ng2PaginationModule,
            mydatepicker_1.MyDatePickerModule,
        ],
        declarations: [
            radio_list_component_1.RadioListComponent,
            check_list_component_1.CheckListComponent,
            RegModfComponent_1.RegModfComponent,
            tree_component_1.TreeView,
            tree_component_1.TreeNodeView,
            ListSelectComponent_1.ListSelectComponent,
            player_component_1.PlayerComponent,
        ],
        exports: [
            radio_list_component_1.RadioListComponent,
            check_list_component_1.CheckListComponent,
            RegModfComponent_1.RegModfComponent,
            tree_component_1.TreeView,
            tree_component_1.TreeNodeView,
            ListSelectComponent_1.ListSelectComponent,
            player_component_1.PlayerComponent,
        ],
        providers: []
    })
], CommonSharedModule);
exports.CommonSharedModule = CommonSharedModule;
//# sourceMappingURL=comon-share.module.js.map