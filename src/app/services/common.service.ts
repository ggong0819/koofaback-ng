import { Injectable } from '@angular/core';
import { NetService } from './net.service';
import { AuthService } from './auth.service';

import {CommonCodeItem} from './common-code.item';
import { ActivatedRoute } from '@angular/router';

import { config } from '../config/config';
/**
 * 전역에서 공통으로 사용할 싱글톤 서비스
 */
@Injectable()
export class CommonService{

    public formData: any;       //리스트 폼 데이터(FormGroup)을 저장하기 위한 변수
    public selectListItem: any; //상세페이지로 넘기기 위한 아이템 정보

    private commonCode = new CommonCodeItem();

    constructor(
        private netService: NetService,
        private authService: AuthService,
        private route: ActivatedRoute,
    ){
        if(authService.isLogin()){
            this.refreshCodeData();
        }
    }

    public refreshCodeData(){
        this.netService.reqGet('/code/allCodeList.ajax')
        .subscribe(
            res => {
                //아래 공통 코드 추가/삭제/수정시 common-resolver.service.ts에도 같이 수정해야 합니다.
                for (let base of res.result){
                    switch(base.code_base_id){
                        case 10001: //지역
                            this.commonCode.setLocationCodeList(base.detailList);
                        break;
                        // case 10024: //[교재관리]출판사리스트
                        //     this.commonCode.setTextBookPubCodeList(base.detailList);
                        // break;
                        // case 10025: //실력단원평가_평가회차 정보
                        //     this.commonCode.setEvalOrderCodeList(base.detailList);
                        // break;
                        // case 10026: //실력단원평가_난이도 정보
                        //     this.commonCode.setEvalLevelCodeList(base.detailList);
                    }
                }
                
                localStorage.setItem(config.localStorageCommonCodeKey,JSON.stringify(this.commonCode));
            },
            err => {
                if (err){
                    alert("코드 가져오기를 실패 하였습니다.");
                }
            }
        )
    }
}