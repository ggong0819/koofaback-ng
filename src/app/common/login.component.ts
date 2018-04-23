import 'rxjs/add/operator/switchMap';
import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import {User} from '../settings/user/model/user';
import { UserService } from '../settings/user/user.service';

import { ModalDirective } from 'ngx-bootstrap';
import { CommonComponent} from '../common/component'

import {AuthService} from '../services/auth.service'


declare function reloadHeight(): void;

@Component({
    moduleId : module.id,
    templateUrl: 'login.component.html',
    providers:[UserService, AuthService]
})

export class LoginComponent extends CommonComponent implements OnInit{

    user: User;

    private savedLoginId :any;

    private checkedDuplication:boolean;

    @ViewChild('alertModal') public alertModal:ModalDirective;

    alertModalMsg = "";

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public fb : FormBuilder,
        public sanitizer: DomSanitizer,
        private authService : AuthService
    ) {
        super();
    }

    ngOnInit(): void {
        reloadHeight();
        if(localStorage.getItem('savedLoginId') && 'null'!=localStorage.getItem('savedLoginId')){
            this.savedLoginId = localStorage.getItem('savedLoginId');
            this.loginForm.controls['loginId'].setValue(this.savedLoginId);
        }
    }
   

    public loginForm = this.fb.group({
         loginId:[this.savedLoginId, [Validators.required]],
         password: ["", Validators.required],
         name:["",Validators.required],
         nickName:["",Validators.required],
         cfrmPassword:["",Validators.required]
         //  email: ["", [Validators.required,emailValidator]],
     });

     public userRegForm = this.fb.group({
         loginId:["", [Validators.required]],
         password: ["", Validators.required],
         name:["",Validators.required],
         nickName:["",Validators.required],
         cfrmPassword:["",Validators.required]
         //  email: ["", [Validators.required,emailValidator]],
     });

     doLogin(){
         let formData = this.loginForm.value;
         let saveIdCheckbox : HTMLInputElement = document.getElementById('saveId') as HTMLInputElement;
         if(saveIdCheckbox.checked){
             localStorage.setItem('savedLoginId',this.loginForm.controls.loginId.value);
         }
         this.authService.login(formData);
     }

    doRegist() {

        if(!this.checkedDuplication){
            alert('아이디 중복검사를 진행해주세요.');
            return false;
        }
        
        let regExp = new RegExp('^[a-zA-Z0-9]+$');

        if(regExp.test(this.userRegForm.controls.password.value) || this.userRegForm.controls.password.value.length < 8){
            alert('비밀번호에 특수문자 포함 8자 이상 입력해주세요.');
            return false;
        }

        if(this.userRegForm.controls.password.value !== this.userRegForm.controls.cfrmPassword.value){
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }

        let formData = this.userRegForm.value;

        let observable = this.userService.registUser(formData);
        observable.subscribe(
            response => {
                // console.log("successResponse:", response);
                if (response.success) {
                    this.userRegForm.reset();
                    alert("등록되었습니다.\n관리자 승인을 기다려 주세요.");
                } else {
                    alert(response.errorMsg);
                }
                
            },
            error => {
                console.log("Error happened" + error);
                alert('등록에 실패하였습니다. ');
            },
            ()=> { console.log("the subscription is completed")}
        )
    }

    saveLoginId(event:any){
        let saveValue;
        if(event.target.checked){
            saveValue = this.loginForm.controls.loginId.value;
        }else{
            saveValue = '';
        }
        
        localStorage.setItem('savedLoginId',saveValue);
    }

    getUserInfo(value : any){
        if(value){
            let result = this.userService.getUserInfoById(value);
            result.subscribe(
                response => {
                    // console.log("successResponse:"+response.result);
                    this.user = response;
                },
                error => { console.log("Error happened" + error)},
                ()=> { console.log("the subscription is completed")}
            );
        }else{
            this.route.params
            .switchMap((params: Params) => this.userService.getUserInfoById(+params['id']))
            .subscribe(response => this.user = response);
        }
    }

    goHome() : void{
        this.router.navigateByUrl('/');
    }

    checkDuplication(){
        if(''==this.userRegForm.controls.loginId.value){
            alert('ID를 입력해주세요.');
            return false;
        }

        let param = {'loginId':this.userRegForm.controls.loginId.value};

        this.userService.checkDuplication(param).subscribe(
            response => {
                if(!response.result.duplicate){
                    this.checkedDuplication = true;
                    alert("사용 가능한 아이디 입니다. ");
                }else{
                    alert("이미 사용중인 아이디 입니다. ");
                }
            },
            error => {
                if(error){
                    // console.log("Error happened" , error);
                    alert("중복확인에 실패하였습니다. 관리자에게 문의 해주세요.\n"+error);
                }
            }
        )

    }

    setUnchecked(){
        // console.log(this.insertForm.controls['loginId'].value);
        this.checkedDuplication = false;
    }

    initModalData(){
        this.userRegForm.reset();
    }
  
}


function emailValidator(fc: FormControl) {
    console.log('이메일도 체크한다~~~');
  if(fc.value.indexOf('magic') >= 0) {
    console.log('not valid')
    return {
      noMagic: true
    }
  }

  // Null means valid, believe it or not
  console.log('valid')
  return null
}
