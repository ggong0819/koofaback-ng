"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var customer_index_1 = require("./customer/customer.index");
var SalesRoutes = [
    { path: 'customer',
        children: [
            { path: '', redirectTo: "list" },
            { path: 'list', component: customer_index_1.CustomerListComponent },
            { path: 'detail', component: customer_index_1.CustomerDetailComponent }
        ]
    },
];
exports.SalesRouting = router_1.RouterModule.forChild(SalesRoutes);
//# sourceMappingURL=sales.routing.js.map