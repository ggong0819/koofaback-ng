import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { CommonComponent} from '../../common/component'
import { ModalDirective } from 'ngx-bootstrap';

import { Authority } from './model/authority';
import { AuthService } from './auth.service';
import { MenuService } from '../menu/menu.service';


import { MainContentComponent } from '../../layout/main-content.component';
import { AuthMenuTreeComponent } from './auth-menu-tree.component';

@Component({
    moduleId: module.id,
    templateUrl: 'auth-detail.component.html',
    providers: [ AuthService, MenuService ]
})

export class AuthrityMngInsertComponent extends CommonComponent implements OnInit{
    
    private menuType :string = "insert";

    private menuList : any;
    private topMenuList : any;
    
    @ViewChild(AuthMenuTreeComponent) authTree: AuthMenuTreeComponent;

    public insertForm = this.fb.group({
         authName:["", ],
         authDel: ["N", ],
         displayYn : ["Y", ],
         authMenus : [],
     });


    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        public fb : FormBuilder,
        private mainComponent: MainContentComponent,        
        private authService: AuthService,
        private menuService: MenuService,
    ){
        super();
        mainComponent.menu = {
            category : "설정",
            menu : "권한관리"
        };
        
    }
    ngOnInit(): void {
        //1depth 메뉴 가지고 오기
        let observable =this.menuService.getMenuTree({depth:1})
        observable.subscribe(
            response => {
                // console.log("successResponse:",response.result);
                if(response.result){
                    this.menuList = response.result.list;
                    this.topMenuList = this.menuList["0"];
                }else{
                    this.menuList.length = 0;
                }
                
            }
        )
    }

    checkMenu(menuElement:HTMLInputElement){
        this.authTree.checkMenu(menuElement);
    }

    goList(){
        this.router.navigate(['/settings/authorityMng/list',{type:'userback'}]);
    }

    save(){
        if(!confirm('저장하시겠습니까?')){
             return false;
        }
            
       let authMenuList : NodeListOf<HTMLInputElement> = document.querySelectorAll('.auth-menu:checked') as NodeListOf<HTMLInputElement>;

       let authMenuArray = new Array();

        for(let i=0; i<authMenuList.length; i++){
            let authMenu : HTMLInputElement = authMenuList[i];
            authMenuArray.push(authMenu.value);
        }

        if(authMenuArray.length==0){
            alert('접근 메뉴를 선택해주세요.');
            return false;
        }

        this.insertForm.controls['authMenus'].setValue(authMenuArray, {});

        let formData = this.insertForm.value;

        let observable = this.authService.insertAuthority(formData);
        observable.subscribe(
            response => {
                if(response.success){
                    this.insertForm.reset();
                    alert("저장되었습니다.");
                    this.goList();
                }else{
                    alert("저장에 실패하였습니다.:"+response.errorMsg);
                }
            },
            error => {
                if(error){
                    alert('저장에 실패하였습니다.\n'+error.result.errorMsg);
                }
            },
            ()=> {
                    // console.log("the subscription is completed")
            }
        )
    }
}


