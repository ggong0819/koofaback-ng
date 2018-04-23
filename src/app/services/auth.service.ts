import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cookie } from 'ng2-cookies';

import {NetService} from './net.service';
import { config } from '../config/config';

@Injectable()
export class AuthService extends NetService{
    private jsonHeaders = new Headers({'Content-Type': 'application/json'});

    constructor(
        private route: ActivatedRoute,
        protected router: Router,
        http: Http
    ) {
        super(http);
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(loginInfo:any){
        
        let observable = super.reqPost('/common/login.ajax', loginInfo, this.jsonHeaders);
        observable.subscribe(response => {
                if(response.result){
                    if(response.result.success){
                        this.redirectUrl = this.route.snapshot.queryParams['returnUrl'];
                        //유저정보 저장
                        if(response.result.userInfo){
                            super.setUserInfoData(response.result.userInfo);
                        }

                        if(this.redirectUrl && ''!=this.redirectUrl){
                            this.router.navigate([this.redirectUrl]);
                        }else{
                            this.router.navigate(['/']);
                        }

                    }else{
                        super.removeUserAuthData();
                        alert(response.result.errorMsg);
                    }
                }
                
            },
            error => {
                super.removeUserAuthData();
                console.error("Error : " , error);
                //alert('data를 가지고 올 수 없습니다.\nError :'+error);
            }
        );
    }

    logout(): void {
        super.removeUserAuthData();
        this.router.navigate(['/login']);
    }
    
    isLogin(){
        // console.log('로그인 체크 합니다.~');
        if(super.getAuthInfo()) {
            // console.log('data 있으니까 로그인 되어 있습니다.');
            return true;
        }else{
            // console.log('data 없으니 로그인 안되어 있습니다.');
            return false;
        }
    }

    getUserInfo() : any{
        if(!this.isLogin()){
            return null;
        }
        
        let userInfo = super.getUserInfoData();

        if(userInfo){
            // console.log('userInfo 있음', JSON.parse(userInfo))
            return JSON.parse(userInfo);
        }else{
            return null;
        }
    }

}