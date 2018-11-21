import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { NetService } from '../../services/net.service';

@Injectable()
export class WorkService extends NetService {
  private jsonHeaders = new Headers({ 'Content-Type': 'application/json' });
  private formHeaders = new Headers({ 'Content-Type': 'x-www-form-urlencoded' });

  constructor(
    http: Http
  ) {
    super(http);

  }

  searchWork(param: any) {
    return super.reqPost('/work/workList.ajax', param, this.jsonHeaders);
  }

  getWorkDetail(workId: any) {
    return super.reqGet('/work/workDetail/' + workId + '.ajax');
  }

  registWork(param: any) {
    return super.reqPost('/work/registWork.ajax', param, this.formHeaders);
  }

  updateWork(param: any) {
    return super.reqPost('/work/updateWork.ajax', param, this.formHeaders);
  }

  deleteWork(param: any) {
    return super.reqPost('/work/deleteWork.ajax', param, this.formHeaders);
  }


  searchWorkRequest(param: any) {
    return super.reqPost('/work/requestList.ajax', param, this.jsonHeaders);
  }

  getWorkRequestDetail(workRequestId: any) {
    return super.reqGet('/work/workRequestDetail/' + workRequestId + '.ajax');
  }

  registWorkRequest(param: any) {
    return super.reqPost('/work/registWorkRequest.ajax', param, this.formHeaders);
  }

  updateWorkRequest(param: any) {
    return super.reqPost('/work/updateWorkRequest.ajax', param, this.formHeaders);
  }

  deleteWorkRequest(param: any) {
    return super.reqPost('/work/deleteWorkRequest.ajax', param, this.formHeaders);
  }

  getWorkUserList(status: any) {
    return super.reqGet('/work/workUserList.ajax?status=' + status);
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


