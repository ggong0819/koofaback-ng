

/**
 * 메뉴 트리 노드 모델링 
 * 상속받아 사용
 * 필요한 기능은 이곳에 추가
 * @author 시공교육 최광윤
 */
export class TreeNode{
    public childList: TreeNode[] = null;    //자식 노드 배열
    public isOpened: boolean;               //자식 노드 열렸는지
    public isSelected: boolean = false;     //선택된 노드 인지
    public parentNode: TreeNode;            //부모 노드
    public title: string;                   //트리상에 표시될 텍스트

    constructor(    

    ){
        this.isOpened = true;
    }

    //노드 위로
    public indexUp(): void{
        console.log('indexUp');
        if (this.parentNode != null){
            let brosList = this.parentNode.childList;
            let i: number = brosList.indexOf(this);
            if (i > 0){
                let temp = brosList[i-1];
                brosList[i-1] = this;
                brosList[i] = temp;
            }
        }
        else{
            console.log('parent is null');
        }
    }

    //노드 아래로
    public indexDown(): void{
        if (this.parentNode != null){
            let brosList = this.parentNode.childList;
            let i: number = brosList.indexOf(this);
            if (i < brosList.length - 1){
                let temp = brosList[i+1];
                brosList[i+1] = this;
                brosList[i] = temp;
            }            
        }
    }

    //부모 노드 설정
    public setParent(node: TreeNode){
        this.parentNode = node;
    }

    //부모 노드 정보
    public getParent(): TreeNode{
        return this.parentNode;
    }

    //선택 이벤트
    public setSelect(node: TreeNode){
        if (this == node){
            this.isSelected = true;
        }
        else{
            this.isSelected = false;
        }
        if (this.childList != null){
            for (let childNode of this.childList){
                childNode.setSelect(node);
            }
        }        
    }

    //하위 메뉴 열림/닫힘 처리
    public setOpen(open: boolean){
        this.isOpened = open;
    }

    //자식 노드 추가
    public addChildNode(node: TreeNode){
        if (this.childList == null){
            this.childList = [];
        }
        this.childList.push(node);
    }

    //자식 노드 제거
    public removeChildNode(node: TreeNode){
        this.childList.splice(this.childList.indexOf(node), 1);
    }
}