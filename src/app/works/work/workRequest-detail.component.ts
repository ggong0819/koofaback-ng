import { Component, OnInit, SecurityContext, ViewChild, ComponentFactoryResolver, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { CommonComponent} from '../../common/component'
import { ModalDirective } from 'ngx-bootstrap';

import { WorkRequest } from './model/WorkRequest';
import { WorkService } from './work.service';
import { CustomerService } from '../../sales/customer/customer.service';

import { MainContentComponent } from '../../layout/main-content.component';
import {CommonCodeItem} from '../../services/common-code.item';

import { SelectBoxComponent } from '../../common/components/selectbox/SelectBoxComponent';

import { config } from '../../config/config';

@Component({
    moduleId: module.id,
    templateUrl: 'workRequest-detail.component.html',
    providers: [ WorkService]
})

export class WorkRequestDetailComponent extends CommonComponent implements OnInit  {
    private initFormData:any;
    private workRequestId : any;
    private workRequestInfo : any = {};
    private isCreateMode: boolean = false;
    private defaultWorkTypeCode: any;

    @ViewChild(SelectBoxComponent) workTypeSelectBox : SelectBoxComponent;

    //거래처 리스트
    customerInfoList:any = [];

   //업무구분 코드리스트
   private workTypeCodeList:any;
   //지역 코드 리스트
   private locationCodeList:any;
   //대상 코드 리스트
   private targetCodeList:any;
   //업무 담당자 직원리스트
   private workUserList:any;

    submitTitle: string = '등록';

    public insertForm = this.fb.group({
        workRequestId:[],
        corpName:[],
        corpRegNum:[],
        representPersonName : [ ],
        address : [],
        businessCondition : [],
        businessItem : [],
        homepageUrl : []
     });

     constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        public fb : FormBuilder,
        private mainComponent: MainContentComponent,        
        private workService: WorkService,
        private customerService: CustomerService,
        private resolver: ComponentFactoryResolver
    ){
        super();

        //최초 가지고 와야할 코드들..
        this.route.data
        .subscribe(data => {
            let commonCode = <CommonCodeItem>data.commonCode;

            this.workTypeCodeList = [{codeId:'', codeName:'선택', childCodeList:null}];
            this.workTypeCodeList.concat(commonCode.getWorkTypeCodeList());
            this.locationCodeList = commonCode.getLocationCodeList();
            this.targetCodeList = commonCode.getTargetCodeList();
            this.workUserList = commonCode.getWorkUserList();
        });


    }

    ngOnInit(): void {
        //거래처 리스트 받아오기
        let formData :any;

        let observable = this.customerService.search(formData);
        observable.subscribe(
            response => {
                if (response.result) {
                    this.customerInfoList = response.result.list;
                } else {
                    this.customerInfoList.length = 0;
                }
            },
            error => {
                if (error) {
                    if (error.result && error.result.errorMsg) {
                        alert('거래처 정보를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
                    } else {
                        alert('거래처 정보를 가지고 올 수 없습니다.\n' + error);
                    }

                }
            }
        )

        if (this.route.snapshot.params['type'] == 'create'){
            this.isCreateMode = true;
            this.mainComponent.menu={
                category : "업무관리",
                menu : "업무요청 > 등록"
            };  
        } else {
            this.workRequestId = this.route.snapshot.params['workRequestId'];

            this.mainComponent.menu={
                category : "업무관리",
                menu : "업무요청 > 등록"
            };
            this.submitTitle = "저장";


            let observable = this.workService.getWorkRequestDetail(this.workRequestId);
            observable.subscribe(
                response => {
                    if(response.workRequestInfo){
                        this.workRequestInfo = response.workRequestInfo;
                        
                        this.insertForm.controls['workRequestId'].setValue(this.workRequestInfo.workRequestId, {});
                        this.insertForm.controls['corpName'].setValue(this.workRequestInfo.corpName, {});
                        this.insertForm.controls['corpRegNum'].setValue(this.workRequestInfo.corpRegNum, {});
                        this.insertForm.controls['representPersonName'].setValue(this.workRequestInfo.representPersonName, {});
                        this.insertForm.controls['address'].setValue(this.workRequestInfo.address, {});
                        this.insertForm.controls['businessCondition'].setValue(this.workRequestInfo.businessCondition, {});
                        this.insertForm.controls['businessItem'].setValue(this.workRequestInfo.businessItem, {});
                        this.insertForm.controls['homepageUrl'].setValue(this.workRequestInfo.homepageUrl, {});

                        this.initFormData = this.insertForm.value;
                    }
                },
                error => {
                    if(error){
                        alert('data를 가지고 올 수 없습니다.\n'+error.result.errorMsg);
                    }
                },
            )
        }
        
    }

    goList(){
        this.router.navigate(['/sales/customer/list']);
    }

    save(){

        if(!confirm('저장하시겠습니까?')){
             return false;
        }

        let formData = this.insertForm.value;
        let mFormData:FormData = new FormData();

        mFormData.append("customerId", formData.customerId);
        mFormData.append("corpName", formData.corpName);
        mFormData.append("corpRegNum", formData.corpRegNum);
        mFormData.append("representPersonName", formData.representPersonName);
        mFormData.append("address", formData.address);
        mFormData.append("businessCondition", formData.businessCondition);
        mFormData.append("businessItem", formData.businessItem);
        mFormData.append("homepageUrl", formData.homepageUrl);

        if (this.isCreateMode) {
            this.insertWorkRequest(mFormData);
        } else {
            this.updateWorkRequest(mFormData);
        }

    }

    public pageChanged(event:any):void {
        super.setPage(event);
    }

    insertWorkRequest (formData : any) {
        let observable = this.workService.registWorkRequest(formData);
        observable.subscribe(
            response => {
                if(response.success){
                    alert("저장되었습니다.");
                    this.goList();
                }else{
                    alert("저장에 실패하였습니다.:\n"+response.errorMsg);
                }
            },
            error => {
                if(error){
                    alert('저장에 실패하였습니다.\n'+error.result.errorMsg);
                }
            }
        )
    }

    updateWorkRequest (formData : any) {

        // if(formData == this.initFormData){
        //     alert('변경 사항이 없습니다.');
        //     return false;
        // }
        let observable = this.workService.updateWorkRequest(formData);
        observable.subscribe(
            response => {
                if(response.success){
                    alert("저장되었습니다.");
                }else{
                    alert("저장에 실패하였습니다.:\n"+response.errorMsg);
                }
            },
            error => {
                if(error){
                    alert('저장에 실패하였습니다.\n'+error.result.errorMsg);
                }
            }
        )
    }
}
