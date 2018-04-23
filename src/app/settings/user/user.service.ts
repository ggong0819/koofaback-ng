import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { NetService } from '../../services/net.service';

import { User } from './model/user';



@Injectable()
export class UserService extends NetService{
  private jsonHeaders = new Headers({'Content-Type': 'application/json'});
  private formHeaders = new Headers({'Content-Type': 'x-www-form-urlencoded'});
  public statusList:any;

  constructor(
    http: Http
  ){
    super(http);

    this.statusList = [
      { value : '0', name : '재직 중', checked:true},
      { value : '1', name : '퇴사', checked:true},
      { value : '2', name : '사용중지', checked:true},
      { value : '3', name : '승인대기', checked:true}
    ];
  }

  search(param : any){
    return super.reqPost('/userMng/list.ajax', param, this.jsonHeaders);
  }

  updateUser (param:any){
    return super.reqPost('/userMng/updateUser.ajax', param, this.formHeaders);
  }

  getDetail(userId : any){
    return super.reqGet('/userMng/detail/'+userId+'.ajax');
  }

  checkDuplication(param : any){
    return super.reqPost('/userMng/checkDuplication.ajax',param, this.jsonHeaders);
  }

  registUser(param : any){
    return super.reqPut('/userMng/regist.ajax', param, this.formHeaders);
  }

  login(param : any){
    return super.reqPost('/userMng/login.ajax', param, this.formHeaders);
  }

  getUserInfoById(id: number) {
    return super.reqGet('/userMng/info/'+ id+'.ajax');
  }

  getLoginLog(param : any){
    return super.reqPost('/userMng/loginLog.ajax', param, this.jsonHeaders);
  }

  changeUserPassword(param : any){
    return super.reqPost('/userMng/changePassword.ajax', param, this.jsonHeaders);
  }

  private jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
          return new RequestOptions({ headers: headers });
      }
  }

}