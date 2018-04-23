"use strict";
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
var tree_model_1 = require("./tree.model");
/**
 * Tree Root View Base Component
 * 트리 최상위 컴포넌트
 * <tree-view [node]="xxxx" (selectNodeEvent)="xxxx($event)"></tree-view>
 * @author 시공교육 - 최광윤
 */
var TreeView = (function () {
    function TreeView() {
        this.selectNodeEvent = new core_1.EventEmitter(); //선택 이벤트를 페이지 뷰 컴포넌트로 전달 하기 위한 이벤트 이미터
    }
    /**
     * 트리 선택 이벤트 처리
     * @param selectedNode
     */
    TreeView.prototype.selectNode = function (selectedNode) {
        this.selectNodeEvent.emit(selectedNode); //뷰 컴포넌트로 이벤트 전달
    };
    return TreeView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_model_1.TreeNode)
], TreeView.prototype, "node", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TreeView.prototype, "selectNodeEvent", void 0);
TreeView = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tree-view',
        templateUrl: 'tree.component.html'
    })
], TreeView);
exports.TreeView = TreeView;
/**
 * Tree Node View
 * @author 시공교육 - 최광윤
 * 트리 자식 노드 트리 컴포넌트 내에서만 사용하므로 import 할 필요는 없다.
 */
var TreeNodeView = (function () {
    function TreeNodeView() {
    }
    TreeNodeView.prototype.selectNode = function (selectedNode) {
        this.selectNodeEvent.emit(selectedNode);
    };
    return TreeNodeView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", tree_model_1.TreeNode)
], TreeNodeView.prototype, "node", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], TreeNodeView.prototype, "selectNodeEvent", void 0);
TreeNodeView = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tree-node',
        templateUrl: 'tree.component.html'
    })
], TreeNodeView);
exports.TreeNodeView = TreeNodeView;
//# sourceMappingURL=tree.component.js.map