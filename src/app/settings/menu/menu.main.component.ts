import { Component, OnInit} from '@angular/core';
import { MenuService } from './menu.service'; 
import { MainContentComponent } from '../../layout/main-content.component';
import { TreeView } from '../../common/components/tree/tree.component';
import { MenuTreeModelConverter, MenuTreeNode } from './menu.tree.component';


@Component({
    moduleId: module.id,
    templateUrl: 'menu.main.component.html',
    styleUrls: ['menu.main.component.css']
})

export class MenuMainComponent implements OnInit{

    private node: MenuTreeNode;         //View 상에서 작업을 위한 트리 정보 
    private currentNode: MenuTreeNode;  //현재 선택된 노드
    private nodeViewInfo: any = {       //노드를 직접 바인딩 하면 값이 변경되므로 뷰에서 사용할 바인딩용 템프 객체를 만든다 
        menuName:'',
        menuUrl:'',
        displayYn:'Y'
    };
    private urlList: any[];
    private urlInput: string = '';

    constructor(
        private mainComponent: MainContentComponent, 
        private menuService: MenuService,
    ){
        mainComponent.menu = {
            category : "설정",
            menu : "메뉴 관리"
        };
    }

    ngOnInit(){
        this.getMenuTree();
    }

    getMenuTree(){
        this.currentNode = null;
        this.node = null;
        this.menuService.getMenuList()
        .subscribe(
            res => {
                let converter: MenuTreeModelConverter = new MenuTreeModelConverter();
                this.node = converter.rawToTreeNode(res.result, null);
            },
            err => {
                if (err){
                    console.log('에러');
                }
            }
        );
    }

    //선택 이벤트 처리 
    eventSelectNode(selectNode: MenuTreeNode){
        this.node.setSelect(selectNode);
        this.currentNode = selectNode;
        this.getUrlList();
        this.nodeViewInfo.menuName = this.currentNode.menuName;
        this.nodeViewInfo.menuUrl = this.currentNode.menuUrl;
        this.nodeViewInfo.displayYn = this.currentNode.displayYn;
    }

    //노드 위로 이벤트 처리 
    private nodeUp(): void{
        if (this.currentNode != null){
            this.currentNode.indexUp();
        }
    }

    //노드 아래로 이벤트 처리
    private nodeDown(): void{
        if (this.currentNode != null){
            this.currentNode.indexDown();
        }
    }   

    /**
     * 하위 메뉴 생성
     */
    private createNewChildNode(): void{
        if (this.currentNode != null){
            var params = {
                parentMenuId: this.currentNode.menuId,
                menuLevel: this.currentNode.menuLevel+1
            }

            this.menuService.createChildMenu(params)
            .subscribe(
                res => {
                    if (res.success){
                        alert('메뉴 생성을 성공 하였습니다.');
                        this.getMenuTree();
                    }
                    else{
                        alert('메뉴 생성을 실패 하였습니다.');
                    }
                },
                err => {
                    if (err){
                        alert('메뉴 생성을 실패 하였습니다.');
                    }
                }
            );
        }
    }

    /**
     * 메뉴 삭제
     */
    private deleteMenu(): void{
        var res = confirm("선택한 메뉴를 정말로 삭제 하시겠습니까?");
        if (res == true){
            let list: any[] = [];
            this.currentNode.getParamValueWithChild(list);
            for (let i=0;i<list.length;i++){
                let node: any = list[i];
                node.useYn = 'N';
            }            
            this.menuService.updateMenuInfo(list)
            .subscribe(
                res => {
                    if (res.success){
                        alert("삭제 되었습니다.");
                        this.getMenuTree();
                    }
                    else{
                        alert("삭제를 실패 하였습니다.");
                    }
                },
                err => {
                    if (err){
                        alert("삭제를 실패 하였습니다.");
                    }
                }
            );
        }
    }

    /**
     * 메뉴 정보 업데이트
     */
    private saveMenuInfo(): void{
        let list: any[] = [];
        var nodeParam = this.currentNode.getParamValue();
        nodeParam.menuName = this.nodeViewInfo.menuName;
        nodeParam.menuUrl = this.nodeViewInfo.menuUrl;
        nodeParam.displayYn = this.nodeViewInfo.displayYn;
        list.push(nodeParam);
        this.requestUpdateMenuInfo(list);
    }

    /**
     * 
     * @param param 메뉴 정보 저장
     */
    private requestUpdateMenuInfo(param:any){
        this.menuService.updateMenuInfo(param)
        .subscribe(
            res => {
                if (res.success){
                    alert("저장 되었습니다.");
                    this.getMenuTree();                    
                }
                else{
                    alert("저장을 실패 하였습니다.");
                }
            },
            err => {
                if (err){
                    alert("저장을 실패 하였습니다.");
                }
            }
        );        
    }

    /**
     * 순서 변경 저장
     */
    private saveAllMenuOnChange(): void{    
        var res = confirm("메뉴 순서 변경 내용을 저장하시겠습니까?");
        if (res == true){
            this.node.setSort(0);   //Sort값 현재 순서로 모두 변경
            let diff: MenuTreeNode[] = [];
            this.findDiffSort(this.node, diff);
            if (diff != null && diff.length > 0){
                let list: any[] = [];
                for (let child of diff){
                    // console.log("child : " + child.menuName);    
                    list.push(child.getParamValue());
                }
                this.requestUpdateMenuInfo(list);
            }
            else{
                console.log("Diff is null");
            }
        }
    }

    /**
     * 트리 전체 탐색
     */
    private findDiffSort(node: MenuTreeNode, saveArray: MenuTreeNode[]){
        if (node.childList != null){
            for (let child of node.childList){
                this.findDiffSort(<MenuTreeNode>child, saveArray);
            }
        }
        if (node.displayOrder != node.originDisplayOrder){
            saveArray.push(node);
        }
    }

    private getUrlList(){
        this.menuService.getUrlList({menuId: this.currentNode.menuId})
        .subscribe(
            res => {
                this.urlList = res.result;
            },
            err => {
                if (err){
                    alert("URL 리스트를 불러오는데 실패 하였습니다.");
                }
            }
        );
    }

    private addUrl(url: string){
        this.menuService.addUrl({
            menuId: this.currentNode.menuId,
            menuUrl: url
        })
        .subscribe(
            res=>{
                if (res.success){
                    alert("URL을 추가 하였습니다.");
                    this.getUrlList();
                    this.urlInput = '';
                }
                else{
                    alert("URL 추가를 실패 하였습니다.");
                }

            },
            err => {
                if (err){
                    alert("URL 추가를 실패 하였습니다.");
                }
            }
        )
    }

    private modifyUrl(urlData: any, useYn: string){
        this.menuService.modifyUrl({
            seq: urlData.seq,
            menuUrl: urlData.menuUrl,
            useYn: useYn
        })
        .subscribe(
            res=>{
                if (res.success){
                    if (useYn == 'Y'){
                        alert("URL을 수정 하였습니다.");
                    }
                    else{
                        alert("URL을 삭제 하였습니다.");
                    }
                    this.getUrlList();
                    this.urlInput = '';
                }
                else{
                    alert("URL 수정/삭제를 실패 하였습니다.");
                }
            },
            err => {
                if (err){
                    alert("URL 수정/삭제를 실패 하였습니다.");
                }
            }
        )
    }
}