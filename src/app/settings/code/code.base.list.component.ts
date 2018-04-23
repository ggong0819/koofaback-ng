import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainContentComponent} from '../../layout/main-content.component'
import { CommonComponent} from '../../common/component'
import { CommonService } from '../../services/common.service';
import { CodeService } from './code.service';
import { ListComponent } from '../../common/components/ListComponent';

/**
 * 베이스 코드 리스트 콤포넌트
 * @author : [시공교육 최광윤]
 * @Date : 2017.03.21
 */
@Component({
    moduleId: module.id,
    templateUrl: 'code.base.list.component.html',
})

export class CodeBaseListComponent extends ListComponent implements OnInit{

    listData: any;
    topIndex: number;

    /**
     * 검색 타입 정의
     */
    private searchTypes = [
        {name: '코드명', value: 1},
        {name: '코드번호', value: 2}
    ];

    /**
     * 생성자
     * @param net 
     * @param mainComponent 
     */
    constructor(
        // private net: NetService, 
        private mainComponent: MainContentComponent, 
        public route: ActivatedRoute, 
        private router: Router,
        public commonService: CommonService,
        private codeService: CodeService,
    ){
        super(commonService, route);
        mainComponent.menu = {
            category : "설정",
            menu : "코드 관리"
        };
    }

    ngOnInit(): void{
        this.initListComponent();
    }

    //Overriding
    public searchSubmit(){
        this.searchForm.addControl('parentCodeId', new FormControl('0'));
        this.codeService.codeList(this.searchForm.value)
        .subscribe(
            res => {
                super.setPagination(res.result);
                this.listData = res.result.list;
            },
            err => {
                if (err){
                    console.log('err');
                }
            }
        );
    }    

    //Overriding
    public initForm(): void{
        this.searchForm.addControl('displayYn', new FormControl(''));
        this.searchForm.addControl('searchType', new FormControl(this.searchTypes[0].value));
        this.searchForm.addControl('searchText', new FormControl(''));
    }

    moveCreate(): void{
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/code/base/manage', { type:'create' }]); 
    }

    moveDetail(selectedItem: any){        
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/code/base/manage', {type:'modify', codeId : selectedItem.codeId}]);        
    }

    moveChildCodeList(selectedItem: any){
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/settings/code/child/list', 
            {
                codeId: selectedItem.codeId,
                codeName: selectedItem.codeName,
                displayYn: selectedItem.displayYn
            }]);
    }
}