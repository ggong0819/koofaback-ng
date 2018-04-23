import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CodeChildCommon } from './code.child.common';
import { MainContentComponent} from '../../layout/main-content.component'
import { CommonService } from '../../services/common.service';
import { CodeService } from './code.service';



@Component({
    moduleId: module.id,
    templateUrl: 'code.child.manage.component.html',
})

export class CodeChildManageComponent extends CodeChildCommon implements OnInit{

    private isCreateMode: boolean = false;
    private insertForm: FormGroup;   //폼 데이터
    private itemInfo: any = {
        code_dtl_id: '자동 생성 됩니다.'
    };

    constructor(
        private route: ActivatedRoute, 
        private router: Router,
        private mainComponent: MainContentComponent, 
        private commonService: CommonService,
        private location: Location,
        private codeService: CodeService
    ){
        super(route);
    }

    ngOnInit(){
        super.ngOnInit();
                //폼 데이터 설정
        this.insertForm = new FormGroup({
            parentCodeId:  new FormControl(this.codeItem.codeId),
            codeId: new FormControl(this.itemInfo.codeId),
            codeName: new FormControl(''),
            displayOrder: new FormControl('1'),
            displayYn: new FormControl('Y')            
        });            

        // console.log(this.route.snapshot.params['type']);
        if (this.route.snapshot.params['type'] == 'create'){
            this.mainComponent.menu = {
                category : "설정",
                menu : "상세 코드 관리 > 등록"
            };            
            this.isCreateMode = true;
        }
        else{
            this.mainComponent.menu = {
                category : "설정",
                menu : "상세 코드 관리 > 수정"
            };                        
            this.itemInfo.codeId = this.route.snapshot.params['id'];
            this.requestDetailCodeInfo();
        }
    }

    requestDetailCodeInfo(){
        var param = {
            codeId: this.itemInfo.codeId
        }
        this.codeService.getCodeInfo(param)
        .subscribe(        
            res => {
                this.itemInfo = res.result;
                this.insertForm.controls['codeId'].setValue(this.itemInfo.codeId);
                this.insertForm.controls['codeName'].setValue(this.itemInfo.codeName);
                this.insertForm.controls['displayOrder'].setValue(this.itemInfo.displayOrder);
                this.insertForm.controls['displayYn'].setValue(this.itemInfo.displayYn);
            },
            err => {
                if (err){
                    alert('상세 코드 정보 요청을 실패 하였습니다. 네트워크 오류');
                }
            }
        );
    }

    submit():void{
        var res = confirm("저장 하시겠습니까?");
        if (res == true){
            var params = this.insertForm.value;
            if (this.isCreateMode){
                this.codeService.insertCommonCode(params)
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
            else{
                params.codeId = this.itemInfo.codeId;
                this.codeService.updateCommonCode(params)
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
    }

    backToList(): any{
        this.location.back();
    }
}