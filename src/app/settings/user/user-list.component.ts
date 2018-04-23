import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { CommonComponent} from '../../common/component'
import { ModalDirective } from 'ngx-bootstrap';

import { User } from './model/user';
import { UserService } from './user.service';
import { AuthService } from '../authority/auth.service';
import { NetService } from '../../services/net.service';

import { MainContentComponent } from '../../layout/main-content.component';
import { ListComponent } from "../../common/components/ListComponent";
import { CommonService } from "../../services/common.service";

@Component({
    moduleId: module.id,
    templateUrl: 'user-list.component.html',
    providers: [ UserService ]
})

export class UserListComponent extends ListComponent implements OnInit {

    private results : any = [];
    private authList : any = [];
    realListSize : number = 20;
    private statusList:any;
    private searchTypeOptions:any;

    constructor(
        public route: ActivatedRoute,
        protected router: Router,
        public fb : FormBuilder,
        private mainComponent: MainContentComponent,
        private userService : UserService,
        private authService : AuthService,
        public commonService :CommonService,
    ){
        super(commonService, route);

        mainComponent.menu = {
            category : "설정",
            menu : "사용자관리"
        };

        this.searchTypeOptions = [
            { id : "name", name : '이름'},
            { id : "loginId", name : '아이디'}
        ];

        this.statusList = userService.statusList;
    }

    ngOnInit(): void {
        let observable =this.authService.retrieveAllList()
        observable.subscribe(
            response => {
                if(response.result){
                    this.authList = response.result.list;
                }
            },
            error => {
                if(error){
                    alert('data를 가지고 올 수 없습니다.\n'+error.result.errorMsg);
                }
            }
        )

        this.initListComponent();
        
        if(this.searchForm && this.searchForm.controls['status0']){
            for(let status of this.statusList){
                if(this.searchForm.controls['status'+status.value].value != null){
                    status.checked = this.searchForm.controls['status'+status.value].value;
                }
            }
        }
    }

    public initForm() {
        for(let status of this.userService.statusList){
            this.searchForm.addControl('status'+status.value, new FormControl());
        }
        this.searchForm.addControl('authId', new FormControl(""));
        this.searchForm.addControl('searchType', new FormControl(0));
        this.searchForm.addControl('searchText', new FormControl(""));
    }

    searchSubmit(){
        this.searchForm.controls['listSize'].setValue(this.realListSize, {});

        let formData = this.searchForm.value;
        formData.status = this.userSelectedStatList;
        
        let observable = this.userService.search(formData);
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

    get userSelectedStatList() { // right now: ['1','3']
        return this.userService.statusList
                .filter((opt:any) => opt.checked)
                .map((opt:any) => opt.value)
    }

    goDetail(userId:any){
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/userMng/detail/'+userId, {type:'modify'}]);
    }

}