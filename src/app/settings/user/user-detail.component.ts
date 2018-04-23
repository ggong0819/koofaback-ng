import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { CommonComponent} from '../../common/component'
import { ModalDirective } from 'ngx-bootstrap';

import { User } from './model/user';
import { UserService } from './user.service';
import { AuthService } from '../authority/auth.service';

import { MainContentComponent } from '../../layout/main-content.component';


@Component({
    moduleId: module.id,
    templateUrl: 'user-detail.component.html',
    providers: [ UserService, AuthService]
})

export class UserDetailComponent extends CommonComponent implements OnInit  {
    private initFormData:any;
    private authList : any = [];
    private userId : any;
    private userInfo : any = {};
    private loginLogList : any = [];
    private checkedDuplication = false;

    public insertForm = this.fb.group({
        userId:[],
        loginId:[, ],
        name:[, ],
        password:[, ],
        authId : [ ],
        status : [,],
     });

     public loginLogForm = this.fb.group({
         listSize : [20, ],
         pageNo : [1, ],
     });

     constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        public fb : FormBuilder,
        private mainComponent: MainContentComponent,        
        private userService: UserService,
        private authService: AuthService
    ){
        super();
        mainComponent.menu = {
            category : "설정",
            menu : "사용자관리"
        };
        
    }


    ngOnInit(): void {
        this.userId = this.route.snapshot.params['userId'];

        let userObservable =this.userService.getDetail(this.userId);
        userObservable.subscribe(
            response => {
                if(response.result){
                    this.userInfo = response.result.user;
                    
                    this.insertForm.controls['authId'].setValue(this.userInfo.authId, {});
                    this.insertForm.controls['userId'].setValue(this.userInfo.userId, {});
                    this.insertForm.controls['loginId'].setValue(this.userInfo.loginId, {});
                    this.insertForm.controls['name'].setValue(this.userInfo.name, {});
                    this.insertForm.controls['status'].setValue(this.userInfo.status, {});

                    this.initFormData = this.insertForm.value;
                }
            },
            error => {
                if(error){
                    alert('data를 가지고 올 수 없습니다.\n'+error.result.errorMsg);
                }
            },
        )

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

        this.getLoginLog(1);
    }

    setUnchecked(){
        // console.log(this.insertForm.controls['loginId'].value);
        this.checkedDuplication = false;
    }

    checkDuplication(){
        let param = {'loginId':this.insertForm.controls['loginId'].value};

        this.userService.checkDuplication(param).subscribe(
            response => {
                if(!response.result.duplicate){
                    this.checkedDuplication = true;
                    alert("사용 가능한 아이디 입니다.");
                }else{
                    alert("이미 사용중인 아이디 입니다.");
                }
            },
            error => {
                if(error){
                    alert('중복확인에 실패하였습니다. 관리자에게 문의 해주세요.\n'+error.result.errorMsg);
                }
            }
        )

    }

    goList(){
        this.router.navigate(['/settings/userMng/list',{type:'userback'}]);
    }

    save(){
        if(!confirm('저장하시겠습니까?')){
             return false;
        }

        if(this.initFormData.loginId != this.insertForm.controls['loginId'].value){
            if(!this.checkedDuplication){
                alert('아이디 중복검사를 진행해주세요.');
                return false;
            }
        }
        

        let formData = this.insertForm.value;

        if(formData == this.initFormData){
            alert('변경 사항이 없습니다.');
            return false;
        }
        // console.log(formData)
        // console.log(this.initFormData)

        let observable = this.userService.updateUser(formData);
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
            }
        )
    }

    getLoginLog(pageNo:any){
        let observable = this.userService.getLoginLog({'userId':this.userId,'pageNo':pageNo, 'listSize':20});
        observable.subscribe(
            response => {
                // console.log("successResponse:",response.result);
                super.setPagination(response.result);
                if(response.result){
                    this.loginLogList = response.result.list;
                }else{
                    this.loginLogList.length = 0;
                }
                
            },
            error => {
                if(error){
                    alert('data를 가지고 올 수 없습니다.\n'+error.result.errorMsg);
                }
            }
        )
    }

    public pageChanged(event:any):void {
        super.setPage(event);
        this.getLoginLog(event);        
    }

}