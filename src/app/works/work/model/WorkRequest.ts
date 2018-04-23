export class WorkRequest {
    public workRequestId: number;
    public workType: string;
    public customerId: number;
    public subject : string;
    public status: string;
    public type1Code: number;
    public type2Code: number;
    public hopeDt: string;
    public executeDt: string;
    public locationCode: number;
    public locationDetail: string;
    public targetCodes: string;
    public participantCount: string;
    public budget: string;
    public requestDt: string;
    public inboundRoute: string;
    public chargeUserId: number;
    public memo: string;
    public useYn: string;
  
    public regUserId: number;
    public regName: string;
    public regDt: string;
    public regIp: string;
    public modfUserId: number;
    public modfName: string;
    public modfDt: string;
    public modfIp: string;
  }