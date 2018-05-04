import { Component, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { CommonComponent } from '../../common/component'
import { ModalDirective } from 'ngx-bootstrap';

import { WorkRequest } from './model/WorkRequest';
import { WorkService } from './work.service';
import { NetService } from '../../services/net.service';

import { MainContentComponent } from '../../layout/main-content.component';
import { ListComponent } from "../../common/components/ListComponent";
import { CommonService } from "../../services/common.service";

import {CommonCodeItem} from '../../services/common-code.item';

@Component({
    moduleId: module.id,
    templateUrl: 'workRequest-list.component.html',
    providers: [WorkService]
})

export class WorkRequestListComponent extends ListComponent implements OnInit {

    private results: any = [];
    private authList: any = [];
    realListSize: number = 20;
    private searchTypeOptions: any;

    //업무구분 코드리스트
    private workTypeCodeList:any;
    //지역 코드 리스트
    private locationCodeList:any;

    constructor(
        public route: ActivatedRoute,
        protected router: Router,
        public fb: FormBuilder,
        private mainComponent: MainContentComponent,
        private workService: WorkService,
        public commonService: CommonService,
    ) {
        super(commonService, route);

        mainComponent.menu = {
            category: "영업",
            menu: "업무요청관리"
        };

        this.searchTypeOptions = [
            { id: "corpName", name: '거래처명' },
            { id: "subject", name: '주제' },
            { id: "workId", name: '업무번호' },
            { id: "personName", name: '담당자명' },
            { id: "location", name: '지역' },
        ];

        //최초 가지고 와야할 코드들..
        this.route.data
        .subscribe(data => {
            let commonCode = <CommonCodeItem>data.commonCode;
            this.workTypeCodeList = commonCode.getWorkTypeCodeList();
            this.locationCodeList = commonCode.getLocationCodeList();
        });

    }

    ngOnInit(): void {
        this.initListComponent();
    }

    public initForm() {
        this.searchForm.addControl('searchType', new FormControl(this.searchTypeOptions[0].id));
        this.searchForm.addControl('searchText', new FormControl(""));
    }

    searchSubmit() {
        this.searchForm.controls['listSize'].setValue(this.realListSize, {});

        let formData = this.searchForm.value;

        let observable = this.workService.searchWorkRequest(formData);
        observable.subscribe(
            response => {
                // console.log("successResponse:",response.result);
                super.setPagination(response.result);
                if (response.result) {
                    this.results = response.result.list;
                } else {
                    this.results.length = 0;
                }

            },
            error => {
                if (error) {
                    if (error.result && error.result.errorMsg) {
                        alert('data를 가지고 올 수 없습니다.\n' + error.result.errorMsg);
                    } else {
                        alert('data를 가지고 올 수 없습니다.\n' + error);
                    }

                }
            }
        )
    }

    goDetail(workRequestId: any) {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/works/request/detail', { type: 'modify', workRequestId: workRequestId}]);
    }

    createWorkRequest() {
        this.commonService.formData = this.searchForm;
        this.router.navigate(['/works/request/detail', { type: 'create' }]);
    }

}