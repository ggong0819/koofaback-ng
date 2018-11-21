export class CommonCodeItem {
    private locationCodeList: any = null;     //지역 코드 10012
    private workTypeCodeList: any = null;     //업무구분 코드 10007
    private targetCodeList: any = null;     //대상 코드 10010
    private workUserList: any = null;     //업무 담당자 리스트 (코드 없음)
    private customerTypeCodeList: any = null;     //기관유형 코드 10008
    private subjectCodeList: any = null;     //목적/주제 코드 10009
    private timesCodeList: any = null;     //회차 코드 10011

    public getLocationCodeList() {
        return this.locationCodeList;
    }

    public setLocationCodeList(param: any) {
        this.locationCodeList = param;
    }

    public getWorkTypeCodeList() {
        return this.workTypeCodeList;
    }

    public setWorkTypeCodeList(param: any) {
        this.workTypeCodeList = param;
    }

    public getTargetCodeList() {
        return this.targetCodeList;
    }

    public setTargetCodeList(param: any) {
        this.targetCodeList = param;
    }

    public getWorkUserList() {
        return this.workUserList;
    }

    public setWorkUserList(param: any) {
        this.workUserList = param;
    }

    public getCustomerTypeCodeList() {
        return this.customerTypeCodeList;
    }

    public setCustomerTypeCodeList(param: any) {
        this.customerTypeCodeList = param;
    }

    public getSubjectCodeList() {
        return this.subjectCodeList;
    }

    public setSubjectCodeList(param: any) {
        this.subjectCodeList = param;
    }

    public getTimesCodeList() {
        return this.timesCodeList;
    }

    public setTimesCodeList(param: any) {
        this.timesCodeList = param;
    }

    public setCodeDataFromJson(jsonData: any) {
        this.locationCodeList = jsonData.locationCodeList;
        this.workTypeCodeList = jsonData.workTypeCodeList;
        this.targetCodeList = jsonData.targetCodeList;
        this.workUserList = jsonData.workUserList;
        this.customerTypeCodeList = jsonData.customerTypeCodeList;
        this.subjectCodeList = jsonData.subjectCodeList;
        this.timesCodeList = jsonData.timesCodeList;
    }

}