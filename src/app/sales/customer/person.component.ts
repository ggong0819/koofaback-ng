import { Component, Input, ViewChild,ViewContainerRef, ViewRef } from '@angular/core';

import { UUID } from 'angular2-uuid';

import { CommonComponent} from '../../common/component'

@Component({
    moduleId: module.id,
    templateUrl: 'person.component.html',
})

export class PersonComponent extends CommonComponent {

    private uuid:any;
    
    private selectedData:any;

    name:any;
    position:any;
    tel:any;
    mobile:any;
    email:any;
    division:any;
    memo:any;
    
    //현재 담당자 노드 리스트
    @Input() personList : any[] = [];
    //상위 컨테이너
    @Input() hostViewContainerRef : ViewContainerRef;
    //현재 nodeIndex
    @Input() nodeIndex : number;

    constructor(
        public viewContainerRef: ViewContainerRef
    ){
        super();
        this.uuid=UUID.UUID();
    }

    ngOnInit(): void {
    }

    getPersonData(){
        return {displayOrder:(this.nodeIndex+1), name: this.name, position: this.position, tel: this.tel, mobile: this.mobile, email: this.email, division: this.division, memo: this.memo};
    }

    getTargetComponent(targetIndex:number){
        for(let i=0; i<this.personList.length;i++){
            if(this.personList[i].instance.nodeIndex == targetIndex){
                return this.personList[i].instance;
            }
        }
    }

    getCurrentContainer(){
        for(let i=0; i<this.personList.length;i++){
            if(this.personList[i].instance === this){
                return this.personList[i];
            }
        }
    }

    getUpperNodeIndex(currentIndex:number) : number{
        let upperNodeIndex = currentIndex-1;
        if(upperNodeIndex<0){
            return -1;
        }
        if(this.hostViewContainerRef.get(upperNodeIndex)){
            return upperNodeIndex;
        }else{
            return this.getUpperNodeIndex(upperNodeIndex);
        }
    }

    getLowerNodeIndex(currentIndex:number) : number{
        let lowerNodeIndex = currentIndex+1;
        if(lowerNodeIndex>=this.personList.length){
            return 999;
        }
        if(this.hostViewContainerRef.get(lowerNodeIndex)){
            return lowerNodeIndex;
        }else{
            return this.getLowerNodeIndex(lowerNodeIndex);
        }
    }

    sortUp(){
        let targetIndex = this.getUpperNodeIndex(this.nodeIndex);

        if(targetIndex<0){
            return;
        }

        let targetComponent = this.getTargetComponent(targetIndex);

        let thisView = this.hostViewContainerRef.get(this.nodeIndex);

        //target 위치의 index를 변경
        if(targetComponent){
            targetComponent.nodeIndex = this.nodeIndex;
        }

        //이 View 위치 변경
        this.hostViewContainerRef.move(thisView, targetIndex);

        //현재 인덱스 변경.
        this.nodeIndex = targetIndex;

        // for(let i = 0; i<this.cmsContentsList.length; i++){
        //     console.log('listIndex'+i+', nodeIndex:',this.cmsContentsList[i].instance.nodeIndex);
        // }
    }

    sortDown(){
        let targetIndex = this.getLowerNodeIndex(this.nodeIndex);

        if(targetIndex==999){
            return;
        }

        let targetComponent = this.getTargetComponent(targetIndex);

        let thisView = this.hostViewContainerRef.get(this.nodeIndex);

        //target 위치의 index를 변경
        if(targetComponent){
            targetComponent.nodeIndex = this.nodeIndex;
        }

        //이 View 위치 변경
        this.hostViewContainerRef.move(thisView, targetIndex);

        //현재 인덱스 변경.
        this.nodeIndex = targetIndex;

        // for(let i = 0; i<this.cmsContentsList.length; i++){
        //     console.log('listIndex'+i+', nodeIndex:',this.cmsContentsList[i].instance.nodeIndex);
        // }
    }

    delete(){
        //아래 있는 node들을 인덱스 변경(-1처리)
        let lowerNodeIndex = this.getLowerNodeIndex(this.nodeIndex);
        while(lowerNodeIndex!=999){
            let targetComponent = this.getTargetComponent(lowerNodeIndex);
            if(targetComponent){
                targetComponent.nodeIndex = lowerNodeIndex-1;
            }
            lowerNodeIndex = this.getLowerNodeIndex(lowerNodeIndex);
        }

        //이 node를 삭제한다.
        this.hostViewContainerRef.remove(this.nodeIndex);

        
        let deleteListIndex = 999;
        for(let i=0;i<this.personList.length;i++){
            // console.log(this.personList[i].instance.nodeIndex);
            if(this.personList[i].instance.nodeIndex == this.nodeIndex){
                deleteListIndex = i;
                break;
            }
        }

        this.personList.splice(deleteListIndex, 1);

        // for(let i = 0; i<this.contentsList.length; i++){
        //     console.log('listIndex'+i+', nodeIndex:',this.contentsList[i].instance.nodeIndex);
        // }
        
    }
}

