/*
* Network Service Observable Base
* @author : 시공교육 최광윤
*/

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { config } from '../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NetService{
    
    constructor (private http: Http){

    }

    appendAuthHeader(header?:Headers) : RequestOptions{
        let reqHeader = new Headers({ 'Content-Type': 'application/json'});
        
        if(header){            
            reqHeader = header;
        }

        if(localStorage.getItem(config.authKey)){
            reqHeader.append(config.authKey, localStorage.getItem(config.authKey));
        }

        return new RequestOptions({ headers: reqHeader });
    }

    appendAuthHeaderPart(header?:Headers) : RequestOptions{
        let reqHeader = new Headers();

        if(header){            
            reqHeader = header;    
        }

        if(localStorage.getItem(config.authKey)){
            reqHeader.append(config.authKey, localStorage.getItem(config.authKey));
        }

        return new RequestOptions({ headers: reqHeader });
    }

    //Get 요청
    reqGet(requrl: string): Observable<any>{
        console.debug('request Get : ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http
                    .get(config.apiEndPoint.concat(requrl), reqOptions)
                    .map(this.handleResponse)
                    .catch(this.handleError);
    }

    //Post 요청
    reqPost(requrl: string, params: any, header?:Headers): Observable<any>{
        console.debug('request Post : ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http.post(config.apiEndPoint.concat(requrl), params, reqOptions)
                    .map(this.handleResponse)
                    .catch(this.handleError);
    }

    //Post 요청
    reqPostPart(requrl: string, params: any, header?:Headers): Observable<any>{
        console.debug('request Post : ' + requrl);
        let reqOptions = this.appendAuthHeaderPart();

        return this.http.post(config.apiEndPoint.concat(requrl), params, reqOptions)
                    .map(this.handleResponse)
                    .catch(this.handleError);
    }

    //Put 요청
    reqPut(requrl: string, params: any, header?:Headers): Observable<any>{
        console.debug('request Put: ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http.put(config.apiEndPoint.concat(requrl), params, reqOptions)
                    .map(this.handleResponse)
                    .catch(this.handleError);
    }

    private handleResponse(res: Response){
        let jsonData = res.json();

        try {
            let authHeader = res.headers.get(config.authKey);
            //인증정보를 매번 갱신한다.
            if(authHeader){
                localStorage.setItem(config.authKey,authHeader);
            }
        } catch (e) {
            console.error(e);
        }

        return jsonData;
    }

    private handleError(err: any){
        // console.debug('Error err.json() : ',err.json());
        // console.debug('err.json().httpStatus',err.json().result.httpStatus)
        if(err.status == 401){
            alert('로그인 세션이 만료 되었습니다.\n다시 로그인 해주세요.');
            //this.removeUserAuthData();
            localStorage.removeItem(config.authKey);
            document.location.href="/login";
            return Observable.throw(null);
        }else if(err.status == 403){
            alert('해당 메뉴에 접근 권한이 없습니다.');
            if (!err.url.endsWith('ajax')) {
                window.history.back();
            }
            return Observable.throw(null);
        }
        return Observable.throw(err.json() || 'Server error');
    }

    //promiseGet 요청
    reqGetPromise(requrl: string): Promise<any>{
        console.debug('request PromiseGet : ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http
                    .get(config.apiEndPoint.concat(requrl), reqOptions)
                    .toPromise()
                    .then(this.handleResponse)
                    .catch(this.handlePromiseError);
    }

    //PromisePost 요청
    reqPostPromise(requrl: string, params: any, header?:Headers): Promise<any>{
        console.debug('request PromisePost : ' + requrl);
        let reqOptions = this.appendAuthHeader();

        return this.http.post(config.apiEndPoint.concat(requrl), params, reqOptions)
                    .toPromise()
                    .then(this.handleResponse)
                    .catch(this.handlePromiseError);
        }


    private handlePromiseError(err: Response | any){
        // console.debug('Error err.json() : ',err.json());
        // console.debug('err.json().httpStatus',err.json().result.httpStatus)
        if(err.status == 403){
            alert('로그인 세션이 만료 되었습니다.\n다시 로그인 해주세요.');
            //localStorage.removeItem(config.authKey);
            localStorage.removeItem(config.authKey);
            document.location.href="/login";
            return Promise.reject(null);
        }else if(err.status == 401){
            alert('해당 메뉴에 접근 권한이 없습니다.');
            window.history.back();
            return Promise.reject(null);
        }
        return Promise.reject(err.json().error || 'Server error');
    }

    getUserInfoData() : any {
        let userInfoData = null;

        //if ('local' == config.envName) {
            userInfoData = localStorage.getItem(config.localStorageUserInfoKey);
        //} else {
        //    userInfoData = this.getCookie(config.localStorageUserInfoKey);
        //}

        //console.debug(config.envName+'.getUserInfoData', userInfoData);

        return userInfoData;
    }

    setUserInfoData (userInfo : any) {
        //console.debug(config.envName+'.setUserInfoData', userInfo);

        //if ('local' == config.envName) {
            localStorage.setItem(config.localStorageUserInfoKey,JSON.stringify(userInfo));
        //} else {
        //    this.setCookie(config.localStorageUserInfoKey, JSON.stringify(userInfo), 1, '/');
        //}
    }


    getAuthInfo() : any {
        let authInfoData = null;

        //if ('local' == config.envName) {
            authInfoData = localStorage.getItem(config.authKey);
        //} else {
        //    authInfoData = this.getCookie(config.authKey);
        //}

        return authInfoData;
    }

    setUserAuthData (authInfo : any) {

        //console.debug(config.envName+'.setUserAuthData', authInfo);

        //if ('local' == config.envName) {
            localStorage.setItem(config.authKey,authInfo);
        //} else {
        //    this.setCookie(config.authKey, authInfo, 1, '/');
        //}
    }

    removeUserAuthData () {
        //console.debug(config.envName + '.removeUserAuthData');

        //if ('local' == config.envName) {
            localStorage.removeItem(config.authKey);
        //} else {
        //    this.deleteCookie(config.authKey);
        //}
    }



    public getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    public deleteCookie(name :any) {
        this.setCookie(name, '', -1);
    }

    public setCookie(name: string, value: string, expireTime: number, path: string = '') {
        let dt:Date = new Date();
        dt.setTime(dt.getTime() + expireTime * 60 * 60 * 1000);
        let expires:string = `expires=${dt.toUTCString()}`;
        let cpath:string = path ? `; path=${path}` : '';
        console.debug('setCookie',`${name}=${value}; ${expires}${cpath}`);
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }
}