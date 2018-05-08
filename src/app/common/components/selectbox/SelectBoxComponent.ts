import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OptionModel } from './OptionModel';

@Component({
    moduleId: module.id,
    selector: 'options-selector',
    templateUrl: 'SelectBoxComponent.html'
})

export class SelectBoxComponent{
    @Input() inputCodeList: any;
    @Input() cssClass: string;
    @Input() defaultOptionValue: any;

    private optionList: OptionModel[] = [];

    private selectedValue: any;

    constructor () {
    }

    ngOnInit(){
        //input으로 받은 공통 코드를 OptionModel로 변경한다.
        this.setOptionList(this.inputCodeList);

        if (null == this.cssClass) {
            this.cssClass = "form-control";
        }

        this.setOpionValue(this.defaultOptionValue);
    }

    public setOptionList (optionList:any){
        for (let commonCode of optionList) {
            
            var option: OptionModel = new OptionModel();
            option.name = commonCode.codeName;
            option.value = commonCode.codeId;

            this.optionList.push(option);
        }
    }

    public setOpionValue(value:any){
        this.selectedValue = value;
        for (let option of this.optionList) {
            if (option.value == value) {
                option.isSelected = true;
            } else {
                option.isSelected = false;
            }
        }
    }

    public getSelectedValue() {
        return this.selectedValue;
    }
}