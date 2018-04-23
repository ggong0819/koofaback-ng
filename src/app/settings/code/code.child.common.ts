import { OnInit, Input} from '@angular/core';
import { CommonComponent} from '../../common/component'
import { ActivatedRoute } from '@angular/router';

/**
 * 상세 코드 콤포넌트 공통 클래스
 */
export class CodeChildCommon extends CommonComponent implements OnInit{
   
    protected activeRoute: ActivatedRoute;
    protected codeItem: any;

    constructor(route: ActivatedRoute){
        super();
        this.activeRoute = route;
    }

    ngOnInit(){
        this.codeItem = {
            codeId: this.activeRoute.snapshot.params['codeId'],
            codeName: this.activeRoute.snapshot.params['codeName'],
            displayYn: this.activeRoute.snapshot.params['displayYn']
        }
    }
}