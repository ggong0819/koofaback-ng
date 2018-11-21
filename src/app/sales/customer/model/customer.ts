import { Person } from './person';

export class Customer {
  public customerId: number;
  public corpName: string;
  public corpRegNum: string;
  public representPersonName : string;
  public address: string;
  public customerTypeCode: string;
  public businessCondition: string;
  public businessItem: string;
  public homepageUrl: number;
  public personList: Person[];
  public regUserId: number;
  public regName: string;
  public regDt: string;
  public regIp: string;
  public modfUserId: number;
  public modfName: string;
  public modfDt: string;
  public modfIp: string;
}