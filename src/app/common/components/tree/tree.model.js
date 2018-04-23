"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 메뉴 트리 노드 모델링
 * 상속받아 사용
 * 필요한 기능은 이곳에 추가
 * @author 시공교육 최광윤
 */
var TreeNode = (function () {
    function TreeNode() {
        this.childList = null; //자식 노드 배열
        this.isSelected = false; //선택된 노드 인지
        this.isOpened = true;
    }
    //노드 위로
    TreeNode.prototype.indexUp = function () {
        console.log('indexUp');
        if (this.parentNode != null) {
            var brosList = this.parentNode.childList;
            var i = brosList.indexOf(this);
            if (i > 0) {
                var temp = brosList[i - 1];
                brosList[i - 1] = this;
                brosList[i] = temp;
            }
        }
        else {
            console.log('parent is null');
        }
    };
    //노드 아래로
    TreeNode.prototype.indexDown = function () {
        if (this.parentNode != null) {
            var brosList = this.parentNode.childList;
            var i = brosList.indexOf(this);
            if (i < brosList.length - 1) {
                var temp = brosList[i + 1];
                brosList[i + 1] = this;
                brosList[i] = temp;
            }
        }
    };
    //부모 노드 설정
    TreeNode.prototype.setParent = function (node) {
        this.parentNode = node;
    };
    //부모 노드 정보
    TreeNode.prototype.getParent = function () {
        return this.parentNode;
    };
    //선택 이벤트
    TreeNode.prototype.setSelect = function (node) {
        if (this == node) {
            this.isSelected = true;
        }
        else {
            this.isSelected = false;
        }
        if (this.childList != null) {
            for (var _i = 0, _a = this.childList; _i < _a.length; _i++) {
                var childNode = _a[_i];
                childNode.setSelect(node);
            }
        }
    };
    //하위 메뉴 열림/닫힘 처리
    TreeNode.prototype.setOpen = function (open) {
        this.isOpened = open;
    };
    //자식 노드 추가
    TreeNode.prototype.addChildNode = function (node) {
        if (this.childList == null) {
            this.childList = [];
        }
        this.childList.push(node);
    };
    //자식 노드 제거
    TreeNode.prototype.removeChildNode = function (node) {
        this.childList.splice(this.childList.indexOf(node), 1);
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=tree.model.js.map