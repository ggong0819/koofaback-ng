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
Object.defineProperty(exports, "__esModule", { value: true });
var tree_model_1 = require("../../common/components/tree/tree.model");
/**
 * 메뉴 트리를 위한 모델
 */
var MenuTreeNode = (function (_super) {
    __extends(MenuTreeNode, _super);
    function MenuTreeNode(menuId, parentMenuId, menuLevel, menuName, menuUrl, displayOrder, displayYn, regName, modfName, regUserId, regDt, regIp, modfUserId, modfDt, modfIp) {
        var _this = _super.call(this) || this;
        _this.menuId = menuId;
        _this.parentMenuId = parentMenuId;
        _this.menuLevel = menuLevel;
        _this.menuName = menuName;
        _this.menuUrl = menuUrl;
        _this.displayOrder = displayOrder;
        _this.displayYn = displayYn;
        _this.regName = regName;
        _this.modfName = modfName;
        _this.regUserId = regUserId;
        _this.regDt = regDt;
        _this.regIp = regIp;
        _this.modfUserId = modfUserId;
        _this.modfDt = modfDt;
        _this.modfIp = modfIp;
        _this.originDisplayOrder = 0;
        _this.originDisplayOrder = displayOrder;
        return _this;
    }
    /**
     * 서버 Parameter 추출
     */
    MenuTreeNode.prototype.getParamValue = function () {
        var param = {
            menuId: this.menuId,
            parentMenuId: this.parentMenuId,
            menuLevel: this.menuLevel,
            menuName: this.menuName,
            menuUrl: this.menuUrl,
            displayOrder: this.displayOrder,
            displayYn: this.displayYn,
            useYn: 'Y',
        };
        return param;
    };
    /**
     * 자식 노드를 포함한 서버 Parameter 추출
     * @param saveArray
     */
    MenuTreeNode.prototype.getParamValueWithChild = function (saveArray) {
        saveArray.push(this.getParamValue());
        if (this.childList != null) {
            for (var i = 0; i < this.childList.length; i++) {
                var node = this.childList[i];
                node.getParamValueWithChild(saveArray);
            }
        }
    };
    //부모 노드 정보
    MenuTreeNode.prototype.getParentNode = function () {
        return this.parentNode;
    };
    MenuTreeNode.prototype.setSort = function (index) {
        if (this.childList != null) {
            for (var i = 0; i < this.childList.length; i++) {
                this.childList[i].setSort(i);
            }
        }
        this.displayOrder = index;
    };
    return MenuTreeNode;
}(tree_model_1.TreeNode));
exports.MenuTreeNode = MenuTreeNode;
/**
 * JSON to MenuTree
 */
var MenuTreeModelConverter = (function () {
    function MenuTreeModelConverter() {
        this.totalCount = 0;
    }
    MenuTreeModelConverter.prototype.rawToTreeNode = function (rawData, parentNode) {
        this.totalCount++;
        var node = new MenuTreeNode(rawData.menuId, rawData.parentMenuId, rawData.menuLevel, rawData.menuName, rawData.menuUrl, rawData.displayOrder, rawData.displayYn, rawData.regName, rawData.modfName, rawData.regUserId, rawData.regDt, rawData.regIp, rawData.modfUserId, rawData.modfDt, rawData.modfIp);
        node.setParent(parentNode);
        node.title = rawData.menuName;
        if (rawData.childList != null && rawData.childList.length > 0) {
            for (var _i = 0, _a = rawData.childList; _i < _a.length; _i++) {
                var child = _a[_i];
                node.addChildNode(this.rawToTreeNode(child, node));
            }
        }
        return node;
    };
    return MenuTreeModelConverter;
}());
exports.MenuTreeModelConverter = MenuTreeModelConverter;
//# sourceMappingURL=menu.tree.component.js.map