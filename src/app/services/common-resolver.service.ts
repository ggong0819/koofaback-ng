import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import {CommonCodeItem} from './common-code.item';
import {NetService} from './net.service';
import { config } from '../config/config';

@Injectable()
export class CommonCodeResolver implements Resolve<CommonCodeItem> {
  constructor(private netService: NetService, private router: Router) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CommonCodeItem> {
      let localCommonCode = localStorage.getItem(config.localStorageCommonCodeKey);

      if(undefined!== localCommonCode && null!==localCommonCode){
          let commonCode = new CommonCodeItem();
          commonCode.setCodeDataFromJson(JSON.parse(localCommonCode));

          return Promise.resolve(commonCode);
      }else{
          return this.netService.reqGetPromise('/code/allCodeList.ajax')
          .then(
            res => {
                let commonCode = new CommonCodeItem();

                console.log(res)
                console.log(res.result)

                //아래 공통 코드 추가/삭제/수정시 common.service.ts에도 같이 수정해야 합니다.
                for (let base of res.result){
                    switch(base.codeId){
                        case '10012': //지역
                            commonCode.setLocationCodeList(base.childCodeList);
                        break;
                        case '10007': //업무구분
                            commonCode.setWorkTypeCodeList(base.childCodeList);
                        break;
                        case '10010': //대상
                            commonCode.setTargetCodeList(base.childCodeList);
                        break;
                        case '10008': //기관유형
                            commonCode.setCustomerTypeCodeList(base.childCodeList);
                        break;
                        case '10009': //목적/주제
                            commonCode.setSubjectCodeList(base.childCodeList);
                        break;
                        case '10011': //회차
                            commonCode.setTimesCodeList(base.childCodeList);
                        break;
                    }
                }
                
                localStorage.setItem(config.localStorageCommonCodeKey,JSON.stringify(commonCode));

                return Promise.resolve(commonCode);
            },
            err => {
                if (err){
                    alert("코드 가져오기를 실패 하였습니다.");
                }
                return null;
            }
            )
      }
      
    }
}