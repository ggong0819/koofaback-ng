import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainContentComponent} from '../../layout/main-content.component'
import { CommonComponent} from '../../common/component'
import { CommonService } from '../../services/common.service';
import { CodeChildCommon } from './code.child.common';
import { CodeService } from './code.service';

@Component({
    moduleId: module.id,
    templateUrl: 'code.child.list.component.html',
})

export class CodeChildListComponent extends CodeChildCommon implements OnInit{
    
    private listData: any;

    constructor(
        private mainComponent: MainContentComponent, 
        private route: ActivatedRoute, 
        private router: Router,
        private commonSerivce: CommonService,
        private codeService: CodeService,
    ){
        super(route);
        mainComponent.menu = {
            category : "설정",
            menu : "상세 코드 관리"
        };
    }

    ngOnInit(){
        super.ngOnInit();
        this.requestCodeDetailList();
    }

    requestCodeDetailList(){
        this.codeService.codeList({parentCodeId:this.codeItem.codeId, listSize:1000,pageNo:1})
        .subscribe(
            res => {
                this.listStartIndex = res.result.pageInfo.totalCnt;
                this.listData = res.result.list;
            },
            err => {
                if (err){
                    console.log('err');                
                }
            }
        );
    }

    moveInsertPage(): void{
        console.log("moveChild Manage create");
        this.router.navigate(['/settings/code/child/manage', 
            {
                type: 'create',
                codeId: this.codeItem.codeId,
                codeName: this.codeItem.codeName,
                displayYn: this.codeItem.displayYn
            }]);
    }

    moveDetail(selectedItem: any){
        console.log("moveChild Manage Update");
        this.router.navigate(['/settings/code/child/manage', 
            {
                type: 'modify',
                codeId: this.codeItem.codeId,
                codeName: this.codeItem.codeName,
                displayYn: this.codeItem.displayYn,                
                id:selectedItem.codeId
            }]);
    }

    moveBackToList(): void{
        this.router.navigate(['/settings/code/base/list', {type:'userback'}]);
    }

    
}

