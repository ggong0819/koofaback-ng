import { TreeNode } from '../../common/components/tree/tree.model';


/**
 * 메뉴 트리를 위한 모델
 */
export class MenuTreeNode extends TreeNode{
    public originDisplayOrder: number = 0;

    constructor(
        public menuId: number,
        public parentMenuId: number,
        public menuLevel: number,
        public menuName: string,
        public menuUrl: string,
        public displayOrder: number,
        public displayYn: string,
        public regName: string,
        public modfName: string,
        public regUserId: number,
        public regDt: string,
        public regIp: string,
        public modfUserId: number,
        public modfDt: string,
        public modfIp: string
    ){
        super();
        this.originDisplayOrder = displayOrder;
    }

    /**
     * 서버 Parameter 추출
     */
    public getParamValue(): any{
        let param = {
            menuId: this.menuId,
            parentMenuId: this.parentMenuId,
            menuLevel: this.menuLevel,
            menuName: this.menuName,
            menuUrl: this.menuUrl,
            displayOrder: this.displayOrder,
            displayYn: this.displayYn,
            useYn: 'Y',
        }
        return param;
    }

    /**
     * 자식 노드를 포함한 서버 Parameter 추출
     * @param saveArray 
     */
    public getParamValueWithChild(saveArray: any[]){
        saveArray.push(this.getParamValue());
        if (this.childList != null){
            for (let i=0;i<this.childList.length;i++){
                let node: MenuTreeNode = <MenuTreeNode>this.childList[i];
                node.getParamValueWithChild(saveArray);
            }
        }
    }

        //부모 노드 정보
    public getParentNode(): MenuTreeNode{
        return <MenuTreeNode>this.parentNode;
    }

    public setSort(index: number){
        if (this.childList != null){
            for (let i=0;i<this.childList.length;i++){
                (<MenuTreeNode>this.childList[i]).setSort(i);
            }
        }
        this.displayOrder = index;        
    }
}

/**
 * JSON to MenuTree
 */
export class MenuTreeModelConverter{
    constructor(){

    }

    public totalCount: number = 0;

    public rawToTreeNode(rawData: any, parentNode: MenuTreeNode): MenuTreeNode{
        this.totalCount++;
        let node: MenuTreeNode = new MenuTreeNode(
            rawData.menuId,
            rawData.parentMenuId,
            rawData.menuLevel,
            rawData.menuName,
            rawData.menuUrl,
            rawData.displayOrder,
            rawData.displayYn,
            rawData.regName,
            rawData.modfName,
            rawData.regUserId,
            rawData.regDt,
            rawData.regIp,
            rawData.modfUserId,
            rawData.modfDt,
            rawData.modfIp
        );
        
        node.setParent(parentNode);
        node.title = rawData.menuName;

        if (rawData.childList != null && rawData.childList.length > 0){
            for (let child of rawData.childList){
                node.addChildNode(this.rawToTreeNode(child, node));
            }
        }
        return node;
    }
}