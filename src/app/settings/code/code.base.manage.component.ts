import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CodeService } from './code.service';
import { MainContentComponent} from '../../layout/main-content.component'
import { CommonComponent} from '../../common/component'
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';

/**
 * 코드 등록 콤포넌트
 * @author : [시공교육 최광윤]
 * @data : 2017.03.21
 */
@Component({
    moduleId: module.id,
    templateUrl: 'code.base.manage.component.html',
})

export class CodeManageComponent implements OnInit{
    
    isCreateMode: boolean = false;
    insertForm: FormGroup;   //폼 데이터
    itemInfo: any = {
        code_base_id: '자동 생성 됩니다.'
    };
    submitTitle: string = '등록';
        
    constructor(
        private mainComponent: MainContentComponent, 
        private fb: FormBuilder, 
        private route: ActivatedRoute,
        private router: Router,
        private commonService: CommonService,
        private codeService: CodeService
        ){
    }

    ngOnInit(){
        //폼 데이터 설정
        this.insertForm = this.fb.group({
            'displayYn':  ['Y', null],
            'codeName': ['', null]
        });

        if (this.route.snapshot.params['type'] == 'create'){
            this.mainComponent.menu={
                category : "설정",
                menu : "코드 관리 > 등록"
            };            
            this.isCreateMode = true;
        }
        else{
            this.mainComponent.menu={
                category : "설정",
                menu : "코드 관리 > 수정"
            };                        
            this.submitTitle = '저장';
            this.requestDetailInfo(this.route.snapshot.params['codeId']);
        }
    }

    submit(){
        var res = confirm("저장하시겠습니까?");
        if (res == true){        
            if (this.isCreateMode){
                this.insertSubmit();
            }
            else{
                this.modifySubmit();
            }
        }
    }

    insertSubmit(){
        var param = this.insertForm.value;
        param.parentCodeId = 0;
        
        this.codeService.insertCommonCode(this.insertForm.value)
        .subscribe(
            res => {
                if(res.success){
                    alert('코드 생성을 성공 하였습니다.');
                    this.commonService.refreshCodeData();
                    this.backToList();
                }
                else{
                    alert('코드 생성을 실패 하였습니다.');
                }
            },
            err => {
                if (err){
                    alert('코드 생성을 실패 하였습니다. 네트워크 오류');
                }
            }
        );
    }

    backToList(){
        this.router.navigate(['/settings/code/base/list', {type:'userback'}]);
    }


    requestDetailInfo(id: number){
        this.codeService.getCodeInfo({codeId:id})
        .subscribe(
            res => {
                this.itemInfo = res.result;
                this.insertForm.controls['displayYn'].setValue(this.itemInfo.displayYn);
                this.insertForm.controls['codeName'].setValue(this.itemInfo.codeName);
                this.itemInfo.node1 = 2;
                this.itemInfo.node2 = 4;
                this.itemInfo.node3 = 2;
                this.itemInfo.node4 = 4;

            },
            err => {
                if (err){
                    console.log('err');
                }
            }
        );
    }


    modifySubmit(){
        this.itemInfo.codeName = this.insertForm.controls['codeName'].value
        this.itemInfo.displayYn = this.insertForm.controls['displayYn'].value
        this.codeService.updateCommonCode(this.itemInfo)
        .subscribe(
            res => {
                if(res.success){
                    alert('저장을 성공 하였습니다.');
                    this.commonService.refreshCodeData();
                    this.backToList();
                }
                else{
                    alert('저장을 실패 하였습니다.');
                }
            },
            err => {
                if (err){
                    alert('저장을 실패 하였습니다. 네트워크 오류');
                }
            }
        );
    }
}