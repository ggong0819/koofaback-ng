import { Component, Input, ViewChild } from '@angular/core';

import {RadioListItem} from './radio-list.item';
// import { UUID } from 'angular2-uuid';

@Component({
    moduleId: module.id,
    selector : '[radio-list]',
    templateUrl: 'radio-list.component.html',
})

export class RadioListComponent{
    @Input() listData:RadioListItem[] = [];
    @Input() title:string = '';
    @Input() defaultValue:any;

    // private name:any;
    private checkedValue:any;

    @ViewChild('radioTable') radioTable: any;
    
    constructor(
    ){
        // this.name=UUID.UUID();
    }

    getCheckedValue(){
        if(this.defaultValue){
            return this.defaultValue;
        }
        for(let radio of this.listData){
            if(radio.isChecked){
                return radio.code_dtl_id;
            }
        }

        return null;
    }

    init(){
        for(let radio of this.listData){
            radio.isChecked = false;
        }        
    }

    check(item: RadioListItem) {
        this.defaultValue = null;
        for(let radio of this.listData){
            if(radio.code_dtl_id == item.code_dtl_id){
                radio.isChecked = true;
            }else{
                radio.isChecked = false;
            }
        }
    }
}

