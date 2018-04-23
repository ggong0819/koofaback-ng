"use strict";
/*
* Network Service Observable Base
* @author : 시공교육 최광윤
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var config_1 = require("../config/config");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/toPromise");
var NetService = (function () {
    function NetService(http) {
        this.http = http;
    }
    NetService.prototype.appendAuthHeader = function (header) {
        var reqHeader = new http_1.Headers({ 'Content-Type': 'application/json' });
        if (header) {
            reqHeader = header;
        }
        if (localStorage.getItem(config_1.config.authKey)) {
            reqHeader.append(config_1.config.authKey, localStorage.getItem(config_1.config.authKey));
        }
        return new http_1.RequestOptions({ headers: reqHeader });
    };
    NetService.prototype.appendAuthHeaderPart = function (header) {
        var reqHeader = new http_1.Headers();
        if (header) {
            reqHeader = header;
        }
        if (localStorage.getItem(config_1.config.authKey)) {
            reqHeader.append(config_1.config.authKey, localStorage.getItem(config_1.config.authKey));
        }
        return new http_1.RequestOptions({ headers: reqHeader });
    };
    //Get 요청
    NetService.prototype.reqGet = function (requrl) {
        console.debug('request Get : ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http
            .get(config_1.config.apiEndPoint.concat(requrl), reqOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    };
    //Post 요청
    NetService.prototype.reqPost = function (requrl, params, header) {
        console.debug('request Post : ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http.post(config_1.config.apiEndPoint.concat(requrl), params, reqOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    };
    //Post 요청
    NetService.prototype.reqPostPart = function (requrl, params, header) {
        console.debug('request Post : ' + requrl);
        var reqOptions = this.appendAuthHeaderPart();
        return this.http.post(config_1.config.apiEndPoint.concat(requrl), params, reqOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    };
    //Put 요청
    NetService.prototype.reqPut = function (requrl, params, header) {
        console.debug('request Put: ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http.put(config_1.config.apiEndPoint.concat(requrl), params, reqOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    };
    NetService.prototype.handleResponse = function (res) {
        var jsonData = res.json();
        try {
            var authHeader = res.headers.get(config_1.config.authKey);
            //인증정보를 매번 갱신한다.
            if (authHeader) {
                localStorage.setItem(config_1.config.authKey, authHeader);
            }
        }
        catch (e) {
            console.error(e);
        }
        return jsonData;
    };
    NetService.prototype.handleError = function (err) {
        // console.debug('Error err.json() : ',err.json());
        // console.debug('err.json().httpStatus',err.json().result.httpStatus)
        if (err.status == 401) {
            alert('로그인 세션이 만료 되었습니다.\n다시 로그인 해주세요.');
            //this.removeUserAuthData();
            localStorage.removeItem(config_1.config.authKey);
            document.location.href = "/login";
            return Observable_1.Observable.throw(null);
        }
        else if (err.status == 403) {
            alert('해당 메뉴에 접근 권한이 없습니다.');
            if (!err.url.endsWith('ajax')) {
                window.history.back();
            }
            return Observable_1.Observable.throw(null);
        }
        return Observable_1.Observable.throw(err.json() || 'Server error');
    };
    //promiseGet 요청
    NetService.prototype.reqGetPromise = function (requrl) {
        console.debug('request PromiseGet : ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http
            .get(config_1.config.apiEndPoint.concat(requrl), reqOptions)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handlePromiseError);
    };
    //PromisePost 요청
    NetService.prototype.reqPostPromise = function (requrl, params, header) {
        console.debug('request PromisePost : ' + requrl);
        var reqOptions = this.appendAuthHeader();
        return this.http.post(config_1.config.apiEndPoint.concat(requrl), params, reqOptions)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handlePromiseError);
    };
    NetService.prototype.handlePromiseError = function (err) {
        // console.debug('Error err.json() : ',err.json());
        // console.debug('err.json().httpStatus',err.json().result.httpStatus)
        if (err.status == 403) {
            alert('로그인 세션이 만료 되었습니다.\n다시 로그인 해주세요.');
            //localStorage.removeItem(config.authKey);
            localStorage.removeItem(config_1.config.authKey);
            document.location.href = "/login";
            return Promise.reject(null);
        }
        else if (err.status == 401) {
            alert('해당 메뉴에 접근 권한이 없습니다.');
            window.history.back();
            return Promise.reject(null);
        }
        return Promise.reject(err.json().error || 'Server error');
    };
    NetService.prototype.getUserInfoData = function () {
        var userInfoData = null;
        //if ('local' == config.envName) {
        userInfoData = localStorage.getItem(config_1.config.localStorageUserInfoKey);
        //} else {
        //    userInfoData = this.getCookie(config.localStorageUserInfoKey);
        //}
        //console.debug(config.envName+'.getUserInfoData', userInfoData);
        return userInfoData;
    };
    NetService.prototype.setUserInfoData = function (userInfo) {
        //console.debug(config.envName+'.setUserInfoData', userInfo);
        //if ('local' == config.envName) {
        localStorage.setItem(config_1.config.localStorageUserInfoKey, JSON.stringify(userInfo));
        //} else {
        //    this.setCookie(config.localStorageUserInfoKey, JSON.stringify(userInfo), 1, '/');
        //}
    };
    NetService.prototype.getAuthInfo = function () {
        var authInfoData = null;
        //if ('local' == config.envName) {
        authInfoData = localStorage.getItem(config_1.config.authKey);
        //} else {
        //    authInfoData = this.getCookie(config.authKey);
        //}
        return authInfoData;
    };
    NetService.prototype.setUserAuthData = function (authInfo) {
        //console.debug(config.envName+'.setUserAuthData', authInfo);
        //if ('local' == config.envName) {
        localStorage.setItem(config_1.config.authKey, authInfo);
        //} else {
        //    this.setCookie(config.authKey, authInfo, 1, '/');
        //}
    };
    NetService.prototype.removeUserAuthData = function () {
        //console.debug(config.envName + '.removeUserAuthData');
        //if ('local' == config.envName) {
        localStorage.removeItem(config_1.config.authKey);
        //} else {
        //    this.deleteCookie(config.authKey);
        //}
    };
    NetService.prototype.getCookie = function (name) {
        var ca = document.cookie.split(';');
        var caLen = ca.length;
        var cookieName = name + "=";
        var c;
        for (var i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    };
    NetService.prototype.deleteCookie = function (name) {
        this.setCookie(name, '', -1);
    };
    NetService.prototype.setCookie = function (name, value, expireTime, path) {
        if (path === void 0) { path = ''; }
        var dt = new Date();
        dt.setTime(dt.getTime() + expireTime * 60 * 60 * 1000);
        var expires = "expires=" + dt.toUTCString();
        var cpath = path ? "; path=" + path : '';
        console.debug('setCookie', name + "=" + value + "; " + expires + cpath);
        document.cookie = name + "=" + value + "; " + expires + cpath;
    };
    return NetService;
}());
NetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NetService);
exports.NetService = NetService;
//# sourceMappingURL=net.service.js.map