export class CommonCodeItem{
    private locationCodeList: any = null;     //지역 코드 10001

    public getLocationCodeList(){
        return this.locationCodeList;
    }

    public setLocationCodeList(param:any){
        this.locationCodeList = param;
    }


    public setCodeDataFromJson(jsonData : any){
        this.locationCodeList = jsonData.locationCodeList;
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