import { Component, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertModalComponent } from '../common/alert-modal.component';

import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';

import { ModalDirective} from 'ngx-bootstrap';

export class CommonComponent implements OnDestroy{
    
    public pageNo:number = 1;
    public totalCnt:number = 10; // total numbar of page not items 
    public listSize:number = 10; // max page size
    public listStartIndex: number;

    commonPopupInputData :any= null;

    subscription: Subscription;

    private backButtonHanlder : any;


    @HostListener('window:popstate', ['$event'])
    onPopState(event : Event) {
        if(typeof this.backButtonHanlder !== 'undefined'){
            console.debug('뒤로가기 핸들러 존재함.');
            event.preventDefault();
            this.backButtonHanlder();
        }else{
            console.debug('핸들러 없으니 그냥 뒤로가기');
        }
    }

    constructor() {        
    }

    protected initPagenation(){
        this.totalCnt = 0;
        this.listSize = 0;
        this.listStartIndex = 0;
        this.pageNo = 1;
    }

    protected setPagination(info : any){
        if(info){
            this.totalCnt = info.pageInfo.totalCnt;
            this.listSize = info.pageInfo.listSize; 
            this.listStartIndex = this.totalCnt - (this.listSize * (this.pageNo-1));       
        }
    }

    protected setPage(pageNo:number):void {
        this.pageNo = pageNo;    
    };

    protected pageChanged(event:any):void {
        //this method will trigger every page click  
        // console.log('Number items per page: ' + event.itemsPerPage);
    };

    ngOnDestroy() {
        // 메모리 leak 방지
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    setBackButtonHandler(handler : any){
        this.backButtonHanlder = handler;
    }

}

