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

export class AuthrityMngDetailComponent extends CommonComponent implements OnInit{
    private initFormData:any;
    private initAuthMenuList = new Array();

    private authId :string;
    private menuType :string = "detail";
    private mergeColspan = 3;


    private authority : any = {};
    private menuList : any;
    private topMenuList : any;

    @ViewChild(AuthMenuTreeComponent) authTree: AuthMenuTreeComponent;

    

    public insertForm = this.fb.group({
        authId:[, ],
        authName:[, ],
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
    ){
        super();
        mainComponent.menu = {
            category : "설정",
            menu : "권한관리"
        };

        super.setBackButtonHandler(this.goList);
        
    }
    ngOnInit(): void {
        this.authId = this.route.snapshot.params['authId'];

        this.route.data
        .subscribe((data: any) => {
            this.menuType = data.menuType;
        });


        //datail 가지고 오기
        let observable =this.authService.getDetail(this.authId)
        observable.subscribe(
            response => {
                if(response.result){
                    this.authority = response.result.authority;
                    this.menuList = response.result.menuList;
                    this.topMenuList = this.menuList["0"];
                    this.insertForm.controls['authId'].setValue(this.authority.authId, {});
                    this.insertForm.controls['authName'].setValue(this.authority.authName, {});
                    this.insertForm.controls['authDel'].setValue(this.authority.authDel, {});

                    this.getPreviousAuthMenuList(this.menuList)
                }else{
                    this.menuList.length = 0;
                }
                this.initFormData = this.insertForm.value;
            },
        )
    }

    getPreviousAuthMenuList(menuList:any[]) {
        for(let key in menuList){
            // console.debug(key+' instanceOf :',menuList[key] instanceof Array)
            if(menuList[key] instanceof Array){
                this.getPreviousAuthMenuList(menuList[key]);
            }else{
                // console.debug('menuList[key]:', menuList[key])
                // console.debug('menuList[key].isHave:', menuList[key].isHave)
                if(1 == menuList[key].isHave){
                    this.initAuthMenuList.push(''+menuList[key].menuId);
                }
            }
            
        }

        // console.debug('authMenuList:',this.initAuthMenuList)
    }

    checkMenu(menuElement:HTMLInputElement){
        this.authTree.checkMenu(menuElement);
    }
    

    goList(){
        this.router.navigate(['/settings/authorityMng/list',{type:'userback'}]);
    }

    getAuthMenuArray(): any[]{
        let authMenuArray = new Array();

        let authMenuList : NodeListOf<HTMLInputElement> = document.querySelectorAll('.auth-menu:checked') as NodeListOf<HTMLInputElement>;

        for(let i=0; i<authMenuList.length; i++){
            let authMenu : HTMLInputElement = authMenuList[i];
            authMenuArray.push(authMenu.value);
        }

        return authMenuArray;
    }

    save(){
        if(!confirm('저장하시겠습니까?')){
             return false;
        }

       let authMenuArray = this.getAuthMenuArray();
       

        if(authMenuArray.length==0){
            alert('접근 메뉴를 선택해주세요.');
            return false;
        }

        let formDataChanged = true;
        let formData = this.insertForm.value;

        if(formData == this.initFormData){
            formDataChanged = false;
        }

        this.insertForm.controls['authMenus'].setValue(authMenuArray, {});
        formData = this.insertForm.value;

        

        let currentAuthMenuList = this.insertForm.controls['authMenus'].value.sort();
        this.initAuthMenuList = this.initAuthMenuList.sort();
        
        let authMenuChanged = false;

        if(this.initAuthMenuList.length != currentAuthMenuList.length){
            authMenuChanged = true;
        }else{
            for(let i=0; i< this.initAuthMenuList.length; i++){
                if(this.initAuthMenuList[i] != currentAuthMenuList[i]){
                    authMenuChanged = true;
                    break;
                }
            }
        }

        if(!formDataChanged && !authMenuChanged){
            alert('변경 사항이 없습니다.');
            return false;
        }

        // console.debug(formData)
        let observable = this.authService.updateAuthority(formData);
        observable.subscribe(
            response => {
                if(response.success){
                    this.insertForm.reset();
                    alert("저장되었습니다.");
                    this.goList();
                }else{
                    alert("저장에 실패하였습니다.:\n"+response.errorMsg);
                }
            },
            error => {
                if(error){
                    alert('저장에 실패하였습니다.\n'+error.result.errorMsg);
                }
            },
        )
    }
}


