import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { config } from '../../config/config';
import { NetService } from '../../services/net.service';

@Injectable()
export class CodeService extends NetService{
    private jsonHeaders = new Headers({'Content-Type': 'application/json'});
    private formHeaders = new Headers({'Content-Type': 'x-www-form-urlencoded'});

    constructor(
        http: Http
    ){
        super(http);
    }
    
    /**
     * 코드 리스트 요청
     * @param param 
     */
    codeList(param?:any){
        return super.reqPost('/code/codeList.ajax', param, this.jsonHeaders);
    }

    /**
     * 베이스 코드 추가
     * @param param 
     */
    insertCommonCode(param?:any){
        return super.reqPost('/code/insertCommonCode.ajax', param, this.jsonHeaders);
    }

    /**
     * 베이스 코드 상세 정보
     * @param param 
     */
    getCodeInfo(param?:any){
        return super.reqPost('/code/getCodeInfo.ajax', param, this.jsonHeaders);
    }

    /**
     * 코드 정보 업데이트
     * @param param 
     */
    updateCommonCode(param?:any){
        return super.reqPost('/code/updateCommonCode.ajax', param, this.jsonHeaders);
    }


    /**
     * 상세 코드 리스트 요청
     * @param param 
     */
    selectChildCodeList(param?: any){
        return super.reqPost('/code/codeDetailList.ajax', param, this.jsonHeaders);
    }


    /**
     * 상세코드 정보 요청
     * @param param 
     */
    selectChildCodeInfo(param?: any){
        return super.reqPost('/code/CodeDetailInfo.ajax', param, this.jsonHeaders);
    }


    /**
     * 상세코드 추가 요청
     * @param param 
     */
    insertChildCode(param?: any){
        return super.reqPost('/code/insertCodeDetail.ajax', param, this.jsonHeaders);
    }


    /**
     * 상세코드 정보 수정
     * @param param 
     */
    updateChildCode(param?: any){
        return super.reqPost('/code/updateCodeDetail.ajax', param, this.jsonHeaders);
    }

}