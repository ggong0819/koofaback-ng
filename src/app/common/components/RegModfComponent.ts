import { Component, Input } from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'reg-modf',
    template:
    `
        <table class="table table-bordered" *ngIf="info.commonDataType == undefinded || info.commonDataType == false">
            <colgroup>
                <col class="col-md-{{info.node1 || defaultNode}}">
                <col class="col-md-{{info.node2 || defaultNode}}">
                <col class="col-md-{{info.node3 || defaultNode}}">
                <col class="col-md-{{info.node4 || defaultNode}}">
            </colgroup>
            <tbody>
                <tr role="row">
                    <th class="text-center odd">등록자</th>
                    <td class="text-center odd">{{info.regName}}</td>
                    <th class="text-center odd">수정자</th>                                    
                    <td class="text-center odd">{{info.modfName}}</td>
                </tr>
                <tr role="row">
                    <th class="text-center odd">등록IP</th>
                    <td class="text-center odd">{{info.regIp}}</td>
                    <th class="text-center odd">수정IP</th>                                    
                    <td class="text-center odd">{{info.modfIp}}</td>
                </tr>
                <tr role="row">
                    <th class="text-center odd">등록일</th>
                    <td class="text-center odd">{{info.regDt | date:'yyyy-MM-dd HH:mm:ss'}}</td>
                    <th class="text-center odd">수정일</th>                                    
                    <td class="text-center odd">{{info.modfDt | date:'yyyy-MM-dd HH:mm:ss'}}</td>                                
                </tr>
            </tbody>
        </table>

        <table class="table table-bordered" *ngIf="info.commonDataType">
            <colgroup>
                <col class="col-md-{{info.node1 || defaultNode}}">
                <col class="col-md-{{info.node2 || defaultNode}}">
                <col class="col-md-{{info.node3 || defaultNode}}">
                <col class="col-md-{{info.node4 || defaultNode}}">
            </colgroup>
            <tbody>
                <tr role="row">
                    <th class="text-center odd">등록자</th>
                    <td class="text-center odd">{{info.regName}}</td>
                    <th class="text-center odd">수정자</th>                                    
                    <td class="text-center odd">{{info.modfName}}</td>
                </tr>
                <tr role="row">
                    <th class="text-center odd">등록IP</th>
                    <td class="text-center odd">{{info.regIp}}</td>
                    <th class="text-center odd">수정IP</th>                                    
                    <td class="text-center odd">{{info.modfIp}}</td>
                </tr>
                <tr role="row">
                    <th class="text-center odd">등록일</th>
                    <td class="text-center odd">{{info.regDt | date:'yyyy-MM-dd HH:mm:ss'}}</td>
                    <th class="text-center odd">수정일</th>                                    
                    <td class="text-center odd">{{info.modfDt | date:'yyyy-MM-dd HH:mm:ss'}}</td>                                
                </tr>
            </tbody>
        </table>        
    `,
    styles: [`
        table {border-top:none;}
        table tr th {background-color: #f9f9f9;}
        table tr:first-child th, table tr:first-child td {border-top:none;}
    `]
})

export class RegModfComponent{
    @Input() info: any;
    private defaultNode :number = 3;
}