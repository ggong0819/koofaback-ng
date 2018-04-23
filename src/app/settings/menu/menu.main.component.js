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
var menu_service_1 = require("./menu.service");
var main_content_component_1 = require("../../layout/main-content.component");
var menu_tree_component_1 = require("./menu.tree.component");
var MenuMainComponent = (function () {
    function MenuMainComponent(mainComponent, menuService) {
        this.mainComponent = mainComponent;
        this.menuService = menuService;
        this.nodeViewInfo = {
            menuName: '',
            menuUrl: '',
            displayYn: 'Y'
        };
        this.urlInput = '';
        mainComponent.menu = {
            category: "설정",
            menu: "메뉴 관리"
        };
    }
    MenuMainComponent.prototype.ngOnInit = function () {
        this.getMenuTree();
    };
    MenuMainComponent.prototype.getMenuTree = function () {
        var _this = this;
        this.currentNode = null;
        this.node = null;
        this.menuService.getMenuList()
            .subscribe(function (res) {
            var converter = new menu_tree_component_1.MenuTreeModelConverter();
            _this.node = converter.rawToTreeNode(res.result, null);
        }, function (err) {
            if (err) {
                console.log('에러');
            }
        });
    };
    //선택 이벤트 처리 
    MenuMainComponent.prototype.eventSelectNode = function (selectNode) {
        this.node.setSelect(selectNode);
        this.currentNode = selectNode;
        this.getUrlList();
        this.nodeViewInfo.menuName = this.currentNode.menuName;
        this.nodeViewInfo.menuUrl = this.currentNode.menuUrl;
        this.nodeViewInfo.displayYn = this.currentNode.displayYn;
    };
    //노드 위로 이벤트 처리 
    MenuMainComponent.prototype.nodeUp = function () {
        if (this.currentNode != null) {
            this.currentNode.indexUp();
        }
    };
    //노드 아래로 이벤트 처리
    MenuMainComponent.prototype.nodeDown = function () {
        if (this.currentNode != null) {
            this.currentNode.indexDown();
        }
    };
    /**
     * 하위 메뉴 생성
     */
    MenuMainComponent.prototype.createNewChildNode = function () {
        var _this = this;
        if (this.currentNode != null) {
            var params = {
                parentMenuId: this.currentNode.menuId,
                menuLevel: this.currentNode.menuLevel + 1
            };
            this.menuService.createChildMenu(params)
                .subscribe(function (res) {
                if (res.success) {
                    alert('메뉴 생성을 성공 하였습니다.');
                    _this.getMenuTree();
                }
                else {
                    alert('메뉴 생성을 실패 하였습니다.');
                }
            }, function (err) {
                if (err) {
                    alert('메뉴 생성을 실패 하였습니다.');
                }
            });
        }
    };
    /**
     * 메뉴 삭제
     */
    MenuMainComponent.prototype.deleteMenu = function () {
        var _this = this;
        var res = confirm("선택한 메뉴를 정말로 삭제 하시겠습니까?");
        if (res == true) {
            var list = [];
            this.currentNode.getParamValueWithChild(list);
            for (var i = 0; i < list.length; i++) {
                var node = list[i];
                node.useYn = 'N';
            }
            this.menuService.updateMenuInfo(list)
                .subscribe(function (res) {
                if (res.success) {
                    alert("삭제 되었습니다.");
                    _this.getMenuTree();
                }
                else {
                    alert("삭제를 실패 하였습니다.");
                }
            }, function (err) {
                if (err) {
                    alert("삭제를 실패 하였습니다.");
                }
            });
        }
    };
    /**
     * 메뉴 정보 업데이트
     */
    MenuMainComponent.prototype.saveMenuInfo = function () {
        var list = [];
        var nodeParam = this.currentNode.getParamValue();
        nodeParam.menuName = this.nodeViewInfo.menuName;
        nodeParam.menuUrl = this.nodeViewInfo.menuUrl;
        nodeParam.displayYn = this.nodeViewInfo.displayYn;
        list.push(nodeParam);
        this.requestUpdateMenuInfo(list);
    };
    /**
     *
     * @param param 메뉴 정보 저장
     */
    MenuMainComponent.prototype.requestUpdateMenuInfo = function (param) {
        var _this = this;
        this.menuService.updateMenuInfo(param)
            .subscribe(function (res) {
            if (res.success) {
                alert("저장 되었습니다.");
                _this.getMenuTree();
            }
            else {
                alert("저장을 실패 하였습니다.");
            }
        }, function (err) {
            if (err) {
                alert("저장을 실패 하였습니다.");
            }
        });
    };
    /**
     * 순서 변경 저장
     */
    MenuMainComponent.prototype.saveAllMenuOnChange = function () {
        var res = confirm("메뉴 순서 변경 내용을 저장하시겠습니까?");
        if (res == true) {
            this.node.setSort(0); //Sort값 현재 순서로 모두 변경
            var diff = [];
            this.findDiffSort(this.node, diff);
            if (diff != null && diff.length > 0) {
                var list = [];
                for (var _i = 0, diff_1 = diff; _i < diff_1.length; _i++) {
                    var child = diff_1[_i];
                    // console.log("child : " + child.menuName);    
                    list.push(child.getParamValue());
                }
                this.requestUpdateMenuInfo(list);
            }
            else {
                console.log("Diff is null");
            }
        }
    };
    /**
     * 트리 전체 탐색
     */
    MenuMainComponent.prototype.findDiffSort = function (node, saveArray) {
        if (node.childList != null) {
            for (var _i = 0, _a = node.childList; _i < _a.length; _i++) {
                var child = _a[_i];
                this.findDiffSort(child, saveArray);
            }
        }
        if (node.displayOrder != node.originDisplayOrder) {
            saveArray.push(node);
        }
    };
    MenuMainComponent.prototype.getUrlList = function () {
        var _this = this;
        this.menuService.getUrlList({ menuId: this.currentNode.menuId })
            .subscribe(function (res) {
            _this.urlList = res.result;
        }, function (err) {
            if (err) {
                alert("URL 리스트를 불러오는데 실패 하였습니다.");
            }
        });
    };
    MenuMainComponent.prototype.addUrl = function (url) {
        var _this = this;
        this.menuService.addUrl({
            menuId: this.currentNode.menuId,
            menuUrl: url
        })
            .subscribe(function (res) {
            if (res.success) {
                alert("URL을 추가 하였습니다.");
                _this.getUrlList();
                _this.urlInput = '';
            }
            else {
                alert("URL 추가를 실패 하였습니다.");
            }
        }, function (err) {
            if (err) {
                alert("URL 추가를 실패 하였습니다.");
            }
        });
    };
    MenuMainComponent.prototype.modifyUrl = function (urlData, useYn) {
        var _this = this;
        this.menuService.modifyUrl({
            seq: urlData.seq,
            menuUrl: urlData.menuUrl,
            useYn: useYn
        })
            .subscribe(function (res) {
            if (res.success) {
                if (useYn == 'Y') {
                    alert("URL을 수정 하였습니다.");
                }
                else {
                    alert("URL을 삭제 하였습니다.");
                }
                _this.getUrlList();
                _this.urlInput = '';
            }
            else {
                alert("URL 수정/삭제를 실패 하였습니다.");
            }
        }, function (err) {
            if (err) {
                alert("URL 수정/삭제를 실패 하였습니다.");
            }
        });
    };
    return MenuMainComponent;
}());
MenuMainComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'menu.main.component.html',
        styleUrls: ['menu.main.component.css']
    }),
    __metadata("design:paramtypes", [main_content_component_1.MainContentComponent,
        menu_service_1.MenuService])
], MenuMainComponent);
exports.MenuMainComponent = MenuMainComponent;
//# sourceMappingURL=menu.main.component.js.map