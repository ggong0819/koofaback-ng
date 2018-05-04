import { Component, OnInit, SecurityContext, ViewChild, ComponentFactoryResolver, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { CommonComponent} from '../../common/component'
import { ModalDirective } from 'ngx-bootstrap';

import { Customer } from './model/customer';
import { CustomerService } from './customer.service';

import { MainContentComponent } from '../../layout/main-content.component';

import { PersonComponent} from './person.component';
import { PersonDirective } from './person.directive';

import { config } from '../../config/config';


import {CommonCodeItem} from '../../services/common-code.item';
import { SelectBoxComponent } from '../../common/components/selectbox/SelectBoxComponent';
import { OptionModel } from '../../common/components/selectbox/OptionModel';

@Component({
    moduleId: module.id,
    templateUrl: 'customer-detail.component.html',
    providers: [ CustomerService]
})

export class CustomerDetailComponent extends CommonComponent implements OnInit  {
    private initFormData:any;
    private customerId : any;
    private customerInfo : any = {};
    private checkedDuplication = false;
    private isCreateMode: boolean = false;
    private corpRegistFilePath:any;
    private customerTypeCodeList : any = [];

    private customerTypeCodeOptions : any = [];
    private defaultCustomerTypeCode: any;

    nativeWindow: any

    //담당자 리스트
    private beforePersonList:any;
    private personList : any[] = [];
    private personBoxIndex: number = -1;

    //사업자 등록증 파일
    private corpRegistImgFile:any;

    submitTitle: string = '등록';

    @ViewChild(PersonDirective) personHost: PersonDirective;
    // @ViewChild('fileInput') public fileInput : any;

    @ViewChild('customerTypeCodeBox') customerTypeCodeBox : SelectBoxComponent;

    public insertForm = this.fb.group({
        customerId:[],
        customerTypeCode:[],
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
        private customerService: CustomerService,
        private resolver: ComponentFactoryResolver
    ){
        super();

        //최초 가지고 와야할 코드들..
        this.route.data
        .subscribe(data => {
            let commonCode = <CommonCodeItem>data.commonCode;
            this.customerTypeCodeList = [{codeId:'', codeName:'선택', childCodeList:null}];
            for (let code of commonCode.getCustomerTypeCodeList()) {
                this.customerTypeCodeList.push(code);
            }
        });
    }

    ngOnInit(): void {

        this.defaultCustomerTypeCode = "";

        if (this.route.snapshot.params['type'] == 'create'){
            this.isCreateMode = true;
            this.mainComponent.menu={
                category : "영업",
                menu : "고객관리 > 등록"
            };

            this.addRow();

        } else {
            this.customerId = this.route.snapshot.params['customerId'];

            this.mainComponent.menu={
                category : "영업",
                menu : "고객관리 > 수정"
            };
            this.submitTitle = "저장";


            let customerObservable = this.customerService.getDetail(this.customerId);
            customerObservable.subscribe(
                response => {
                    if(response.customerInfo){
                        this.customerInfo = response.customerInfo;
                        
                        if (null != this.customerInfo.customerTypeCode) {
                            this.customerTypeCodeBox.setOpionValue(this.customerInfo.customerTypeCode);
                        }
                        
                        this.insertForm.controls['customerId'].setValue(this.customerInfo.customerId, {});
                        this.insertForm.controls['corpName'].setValue(this.customerInfo.corpName, {});
                        this.insertForm.controls['corpRegNum'].setValue(this.customerInfo.corpRegNum, {});
                        this.insertForm.controls['representPersonName'].setValue(this.customerInfo.representPersonName, {});
                        this.insertForm.controls['address'].setValue(this.customerInfo.address, {});
                        this.insertForm.controls['businessCondition'].setValue(this.customerInfo.businessCondition, {});
                        this.insertForm.controls['businessItem'].setValue(this.customerInfo.businessItem, {});
                        this.insertForm.controls['homepageUrl'].setValue(this.customerInfo.homepageUrl, {});

                        this.initFormData = this.insertForm.value;

                        this.corpRegistFilePath = this.customerInfo.corpRegistFilePath;

                        this.beforePersonList = response.personList;
                        if (this.beforePersonList.length > 0) {
                            for(let person of this.beforePersonList){
                                this.addRow(person);
                            }
                        } else {
                            this.addRow();
                        }
                        
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
        if (this.corpRegistImgFile) {
            mFormData.append("imgFile", this.corpRegistImgFile, this.corpRegistImgFile.name);
        }
        mFormData.append("representPersonName", formData.representPersonName);
        mFormData.append("address", formData.address);

        mFormData.append("customerTypeCode", this.customerTypeCodeBox.getSelectedValue());
        mFormData.append("businessCondition", formData.businessCondition);
        mFormData.append("businessItem", formData.businessItem);
        mFormData.append("homepageUrl", formData.homepageUrl);

        for(let i=0; i<this.personList.length; i++){
            let personComponent = this.personList[i];
            let personData = personComponent.instance.getPersonData();
            
            if(personData.name==null || personData.name ==''){
                alert('담당자 이름을 입력해주세요.');
                return;
            }

            mFormData.append("personList", JSON.stringify(personData));
        }

        
        if (this.isCreateMode) {
            this.insertCustomer(mFormData);
        } else {
            this.updateCustomer(mFormData);
        }

    }

    public pageChanged(event:any):void {
        super.setPage(event);
    }

    insertCustomer (formData : any) {
        let observable = this.customerService.registCustomer(formData);
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

    updateCustomer (formData : any) {

        // if(formData == this.initFormData){
        //     alert('변경 사항이 없습니다.');
        //     return false;
        // }
        let observable = this.customerService.updateCustomer(formData);
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

    addRow(initData?:any){
        this.personBoxIndex = this.personList.length;

        let componentFactory = this.resolver.resolveComponentFactory(PersonComponent);
        let viewContainerRef = this.personHost.viewContainerRef;
        let componentRef = viewContainerRef.createComponent(componentFactory);
        this.personList[this.personBoxIndex]=componentRef;

        componentRef.instance.hostViewContainerRef = viewContainerRef;
        componentRef.instance.personList = this.personList;
        componentRef.instance.nodeIndex = this.personBoxIndex;

        if(initData){
            componentRef.instance.name = initData.name;
            componentRef.instance.position = initData.position;
            componentRef.instance.tel = initData.tel;
            componentRef.instance.mobile = initData.mobile;
            componentRef.instance.email = initData.email;
            componentRef.instance.division = initData.division;
            componentRef.instance.memo = initData.memo;
        }
    }
    selectFile (event:any) {
        let file = event.target.files[0];
        this.corpRegistImgFile = file;
    }

    getImage () {
        window.open(config.apiEndPoint + '/customer/getCorpRegImage.view?customerId='+this.customerInfo.customerId);
    }
    // uploadFile (event:any){
    //     let file = event.target.files[0];
    //     if(file == null) return;
        

    //     let formData:FormData = new FormData();
    //     formData.append("imgFile", file, file.name);

    //     this.customerService.uploadFile(formData)
    //     .subscribe(
    //         res => {
    //             if (res.success) {
    //                 alert('저장 되었습니다.');
    //             } else {
    //                 alert('등록에 실패 하였습니다.\n'+res.errorMsg);
    //             }
    //             this.fileInput.nativeElement.value = '';
    //         },
    //         err => {
    //             if(err){
    //                 alert('Server Error:등록에 실패 하였습니다.\n시스템 관리자에게 문의 하세요');
    //             }
    //             this.fileInput.nativeElement.value = '';
    //         }
            
    //     )
    // }

}
