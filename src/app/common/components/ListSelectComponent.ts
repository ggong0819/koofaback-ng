import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListSelectItem } from './ListSelectItemModel';

@Component({
    moduleId: module.id,
    selector: 'list-selector',
    templateUrl: 'ListSelectComponent.html',
    styles: [`
        .fa-hand-o {position:absolute;top:50%;width:100%;margin-top:-45px;}
        .fa-hand-o > div {line-height:1em;}
        .fa-hand-o > div:last-child {margin-top:16px;}
        .fa-hand-o > div > p {margin:0;padding-top:3px;}
    `]
})

export class ListSelectComponent{
    @Input() contentsList: ListSelectItem[] = [];
    selectList: ListSelectItem[] = [];
    private currentSelectItem: ListSelectItem = null;
    private selectPos: number = -1;
    private height: number;

    @Input() contentsTitle: string;
    @Input() selectTitle: string;

    constructor(){
        this.height = 90;   //default    
    }

    private getHeight(){
        if (this.contentsList != null && this.contentsList.length > 0){
            return this.contentsList.length * 30 + 40 + 'px';
        }
        return 90;
    }

    public getContentList(): ListSelectItem[]{
        return this.contentsList;
    }

    private setFocus(selectPos: number, item: ListSelectItem){
        this.currentSelectItem = item;
        this.selectPos = selectPos;
    }

    private selectItem(){
        this.currentSelectItem.isSelected = true;
        this.selectList.push(this.currentSelectItem);
    }

    public setSelect(code: any, uid: number){
        for (let temp of this.contentsList){
            if (temp.code == code){
                temp.isSelected = true;
                temp.uid = uid;
                this.selectList.push(temp);
                break;
            }
        }
    }    

    private deSelectItem(){
        let idx = this.selectList.indexOf(this.currentSelectItem);
        this.selectList.splice(idx, 1);
        // console.log(this.contentsList.indexOf(this.currentSelectItem));
        this.contentsList[this.contentsList.indexOf(this.currentSelectItem)].isSelected = false;
    }  

    private itemMove(isUp: boolean, index: number){
        let temp: ListSelectItem;
        if (isUp){
            temp = this.selectList[index-1];
            this.selectList[index-1] = this.selectList[index];
        }
        else{
            temp = this.selectList[index+1];
            this.selectList[index+1] = this.selectList[index];
        }
        this.selectList[index] = temp;
    } 

    public getSelectList(): ListSelectItem[]{
        for (let i=0;i<this.selectList.length;i++){
            let item: ListSelectItem = this.selectList[i];
            item.index = i;
        }
        return this.selectList;
    }
}