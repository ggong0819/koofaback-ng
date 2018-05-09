import { Component, OnInit, SecurityContext, ViewChild, ComponentFactoryResolver, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { CommonComponent } from '../../common/component'
import { ModalDirective } from 'ngx-bootstrap';

import { WorkRequest } from './model/WorkRequest';
import { WorkService } from './work.service';
import { CustomerService } from '../../sales/customer/customer.service';

import { MainContentComponent } from '../../layout/main-content.component';
import { CommonCodeItem } from '../../services/common-code.item';

import { SelectBoxComponent } from '../../common/components/selectbox/SelectBoxComponent';

import { config } from '../../config/config';

@Component({
    moduleId: module.id,
    templateUrl: 'workRequest-detail.component.html',
    providers: [WorkService]
})

export class WorkRequestDetailComponent extends CommonComponent implements OnInit {
    private initFormData: any;
    private workRequestId: any;
    private workRequestInfo: any = {};
    private isCreateMode: boolean = false;

    @ViewChild("customerBox") customerSelectBox: SelectBoxComponent;
    @ViewChild("workTypeCodeBox") workTypeCodeSelectBox: SelectBoxComponent;
    @ViewChild("locationCodeBox") locationSelectBox: SelectBoxComponent;
    @ViewChild("workUserBox") workUserSelectBox: SelectBoxComponent;

    //거래처 리스트
    customerInfoList: any = [];

    //업무구분 코드리스트
    private workTypeCodeList: any;
    //지역 코드 리스트
    private locationCodeList: any;
    //대상 코드 리스트
    private targetCodeList: any;
    //업무 담당자 직원리스트
    private workUserList: any;

    private submitTitle: string = '등록';

    public insertForm = this.fb.group({
        workRequestId: [],
        customerId: [],
        workTypeCode: [],
        locationCode: [],
        subject: [],
        hopeDt: [],
        executeDt: [],
        locationDetail: [],
        targetCodes: [],
        participantCount: [],
        budget: [],
        requestDt: [],
        inboundRoute: [],
        chargeUserId: [],
    });

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        public fb: FormBuilder,
        private mainComponent: MainContentComponent,
        private workService: WorkService,
        private customerService: CustomerService,
        private resolver: ComponentFactoryResolver
    ) {
        super();

        //최초 가지고 와야할 코드들..
        this.route.data
            .subscribe(data => {
                let commonCode = <CommonCodeItem>data.commonCode;

                this.workTypeCodeList = [{ codeId: '', codeName: '선택', childCodeList: null }];
                for (let code of commonCode.getWorkTypeCodeList()) {
                    this.workTypeCodeList.push(code);
                }

                this.locationCodeList = [{ codeId: '', codeName: '선택', childCodeList: null }];
                for (let code of commonCode.getLocationCodeList()) {
                    this.locationCodeList.push(code);
                }

                this.targetCodeList = commonCode.getTargetCodeList();
            });


    }

    ngOnInit(): void {
        //거래처 리스트 받아오기
        let observable = this.customerService.getAllCustomerList();
        observable.subscribe(
            response => {
                if (response.result) {
                    this.customerInfoList = [{ codeId: '', codeName: '선택', childCodeList: null }];
                    if (response.result.list) {
                        for (let code of response.result.list) {
                            this.customerInfoList.push(code);
                        }

                        this.customerSelectBox.setOptionList(this.customerInfoList);
                    }
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


        let workUserStatus = "";
        //등록할 땐 현재 유효한 사용자 리스트만 보여준다.
        if (this.isCreateMode){
            workUserStatus = "0";
        }

        //담당자 리스트 가지고 오기
        let workUserObservable = this.workService.getWorkUserList(workUserStatus);
        workUserObservable.subscribe(
            response => {
                if (response.result) {
                    this.workUserList = [{ codeId: '', codeName: '선택', childCodeList: null }];
                    if (response.result.list) {
                        for (let code of response.result.list) {
                            this.workUserList.push(code);
                        }

                        this.workUserSelectBox.setOptionList(this.workUserList);
                    }
                } else {
                    this.workUserList.length = 0;
                }
            },
            error => {
                if (error) {
                    if (error.result && error.result.errorMsg) {
                        alert('담당자 정보를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
                    } else {
                        alert('담당자 정보를 가지고 올 수 없습니다.\n' + error);
                    }

                }
            }
        )

        if (this.route.snapshot.params['type'] == 'create') {
            this.isCreateMode = true;
            this.mainComponent.menu = {
                category: "업무관리",
                menu: "업무요청 > 등록"
            };
        } else {
            this.workRequestId = this.route.snapshot.params['workRequestId'];

            this.mainComponent.menu = {
                category: "업무관리",
                menu: "업무요청 > 등록"
            };
            this.submitTitle = "저장";


            let observable = this.workService.getWorkRequestDetail(this.workRequestId);
            observable.subscribe(
                response => {
                    if (response.workRequestInfo) {
                        this.workRequestInfo = response.workRequestInfo;

                        this.insertForm.controls['workRequestId'].setValue(this.workRequestInfo.workRequestId, {});
                        this.insertForm.controls['customerId'].setValue(this.workRequestInfo.customerId, {});
                        this.insertForm.controls['workTypeCode'].setValue(this.workRequestInfo.workTypeCode, {});
                        this.insertForm.controls['subject'].setValue(this.workRequestInfo.subject, {});
                        this.insertForm.controls['hopeDt'].setValue(this.workRequestInfo.hopeDt, {});
                        this.insertForm.controls['executeDt'].setValue(this.workRequestInfo.executeDt, {});
                        this.insertForm.controls['locationCode'].setValue(this.workRequestInfo.locationCode, {});
                        this.insertForm.controls['locationDetail'].setValue(this.workRequestInfo.locationDetail, {});
                        this.insertForm.controls['targetCodes'].setValue(this.workRequestInfo.targetCodes, {});
                        this.insertForm.controls['participantCount'].setValue(this.workRequestInfo.participantCount, {});
                        this.insertForm.controls['budget'].setValue(this.workRequestInfo.budget, {});
                        this.insertForm.controls['requestDt'].setValue(this.workRequestInfo.requestDt, {});
                        this.insertForm.controls['inboundRoute'].setValue(this.workRequestInfo.inboundRoute, {});
                        this.insertForm.controls['chargeUserId'].setValue(this.workRequestInfo.chargeUserId, {});

                        if (null != this.workRequestInfo.customerId) {
                            this.customerSelectBox.setOpionValue(this.workRequestInfo.customerId);
                        }
                        if (null != this.workRequestInfo.workTypeCode) {
                            this.workTypeCodeSelectBox.setOpionValue(this.workRequestInfo.customerTypeCode);
                        }
                        if (null != this.workRequestInfo.locationCode) {
                            this.locationSelectBox.setOpionValue(this.workRequestInfo.locationCode);
                        }
                        if (null != this.workRequestInfo.chargeUserId) {
                            this.workUserSelectBox.setOpionValue(this.workRequestInfo.chargeUserId);
                        }

                        this.initFormData = this.insertForm.value;
                    }
                },
                error => {
                    if (error) {
                        alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
                    }
                },
            )
        }

    }

    goList() {
        this.router.navigate(['/works/request/list']);
    }

    save() {

        if (!confirm('저장하시겠습니까?')) {
            return false;
        }
        let formData = null;
        
        let customerId = this.customerSelectBox.getSelectedValue();
        let workTypeCode = this.workTypeCodeSelectBox.getSelectedValue();
        let locationCode = this.locationSelectBox.getSelectedValue();
        let chargeUserId = this.workUserSelectBox.getSelectedValue();
        let targetCodes;


        

        this.insertForm.controls['customerId'].setValue(customerId, {});
        this.insertForm.controls['workTypeCode'].setValue(workTypeCode, {});
        this.insertForm.controls['locationCode'].setValue(locationCode, {});
        this.insertForm.controls['chargeUserId'].setValue(chargeUserId, {});
        this.insertForm.controls['targetCodes'].setValue(targetCodes, {});

        if (this.isCreateMode) {
            this.registWorkRequest(this.insertForm.value);
        } else {
            this.updateWorkRequest(this.insertForm.value);
        }

    }

    public pageChanged(event: any): void {
        super.setPage(event);
    }

    registWorkRequest(formData: any) {
        let observable = this.workService.registWorkRequest(formData);
        observable.subscribe(
            response => {
                if (response.success) {
                    alert("저장되었습니다.");
                    this.goList();
                } else {
                    alert("저장에 실패하였습니다.:\n" + response.errorMsg);
                }
            },
            error => {
                if (error) {
                    alert('저장에 실패하였습니다.\n' + error.result.errorMsg);
                }
            }
        )
    }

    updateWorkRequest(formData: any) {

        // if(formData == this.initFormData){
        //     alert('변경 사항이 없습니다.');
        //     return false;
        // }
        let observable = this.workService.updateWorkRequest(formData);
        observable.subscribe(
            response => {
                if (response.success) {
                    alert("저장되었습니다.");
                } else {
                    alert("저장에 실패하였습니다.:\n" + response.errorMsg);
                }
            },
            error => {
                if (error) {
                    alert('저장에 실패하였습니다.\n' + error.result.errorMsg);
                }
            }
        )
    }
}
