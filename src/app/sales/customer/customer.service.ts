import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { NetService } from '../../services/net.service';

import { Customer } from './model/customer';



@Injectable()
export class CustomerService extends NetService{
  private jsonHeaders = new Headers({'Content-Type': 'application/json'});
  private formHeaders = new Headers({'Content-Type': 'x-www-form-urlencoded'});

  constructor(
    http: Http
  ){
    super(http);

  }

  search(param : any){
    return super.reqPost('/customer/list.ajax', param, this.jsonHeaders);
  }

  updateCustomer (param:any){
    return super.reqPostPart('/customer/update.ajax', param, this.formHeaders);
  }

  getDetail(customerId : any){
    return super.reqGet('/customer/detail/'+customerId+'.ajax');
  }

  registCustomer(param : any){
    return super.reqPostPart('/customer/regist.ajax', param, this.formHeaders);
  }

  getAllCustomerList(){
    return super.reqPost('/customer/allList.ajax', null, this.jsonHeaders);
  }

  private jwt() {
      // create authorization header with jwt token
      let currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
      if (currentCustomer && currentCustomer.token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + currentCustomer.token });
          return new RequestOptions({ headers: headers });
      }
  }
  

}


