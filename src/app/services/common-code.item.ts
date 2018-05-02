export class CommonCodeItem{
    private locationCodeList: any = null;     //지역 코드 10004
    private type1CodeList: any = null;     //1차구분 코드 10003
    private type2CodeList: any = null;     //2차구분 코드 10004
    private targetCodeList: any = null;     //대상 코드 10004
    private userList: any = null;     //쿠퍼 유저 리스트

    public getLocationCodeList(){
        return this.locationCodeList;
    }

    public setLocationCodeList(param:any){
        this.locationCodeList = param;
    }

    public getType1CodeList(){
        return this.type1CodeList;
    }

    public setType1CodeList(param:any){
        this.type1CodeList = param;
    }

    public getType2CodeList(){
        return this.type2CodeList;
    }

    public setType2CodeList(param:any){
        this.type2CodeList = param;
    }

    public getTargetCodeList(){
        return this.targetCodeList;
    }

    public setTargetCodeList(param:any){
        this.targetCodeList = param;
    }

    public getUserList(){
        return this.userList;
    }

    public setUserList(param:any){
        this.userList = param;
    }


    public setCodeDataFromJson(jsonData : any){
        this.locationCodeList = jsonData.locationCodeList;
        this.type1CodeList = jsonData.type1CodeList;
        this.type2CodeList = jsonData.type2CodeList;
        this.targetCodeList = jsonData.targetCodeList;
        this.userList = jsonData.userList;
    }

}