"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var work_index_1 = require("./work/work.index");
var WorksRoutes = [
    { path: 'works',
        children: [
            { path: '', redirectTo: "requestList" },
            { path: 'requestList', component: work_index_1.WorkRequestListComponent },
            { path: 'list', component: work_index_1.WorkListComponent },
        ]
    },
];
exports.WorksRouting = router_1.RouterModule.forChild(WorksRoutes);
//# sourceMappingURL=works.routing.js.map