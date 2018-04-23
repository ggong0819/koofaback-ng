import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from './tree.model';

/**
 * Tree Root View Base Component
 * 트리 최상위 컴포넌트
 * <tree-view [node]="xxxx" (selectNodeEvent)="xxxx($event)"></tree-view>
 * @author 시공교육 - 최광윤
 */
@Component({
    moduleId: module.id,
    selector: 'tree-view',
    templateUrl: 'tree.component.html'
})

export class TreeView{
    @Input() node: TreeNode;    //트리 모델(하위 포함 전체)
    @Output() selectNodeEvent: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();   //선택 이벤트를 페이지 뷰 컴포넌트로 전달 하기 위한 이벤트 이미터

    /**
     * 트리 선택 이벤트 처리
     * @param selectedNode 
     */
    selectNode(selectedNode: TreeNode){
        this.selectNodeEvent.emit(selectedNode);    //뷰 컴포넌트로 이벤트 전달
    }
}


/**
 * Tree Node View
 * @author 시공교육 - 최광윤
 * 트리 자식 노드 트리 컴포넌트 내에서만 사용하므로 import 할 필요는 없다.
 */
@Component({
    moduleId: module.id,
    selector: 'tree-node',
    templateUrl: 'tree.component.html'
})

export class TreeNodeView{
    @Input() node: TreeNode;
    @Input() selectNodeEvent: EventEmitter<TreeNode>;   //Root's EventEmitter

    selectNode(selectedNode: TreeNode){
        this.selectNodeEvent.emit(selectedNode);
    }    
}



