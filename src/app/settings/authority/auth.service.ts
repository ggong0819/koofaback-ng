import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Authority } from './model/authority';

import { config } from '../../config/config';
import { NetService } from '../../services/net.service';

@Injectable()
export class AuthService extends NetService{

  private jsonHeaders = new Headers({'Content-Type': 'application/json'});
  private formHeaders = new Headers({'Content-Type': 'x-www-form-urlencoded'});

  constructor(
    http: Http,

  ){
    super(http);
  }
  
  retrieveAllList(){
    return super.reqGet('/authManage/listAll.ajax');
  }

  doSearch(param : any){
    return super.reqPost('/authManage/list.ajax', param, this.jsonHeaders);
  }

  insertAuthority (param:any){
    return super.reqPost('/authManage/insertAuthority.ajax', param, this.formHeaders);
  }

  updateAuthority (param:any){
    return super.reqPost('/authManage/updateAuthority.ajax', param, this.formHeaders);
  }

  getDetail(authId : any){
    return super.reqGet('/authManage/detail/'+authId+'.ajax');
  }

}