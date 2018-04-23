import { Component, Input} from '@angular/core';
import { CheckListItem } from './check-list.model';

@Component({
    moduleId: module.id,
    selector: '[check-list]',
    templateUrl: 'check-list.component.html'
})

export class CheckListComponent{
    @Input() title: string;
    list: CheckListItem[];
    listOrg: CheckListItem[];
    checkItemCount: number = 0;

    @Input('listData')
    set listData(list: CheckListItem[]){
        this.list = list;
        this.listOrg = [];
        for (let item of this.list){
            this.listOrg.push((<any>Object).assign([], item));
        }
    }   

    public check(item: CheckListItem) {
        item.checked = !item.checked;
        if (item.checked){
            this.checkItemCount++;
        }
        else{
            this.checkItemCount--;
        }
    }

    public initAll(isCheck: boolean): void{
        if (this.list != null){
            for (let item of this.list){
                item.checked = isCheck;
            }
        }
    }

    public getCheckedItemCount(): number{
        return this.checkItemCount;
    }

    public getCheckedList(): CheckListItem[]{
        let res: CheckListItem[] = [];
        for (let item of this.list){
            if (item.checked){
                res.push(item);
            }
        }
        return res;
    }

    /**
     * 변경내용 확인 하여 리스트 
     */
    public getDiffList(): any{
        let newList = [];
        let delList = [];

        //과목 변경 사항 - 추가, 제거
        for (let curItem of this.list){
            for (let svrItem of this.listOrg){            
                if (curItem.code == svrItem.code){
                    //Find
                    if (!curItem.checked && svrItem.checked){ //삭제됨
                        delList.push(svrItem.id);
                    }
                    else if (curItem.checked && !svrItem.checked){
                        newList.push({code: curItem.code});
                    }
                    break;
                }
            }
        }        
        return {
            new_list: newList,
            dele_list: delList
        }
    }    
}

