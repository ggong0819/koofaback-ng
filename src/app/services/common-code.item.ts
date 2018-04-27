export class CommonCodeItem{
    private locationCodeList: any = null;     //지역 코드 10004
    private type1CodeList: any = null;     //1차구분 코드 10003
    private type2CodeList: any = null;     //2차구분 코드 10004
    private targetCodeList: any = null;     //대상 코드 10004
    private targetCodeList: any = null;     //대상 코드 10004

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


    public setCodeDataFromJson(jsonData : any){
        this.locationCodeList = jsonData.locationCodeList;
        this.type1CodeList = jsonData.type1CodeList;
        this.type2CodeList = jsonData.type2CodeList;
        // this.subjectCodeList = jsonData.subjectCodeList;
        // this.termCodeList = jsonData.termCodeList;
        // this.companyCodeList = jsonData.companyCodeList;
        // this.levelCodeList = jsonData.levelCodeList;
        // this.componentCodeList = jsonData.componentCodeList;
        // this.serviceCodeList = jsonData.serviceCodeList;
        // this.typeCodeList = jsonData.typeCodeList;
        // this.eduDataCodeList = jsonData.eduDataCodeList;
        // this.existExpectCodeList = jsonData.existExpectCodeList;
        // this.conceptTreeCodeList = jsonData.conceptTreeCodeList;
        // this.studyFormCodeList = jsonData.studyFormCodeList;
        // this.linkedGradeCodeList = jsonData.linkedGradeCodeList;
        // this.studyContentsKindList = jsonData.studyContentsKindList;
        // this.studyContentLabelList = jsonData.studyContentLabelList;
        // this.korWordTypeCodeList = jsonData.korWordTypeCodeList;
        // this.subjKorThemeCodeList = jsonData.subjKorThemeCodeList;
        // this.subjEngThemeCodeList = jsonData.subjEngThemeCodeList;
        // this.studyOfferList = jsonData.studyOfferList;
        // this.textBookPubCodeList = jsonData.textBookPubCodeList;
        // this.evalOrderCodeList = jsonData.evalOrderCodeList;
        // this.evalLevelCodeList = jsonData.evalLevelCodeList;
    }

}