import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { CommonComponent} from '../../common/component'
import { ModalDirective } from 'ngx-bootstrap';

import { Authority } from './model/authority';
import { AuthService } from './auth.service';
import { MenuService } from '../menu/menu.service';

import { MainContentComponent } from '../../layout/main-content.component';
import { ListComponent } from "../../common/components/ListComponent";
import { CommonService } from "../../services/common.service";

@Component({
    moduleId: module.id,
    templateUrl: 'auth-list.component.html',
    providers: [ AuthService ]
})

export class AuthrityMngListComponent extends ListComponent implements OnInit {
    public initForm() {
        this.searchForm.addControl('displayYn', new FormControl(""));
        this.searchForm.addControl('authName', new FormControl(""));
    }

    private results : any = [];
    realListSize : number = 20;

    constructor(
        public route: ActivatedRoute,
        protected router: Router,
        public fb : FormBuilder,
        private mainComponent: MainContentComponent,
        private authService : AuthService,
        public commonService :CommonService,
    ){
        super(commonService, route);

        mainComponent.menu = {
            category : "설정",
            menu : "권한관리"
        };

    }
    
    ngOnInit(): void {
        this.initListComponent();
    }

    goDetail(authId:any){
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/authorityMng/detail/'+authId,{type:'modify'}]);
    }

    goRegist(){
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/authorityMng/insert',{type:'create'}]);
    }

    searchSubmit(){
        this.searchForm.controls['listSize'].setValue(this.realListSize, {});

        let formData = this.searchForm.value;
        
        let observable = this.authService.doSearch(formData);
        observable.subscribe(
            response => {
                // console.log("successResponse:",response.result);
                super.setPagination(response.result);
                if(response.result){
                    this.results = response.result.list;
                }else{
                    this.results.length = 0;
                }
                
            },
            error => {
                if(error){
                    alert('data를 가지고 올 수 없습니다.\n'+error.result.errorMsg);
                }
            }
        )
    }
}