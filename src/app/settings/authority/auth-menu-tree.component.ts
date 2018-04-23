import { Component, Input, Host } from '@angular/core';

import {AuthrityMngInsertComponent} from './auth-insert.component';
import {AuthrityMngDetailComponent} from './auth-detail.component';

@Component({
    moduleId: module.id,
    selector:'auth-menu-tree',
    templateUrl: 'auth-menu-tree.component.html',    
})

export class AuthMenuTreeComponent{
    @Input() menuList:any;
    @Input() allMenuList:any;

    constructor(
    ){

    }

    findParentElementByTagName(menuElement : any, tagName : string){
        let parent = menuElement.parentElement;
        while(parent){
            parent = parent.parentElement;
            if(parent.tagName == tagName){
                return parent;
            }
        }
    }

    checkParentMenus(ROOT : any, menuElement : any, checked:any){
        if(checked){
            let parent : HTMLInputElement = ROOT.querySelector('.auth-menu[value="'+menuElement.getAttribute('parentMenuId')+'"]') as HTMLInputElement;
            if(parent){
                parent.checked = checked;
                this.checkParentMenus(ROOT, parent, checked);
            }
        }else{
            //하위메뉴들이 선택된게 없으면 상위 메뉴 체크 해제
            //최상위 메뉴는 할 필요 없다.
            let parentMenuId = menuElement.getAttribute('parentMenuId');
            if('0'!=parentMenuId){
                let parent = this.findParentElementByTagName(menuElement,'AUTH-MENU-TREE');
                let siblings = parent.querySelectorAll('.auth-menu[parentMenuId="'+parentMenuId+'"]') as NodeListOf<HTMLInputElement>;

                let siblingChecked : boolean = false;
                for(let i=0; i<siblings.length; i++){
                    if(siblings[i].checked){
                        siblingChecked = true;
                        break;
                    }
                }

                if(!siblingChecked){
                    let parentMenu = ROOT.querySelector('.auth-menu[value="'+parentMenuId+'"]') as HTMLInputElement;
                    if(parentMenu){
                        parentMenu.checked = false;
                        this.checkParentMenus(ROOT, parentMenu, checked);
                    }
                    
                }
                
            }
        }
    }

    checkChildMenus(childs : NodeListOf<HTMLInputElement>, checked:any){
        for(let i=0;i<childs.length; i++){
            let child = childs[i];
            child.checked = checked;
            this.checkChildMenus(child.parentElement.querySelectorAll('.auth-menu[parentMenuId="'+child.value+'"]') as NodeListOf<HTMLInputElement>, checked);
        }
    }

    checkMenu(menuElement:HTMLInputElement){
        //상,하위 노드들을 찾아서 checkbox를 세팅한다.

        let parentMenuId = menuElement.getAttribute('parentMenuId');

        let checked = menuElement.checked;

        const ROOT = this.findParentElementByTagName(menuElement,'TR');

        //부모 메뉴 체크 박스 세팅
        this.checkParentMenus(ROOT, menuElement, checked);

        let targetElement :any = menuElement.parentElement;
        if('0'==parentMenuId){
            targetElement = ROOT;
        }

        //자식 메뉴 체크 박스 세팅
        let childs : NodeListOf<HTMLInputElement> = targetElement.querySelectorAll('.auth-menu[parentMenuId="'+menuElement.value+'"]') as NodeListOf<HTMLInputElement>;
        this.checkChildMenus(childs,checked);
    }
}