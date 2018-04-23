import { CommonComponent } from '../component';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * LCMS 비슷한 패턴의 ListComponent Base
 * @author-시공교육 최광윤
 */
export abstract class ListComponent extends CommonComponent{

    protected searchForm: any;  //폼 데이터

    constructor(
        public commonService: CommonService,
        public route: ActivatedRoute, 
    ){
        super();
    }

    protected initListComponent(){
        this.initPagenation();
        this.initBaseForm();

        //상세페이지에서 복귀 했을때 기존 폼 데이터 셋팅 및 페이징 처리
        if (this.route.snapshot.params['type'] == undefined || this.route.snapshot.params['type'] != "userback"){
            this.initForm();
        }
        else{
            this.searchForm = this.commonService.formData;
            super.setPage(this.searchForm.controls['pageNo'].value);
            if (this.searchForm == null){
                this.initForm();
            }
        }
        this.searchSubmit();
    }

    //List 관련 폼 그룹, 컨트롤 설정
    private initBaseForm(){
        this.searchForm = new FormGroup({
            listSize: new FormControl(10),
            pageNo: new FormControl(1)
        });
    }    

    public abstract initForm(): any;        //폼 데이터 추가를 위해
    public abstract searchSubmit(): any;    //리스트 검색 호출

    public pageChanged(event:any):void {    //페이지 변경 처리
        super.setPage(event);
        this.searchForm.controls['pageNo'].setValue(event);        
        this.searchSubmit();
    }    
}