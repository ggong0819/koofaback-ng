import { Component,ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';


import {AuthService} from '../services/auth.service'
import {UserService} from '../settings/user/user.service'

import { config } from '../config/config';
import { CommonComponent} from '../common/component'
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'top-header',
  templateUrl: 'header.component.html',
  providers:[AuthService, UserService]
})
export class HeaderComponent extends CommonComponent  {
  private userInfo : any;

  @ViewChild('passwordChangeModal') public passwordChangeModal:ModalDirective;

  constructor(
        private authService : AuthService,
        private userService : UserService,
        public fb : FormBuilder,
    ){
      super();
      let userData = localStorage.getItem(config.localStorageUserInfoKey);

      if(userData){
          this.userInfo = JSON.parse(userData);
          if(this.userInfo && this.userInfo.menuList){
            this.passwordForm.controls['userId'].setValue(this.userInfo.userId);
          }
      }
    }

    logout(){
        this.authService.logout();
    }

    public passwordForm = this.fb.group({         
         userId:[''],
         currentPassword: [""],
         newPassword: [""],
         cfrmPassword:["",]
     });

    initModalData(){
        this.passwordForm.reset();
    }

    changePassword(){
      let regExp = new RegExp('^[a-zA-Z0-9]+$');

      if(''==this.passwordForm.controls.currentPassword.value){
          alert('현재 비밀번호를 입력해주세요.');
          return ;
      }

      if(''==this.passwordForm.controls.newPassword.value || ''==this.passwordForm.controls.cfrmPassword.value){
          alert('새로운 비밀번호를 입력해주세요.');
          return ;
      }

      if(regExp.test(this.passwordForm.controls.newPassword.value) || this.passwordForm.controls.cfrmPassword.value.length < 8){
          alert('비밀번호에 특수문자 포함 8자 이상 입력해주세요.');
          return ;
      }

      if(this.passwordForm.controls.newPassword.value !== this.passwordForm.controls.cfrmPassword.value){
          alert('변경할 비밀번호가 일치하지 않습니다.');
          return ;
      }


      let observable = this.userService.changeUserPassword(this.passwordForm.value);
      observable.subscribe(
            response => {
                if(response.success){
                    this.passwordForm.reset();
                    alert("비밀번호가 변경되었습니다.");
                    this.passwordChangeModal.hide();
                }else{
                    alert(response.errorMsg);
                }
            },
            error => {
                if(error){
                    // console.log("Error happened" , error);
                    alert("저장에 실패하였습니다.\n"+error);
                }
            },
            ()=> {
                    // console.log("the subscription is completed")
            }
        )



    }
}