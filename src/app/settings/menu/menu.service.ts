import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { config } from '../../config/config';
import { NetService } from '../../services/net.service';

@Injectable()
export class MenuService extends NetService{
    private jsonHeaders = new Headers({'Content-Type': 'application/json'});
    private formHeaders = new Headers({'Content-Type': 'x-www-form-urlencoded'});

    constructor(
        http: Http
    ){
        super(http);
    }

    getMenuTree(param?:any){
       return super.reqPost('/menuManage/list.ajax', param, this.jsonHeaders);
    }

    getMenuList(){
        return super.reqPost('/menuManage/menuList.ajax', null, this.jsonHeaders);
    }

    createChildMenu(param?:any){
        return super.reqPost('/menuManage/insertChildMenu.ajax', param, this.jsonHeaders);       
    }

    updateMenuInfo(param?:any){
        return super.reqPost('/menuManage/updateMenu.ajax', param, this.jsonHeaders);
    }

    getUrlList(param?: any){
        return super.reqPost('/menuManage/urlList.ajax', param, this.jsonHeaders);
    }

    addUrl(param?: any){
        return super.reqPost('/menuManage/insertUrl.ajax', param, this.jsonHeaders);
    }

    modifyUrl(param?: any){
        return super.reqPost('/menuManage/updateUrl.ajax', param, this.jsonHeaders);
    }    
}